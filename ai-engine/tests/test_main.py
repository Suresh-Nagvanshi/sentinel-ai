from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "HEALTHY"

def test_process_monitor():
    payload = {"user_id": "usr_test_123"}
    response = client.post("/process-monitor", json=payload)
    assert response.status_code == 200
    assert response.json()["status"] == "success"

def test_risk_score():
    payload = {
        "user_id": "usr_test_123",
        "active_process_count": 5,
        "screen_recording_flag": True,
        "unauthorized_devices_count": 1,
        "face_count": 2,
        "recent_anomalies_count": 3
    }
    response = client.post("/risk-score", json=payload)
    assert response.status_code == 200
    assert response.json()["risk_level"] == "CRITICAL"
