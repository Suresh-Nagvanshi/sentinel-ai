from schemas.schemas import RiskScoreRequest, RiskScoreResponse

class RiskEngineService:
    """Service to evaluate composite risk score based on process, screen, face, and object telemetry."""

    def calculate_risk(self, req: RiskScoreRequest) -> RiskScoreResponse:
        base_score = 0.0
        rules = []

        if req.screen_recording_flag:
            base_score += 40.0
            rules.append("UNAUTHORIZED_SCREEN_RECORDING_SOFTWARE")
        if req.unauthorized_devices_count > 0:
            base_score += 30.0
            rules.append("RECORDING_DEVICE_IN_FRAME")
        if req.face_count > 1:
            base_score += 20.0
            rules.append("MULTIPLE_OBSERVERS_DETECTED")

        calculated = min(100.0, base_score)
        level = "LOW"
        if calculated > 75.0:
            level = "CRITICAL"
        elif calculated > 50.0:
            level = "HIGH"
        elif calculated > 25.0:
            level = "MEDIUM"

        return RiskScoreResponse(
            status="success",
            user_id=req.user_id,
            risk_score=calculated,
            risk_level=level,
            triggered_rules=rules
        )
