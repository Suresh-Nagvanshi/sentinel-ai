import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "SentinelAI Threat Detection Engine"
    API_V1_STR: str = ""
    DEBUG: bool = True
    MODEL_PATH: str = os.getenv("MODEL_PATH", "models/yolov8n.pt")
    RISK_THRESHOLD: float = 0.75

    class Config:
        case_sensitive = True

settings = Settings()
