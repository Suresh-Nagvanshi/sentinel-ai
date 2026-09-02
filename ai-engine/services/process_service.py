import datetime
from typing import List
from schemas.schemas import ProcessMonitorRequest, ProcessMonitorResponse, RunningProcessInfo

class ProcessMonitorService:
    """Service to scan for unauthorized process executions like OBS, Camtasia, Snagit, etc."""

    def scan_processes(self, req: ProcessMonitorRequest) -> ProcessMonitorResponse:
        # Placeholder psutil integration logic
        sample_flagged = [
            RunningProcessInfo(pid=4102, name="obs64.exe", is_suspicious=True, risk_factor=0.95),
            RunningProcessInfo(pid=8812, name="camtasia.exe", is_suspicious=True, risk_factor=0.90)
        ]
        return ProcessMonitorResponse(
            status="success",
            unauthorized_detected=True,
            flagged_processes=sample_flagged,
            timestamp=datetime.datetime.now(datetime.timezone.utc).isoformat()
        )
