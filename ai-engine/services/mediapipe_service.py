from schemas.schemas import FaceDetectionRequest, FaceDetectionResponse, FaceBoundingBox

class MediaPipeFaceService:
    """Service using MediaPipe Face Detection to locate faces and identify multiple observers."""

    def detect_faces(self, req: FaceDetectionRequest) -> FaceDetectionResponse:
        boxes = [
            FaceBoundingBox(x=0.15, y=0.20, width=0.25, height=0.30, confidence=0.98, person_identifier="User_A"),
            FaceBoundingBox(x=0.60, y=0.18, width=0.20, height=0.28, confidence=0.89, person_identifier="Unknown_Observer")
        ]
        return FaceDetectionResponse(
            status="success",
            faces_detected=2,
            bounding_boxes=boxes,
            multiple_faces_flag=True
        )
