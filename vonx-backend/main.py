from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import torch, torch.nn as nn, pennylane as qml, numpy as np

# ─────────────────────────── FastAPI boilerplate ──────────────────────────
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ───────────────────────────── Pydantic models ────────────────────────────
class Point(BaseModel):
    x: float
    y: float
    label: int

class TrainReq(BaseModel):
    dataset: List[Point]
    layers: List[str]         # reserved for future circuit-builder
    learningRate: float
    epochs: int = 25

class TrainResp(BaseModel):
    losses: List[float]
    accuracies: List[float]
    finalLoss: float
    finalAcc: float
    decisionMap: List[List[float]]

# ─────────────────────────── PennyLane circuit ────────────────────────────
dev = qml.device("default.qubit", wires=2)

@qml.qnode(dev, interface="torch")
def qnode(x, w):
    qml.AngleEmbedding(x, wires=[0,1])
    for i in range(3):               # 3 repetitions
        qml.RY(w[2*i],   wires=0)
        qml.RY(w[2*i+1], wires=1)
        qml.CNOT(wires=[0,1])
        qml.CNOT(wires=[1,0])
    return qml.expval(qml.PauliZ(1))

class HybridQNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.w = nn.Parameter(torch.randn(6))   # 3 layers × 2 params


    def forward(self, x):
        # vectorised evaluation over a batch
        return torch.vmap(qnode, in_dims=(0, None))(x, self.w)

# ─────────────────────────── Helper functions ─────────────────────────────
def train(dataset, lr, epochs):
    X = torch.tensor([[p.x, p.y] for p in dataset], dtype=torch.float32)
    Y = torch.tensor([p.label for p in dataset],   dtype=torch.float32)

    net = HybridQNN()
    opt = torch.optim.Adam(net.parameters(), lr=lr)
    loss_fn = nn.BCEWithLogitsLoss()

    losses, accs = [], []
    for _ in range(epochs):
        opt.zero_grad()
        logits = net(X)
        loss   = loss_fn(logits, Y)
        loss.backward()
        opt.step()

        losses.append(loss.item())
        accs.append(((torch.sigmoid(logits) > 0.5) == Y).float().mean().item())

    return net, losses, accs

def decision_grid(model, res=120):
    """Return a (res × res) grid of class-probabilities."""
    res = max(20, res)        # keep sane resolution
    xs  = np.linspace(-1, 1, res)
    ys  = np.linspace(-1, 1, res)
    mesh = torch.tensor(np.dstack(np.meshgrid(xs, ys)).reshape(-1, 2),
                        dtype=torch.float32)
    with torch.no_grad():
        probs = torch.sigmoid(model(mesh)).view(res, res).cpu().numpy()
    return probs.tolist()

# ───────────────────────────── API routes ─────────────────────────────────
@app.get("/")
def ping():
    return {"msg": "VonX QNN backend alive"}

@app.post("/train", response_model=TrainResp)
def train_qnn(req: TrainReq):
    # layers param is accepted for future circuit customisation
    net, losses, accs = train(req.dataset, req.learningRate, req.epochs)
    grid              = decision_grid(net, 120)

    return {
        "losses":      losses,
        "accuracies":  accs,
        "finalLoss":   losses[-1],
        "finalAcc":    accs[-1],
        "decisionMap": grid,
    }

