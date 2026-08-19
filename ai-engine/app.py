from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.config import settings
from routers import monitors, detections, risk, ocr
from utils.logger import logger

app = FastAPI(
    title=settings.APP_NAME,
    description="Enterprise AI Core Engine for SentinelAI: Real-time Screen Detection, Object Detection, Face Recognition, and Risk Analysis.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Router modules
app.include_router(monitors.router)
app.include_router(detections.router)
app.include_router(risk.router)
app.include_router(ocr.router)

@app.get("/health", tags=["Health"])
def health_check():
    logger.info("Health check ping received.")
    return {
        "status": "HEALTHY",
        "service": settings.APP_NAME,
        "engine": "FastAPI + OpenCV + YOLOv8 + MediaPipe + EasyOCR"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
