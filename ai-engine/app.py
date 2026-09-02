import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ---------------------------------------------------------------------------
# Lazy-load heavy CV deps so pytest can import app without them installed
# ---------------------------------------------------------------------------
CI_MODE = os.getenv("CI", "false").lower() == "true"

if not CI_MODE:
    try:
        import cv2  # noqa: F401
        from ultralytics import YOLO  # noqa: F401
        import mediapipe  # noqa: F401
        import easyocr  # noqa: F401
    except ImportError:
        pass  # Allow startup without CV libs in dev/test envs

from routers import health, monitors, risk, detections, ocr  # noqa: E402

app = FastAPI(
    title="SentinelAI Engine",
    description="Computer vision-powered insider threat & screen-capture detection engine.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(monitors.router)
app.include_router(risk.router)
app.include_router(detections.router)
app.include_router(ocr.router)
