from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

# Process Monitoring
class ProcessMonitorRequest(BaseModel):
    user_id: str
    host_ip: Optional[str] = None
    scanned_processes: Optional[List[str]] = None

class RunningProcessInfo(BaseModel):
    pid: int
    name: str
    is_suspicious: bool
    risk_factor: float

class ProcessMonitorResponse(BaseModel):
    status: str = "success"
    unauthorized_detected: bool
    flagged_processes: List[RunningProcessInfo]
    timestamp: str

# Screen Recording Detection
class ScreenDetectionRequest(BaseModel):
    user_id: str
    frame_base64: Optional[str] = None
    monitor_index: int = 0

class ScreenDetectionResponse(BaseModel):
    status: str = "success"
    recording_detected: bool
    detected_software: List[str]
    confidence: float

# Webcam & MediaPipe
class WebcamMonitorRequest(BaseModel):
    user_id: str
    frame_base64: Optional[str] = None

class WebcamMonitorResponse(BaseModel):
    status: str = "success"
    camera_active: bool
    face_count: int
    primary_observer_gaze: str
    anomaly_detected: bool

# Face Detection
class FaceDetectionRequest(BaseModel):
    image_base64: Optional[str] = None

class FaceBoundingBox(BaseModel):
    x: float
    y: float
    width: float
    height: float
    confidence: float
    person_identifier: Optional[str] = None

class FaceDetectionResponse(BaseModel):
    status: str = "success"
    faces_detected: int
    bounding_boxes: List[FaceBoundingBox]
    multiple_faces_flag: bool

# Object Detection (YOLO)
class ObjectDetectionRequest(BaseModel):
    image_base64: Optional[str] = None

class DetectedObject(BaseModel):
    class_name: str
    confidence: float
    bbox: List[float]

class ObjectDetectionResponse(BaseModel):
    status: str = "success"
    objects: List[DetectedObject]
    threat_objects_found: List[str]

# Risk Scoring
class RiskScoreRequest(BaseModel):
    user_id: str
    active_process_count: int
    screen_recording_flag: bool
    unauthorized_devices_count: int
    face_count: int
    recent_anomalies_count: int

class RiskScoreResponse(BaseModel):
    status: str = "success"
    user_id: str
    risk_score: float = Field(..., ge=0.0, le=100.0)
    risk_level: str  # LOW, MEDIUM, HIGH, CRITICAL
    triggered_rules: List[str]

# OCR
class OCRRequest(BaseModel):
    image_base64: Optional[str] = None

class OCRResponse(BaseModel):
    status: str = "success"
    extracted_text: str
    sensitive_keywords_found: List[str]
