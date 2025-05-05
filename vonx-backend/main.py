from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import torch
import torch.nn as nn
import pennylane as qml
import numpy as np
import random

# === FASTAPI SETUP ===
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# === QUANTUM DEVICE ===
dev = qml.device("default.qubit", wires=2)

# === QNODE: Quantum circuit returning a scalar value ===
@qml.qnode(dev, interface="torch")
def qnn_circuit(inputs, weights):
    qml.AngleEmbedding(inputs, wires=[0, 1])
    for i in range(2):
        qml.RX(weights[i], wires=i)
    return qml.expval(qml.PauliZ(0))  # return a single value

# === HYBRID QNN MODEL ===
class HybridQNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.weights = nn.Parameter(torch.rand(2))  # 2 trainable angles

    def forward(self, x):
        # Vectorized mapping of quantum circuit to each input in batch
        return torch.vmap(qnn_circuit, in_dims=(0, None))(x, self.weights)  # shape: [batch_size]

# === API MODELS ===
class Point(BaseModel):
    x: float
    y: float
    label: int

class TrainRequest(BaseModel):
    dataset: List[Point]
    layers: List[str]
    learningRate: float
    epochs: int = 25

class TrainResponse(BaseModel):
    loss: List[float]
    accuracy: List[float]
    decisionMap: List[List[int]]

# === TRAINING LOGIC ===
def train_model(dataset, layers, learning_rate, epochs):
    # Prepare data
    X = np.array([[p.x, p.y] for p in dataset], dtype=np.float32)
    Y = np.array([p.label for p in dataset], dtype=np.float32)

    x_train = torch.tensor(X)
    y_train = torch.tensor(Y)

    # Model
    model = HybridQNN()
    optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)
    loss_fn = nn.BCEWithLogitsLoss()

    losses = []
    accuracies = []

    for _ in range(epochs):
        model.train()
        optimizer.zero_grad()

        outputs = model(x_train)  # shape: [batch_size]
        loss = loss_fn(outputs, y_train)

        loss.backward()
        optimizer.step()

        preds = (torch.sigmoid(outputs) > 0.5).float()
        acc = (preds == y_train).float().mean().item()

        losses.append(loss.item())
        accuracies.append(acc)

    # Simulated decision boundary (replace with real heatmap later)
    decision_map = [[random.randint(0, 1) for _ in range(50)] for _ in range(50)]

    return losses, accuracies, decision_map

# === ROUTES ===
@app.get("/")
def root():
    return {"message": "VonX QNN Backend is running."}

@app.post("/train", response_model=TrainResponse)
def train_qnn(payload: TrainRequest):
    losses, accuracies, decision_map = train_model(
        payload.dataset,
        payload.layers,
        payload.learningRate,
        payload.epochs
    )
    return TrainResponse(
        loss=losses,
        accuracy=accuracies,
        decisionMap=decision_map
    )

