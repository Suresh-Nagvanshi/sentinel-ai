from fastapi import APIRouter
from schemas.schemas import (
    ProcessMonitorRequest, ProcessMonitorResponse,
    ScreenDetectionRequest, ScreenDetectionResponse,
    WebcamMonitorRequest, WebcamMonitorResponse
)
from services.process_service import ProcessMonitorService
from services.screen_service import ScreenDetectionService
from services.webcam_service import WebcamMonitorService

router = APIRouter(tags=["Monitoring"])

process_service = ProcessMonitorService()
screen_service = ScreenDetectionService()
webcam_service = WebcamMonitorService()

@router.post("/process-monitor", response_model=ProcessMonitorResponse)
def monitor_processes(req: ProcessMonitorRequest):
    return process_service.scan_processes(req)

@router.post("/screen-detection", response_model=ScreenDetectionResponse)
def detect_screen(req: ScreenDetectionRequest):
    return screen_service.detect_screen_recording(req)

@router.post("/webcam-monitor", response_model=WebcamMonitorResponse)
def monitor_webcam(req: WebcamMonitorRequest):
    return webcam_service.monitor_webcam(req)
