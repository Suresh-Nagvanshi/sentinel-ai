from fastapi import APIRouter
from schemas.schemas import OCRRequest, OCRResponse
from services.ocr_service import EasyOCRService

router = APIRouter(tags=["OCR & Text Extraction"])

ocr_service = EasyOCRService()

@router.post("/ocr", response_model=OCRResponse)
def perform_ocr(req: OCRRequest):
    return ocr_service.extract_text(req)
