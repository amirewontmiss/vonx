# vonx-backend/main.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
from uuid import uuid4

import torch
import torch.nn as nn
import pennylane as qml
import numpy as np

# ───────────────────────────────── FastAPI ─────────────────────────────────
app = FastAPI()

# ────────────────────────────── Enable CORS ────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],            # Or restrict to ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# ─────────────────────────────── Models Cache ───────────────────────────────
models: Dict[str, nn.Module] = {}

# ─────────────────────────────── Pydantic IO ────────────────────────────────
class Point(BaseModel):
    x: float
    y: float
    label: int

class GateModel(BaseModel):
    id: str
    type: str
    column: int
    wire: int
    params: List[float]

class CircuitModel(BaseModel):
    numWires: int
    gates: List[GateModel]

class CompileReq(BaseModel):
    circuit: CircuitModel
    device: str = "default.qubit"
    shots: int = 0

class CompileResp(BaseModel):
    modelId: str

class TrainReq(BaseModel):
    modelId: str
    dataset: List[Point]
    learningRate: float
    epochs: int = 25

class TrainResp(BaseModel):
    losses: List[float]
    accuracies: List[float]
    finalLoss: float
    finalAcc: float
    decisionMap: List[List[float]]

# ─────────────────────────────── Gate Table ─────────────────────────────────
GATE_TABLE = {
    'RX':   {'fn': qml.RX,        'parametric': True},
    'RY':   {'fn': qml.RY,        'parametric': True},
    'RZ':   {'fn': qml.RZ,        'parametric': True},
    'H':    {'fn': qml.Hadamard,  'parametric': False},
    'CNOT': {'fn': qml.CNOT,      'parametric': False},
    'CZ':   {'fn': qml.CZ,        'parametric': False},
}

# ────────────────────────────── Build QNode ──────────────────────────────────
def build_qnode(circuit: CircuitModel, device_name: str, shots: int):
    dev = qml.device(
        device_name,
        wires=circuit.numWires,
        shots=None if shots == 0 else shots,
    )

    @qml.qnode(dev, interface="torch")
    def qnode(x, weights):
        # Embed classical inputs into angles
        qml.AngleEmbedding(x, wires=list(range(circuit.numWires)))

        ptr = 0
        for col in sorted({g.column for g in circuit.gates}):
            for g in [gg for gg in circuit.gates if gg.column == col]:
                entry = GATE_TABLE.get(g.type)
                if entry is None:
                    raise ValueError(f"Unknown gate type: {g.type}")
                fn = entry['fn']
                if entry['parametric']:
                    angle = weights[ptr]
                    fn(angle, wires=[g.wire])
                    ptr += 1
                else:
                    fn(wires=[g.wire])

        # Measure expectation on wire 0
        return qml.expval(qml.PauliZ(0))

    return qnode

# ─────────────────────────── Wrap in nn.Module ───────────────────────────────
class DynamicQNN(nn.Module):
    def __init__(self, qnode_fn, param_count):
        super().__init__()
        self.qnode   = qnode_fn
        self.weights = nn.Parameter(torch.randn(param_count))

    def forward(self, x):
        # Explicit loop to ensure autograd works
        outputs = []
        for i in range(x.shape[0]):
            out = self.qnode(x[i], self.weights)
            outputs.append(out)
        return torch.stack(outputs)

# ─────────────────────────── Decision Grid ───────────────────────────────────
def decision_grid(model: nn.Module, res=120):
    xs = np.linspace(-1, 1, res)
    ys = np.linspace(-1, 1, res)
    pts = torch.tensor(
        np.dstack(np.meshgrid(xs, ys)).reshape(-1, 2),
        dtype=torch.float32
    )

    with torch.no_grad():
        probs = torch.sigmoid(model(pts)).view(res, res).cpu().numpy()

    return probs.tolist()

# ───────────────────────────────── Routes ────────────────────────────────────
@app.get("/")
def ping():
    return {"msg": "VonX QNN backend alive"}

@app.post("/compile", response_model=CompileResp)
def compile_circuit(req: CompileReq):
    # Count trainable gates
    param_count = sum(
        1 for g in req.circuit.gates
        if GATE_TABLE.get(g.type, {}).get('parametric', False)
    )
    if param_count == 0:
        raise HTTPException(
            status_code=400,
            detail="Circuit must include at least one parametric gate"
        )

    # Build and wrap model
    qnode_fn = build_qnode(req.circuit, req.device, req.shots)
    model    = DynamicQNN(qnode_fn, param_count)

    model_id = uuid4().hex
    models[model_id] = model
    return {"modelId": model_id}

def train_model(model: nn.Module, dataset: List[Point], lr: float, epochs: int):
    X = torch.tensor([[p.x, p.y] for p in dataset], dtype=torch.float32)
    Y = torch.tensor([p.label for p in dataset],   dtype=torch.float32)

    optimizer = torch.optim.Adam(model.parameters(), lr=lr)
    loss_fn   = nn.BCEWithLogitsLoss()

    losses, accs = [], []
    for _ in range(epochs):
        optimizer.zero_grad()
        logits = model(X)
        loss   = loss_fn(logits, Y)
        loss.backward()
        optimizer.step()

        losses.append(loss.item())
        accs.append(((torch.sigmoid(logits) > 0.5) == Y).float().mean().item())

    return losses, accs

@app.post("/train", response_model=TrainResp)
def train_qnn(req: TrainReq):
    model = models.get(req.modelId)
    if model is None:
        raise HTTPException(status_code=404, detail="Model ID not found")

    losses, accs = train_model(
        model, req.dataset, req.learningRate, req.epochs
    )
    grid = decision_grid(model, 120)

    return {
        "losses":      losses,
        "accuracies":  accs,
        "finalLoss":   losses[-1],
        "finalAcc":    accs[-1],
        "decisionMap": grid,
    }

