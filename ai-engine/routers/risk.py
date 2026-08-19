from fastapi import APIRouter
from schemas.schemas import RiskScoreRequest, RiskScoreResponse
from services.risk_service import RiskEngineService

router = APIRouter(tags=["Risk Scoring Engine"])

risk_service = RiskEngineService()

@router.post("/risk-score", response_model=RiskScoreResponse)
def calculate_risk_score(req: RiskScoreRequest):
    return risk_service.calculate_risk(req)
