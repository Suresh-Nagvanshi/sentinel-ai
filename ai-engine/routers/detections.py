from fastapi import APIRouter
from schemas.schemas import (
    FaceDetectionRequest, FaceDetectionResponse,
    ObjectDetectionRequest, ObjectDetectionResponse
)
from services.mediapipe_service import MediaPipeFaceService
from services.yolo_service import YoloObjectDetectionService

router = APIRouter(tags=["Computer Vision Detections"])

face_service = MediaPipeFaceService()
object_service = YoloObjectDetectionService()

@router.post("/face-detection", response_model=FaceDetectionResponse)
def detect_faces(req: FaceDetectionRequest):
    return face_service.detect_faces(req)

@router.post("/object-detection", response_model=ObjectDetectionResponse)
def detect_objects(req: ObjectDetectionRequest):
    return object_service.detect_objects(req)
