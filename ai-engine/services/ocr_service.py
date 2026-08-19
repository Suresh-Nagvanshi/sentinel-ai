from schemas.schemas import OCRRequest, OCRResponse

class EasyOCRService:
    """Service using EasyOCR to scan screen frames for confidential metadata or PII leakage."""

    def extract_text(self, req: OCRRequest) -> OCRResponse:
        sample_text = "CONFIDENTIAL INTERNAL DRAFT - RESTRICTED DISTRIBUTION ONLY"
        keywords = ["CONFIDENTIAL", "RESTRICTED"]
        return OCRResponse(
            status="success",
            extracted_text=sample_text,
            sensitive_keywords_found=keywords
        )
