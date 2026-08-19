# SentinelAI – Enterprise AI-Powered Unauthorized Screen Recording & Insider Threat Detection Platform

![SentinelAI Architecture](https://img.shields.io/badge/Security-Enterprise-shield?style=for-the-badge&color=0f172a)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-6DB33F?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=for-the-badge&logo=fastapi)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker)

SentinelAI is an enterprise-grade threat monitoring and DLP (Data Loss Prevention) platform engineered to detect unauthorized screen recording, external camera capture, insider suspicious activity, and confidential data exfiltration in real time.

---

## 🏗 System Architecture

```mermaid
graph TD
    subgraph Client Layer
        FE[React 19 Frontend Dashboard]
        WS_C[WebSocket Client]
    end

    subgraph API Gateway & Backend
        SB[Spring Boot 3 Backend API]
        SEC[Spring Security & JWT]
        WS_S[Spring WebSocket Engine]
        DB[(PostgreSQL Database)]
    end

    subgraph AI Engine Microservice
        FA[FastAPI AI Core]
        YOLO[YOLO v8 Object Detector]
        MP[MediaPipe Face/Pose Estimator]
        OCR[EasyOCR Text Detection]
        PM[Process & Activity Monitor]
    end

    FE -->|HTTPS / REST API| SB
    WS_C <-->|WSS / STOMP| WS_S
    SB --> SEC
    SB --> DB
    SB -->|Async HTTP / REST| FA
    FA --> YOLO
    FA --> MP
    FA --> OCR
    FA --> PM
```

---

## 🛠 Technology Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: TailwindCSS (Modern Dark Mode & Glassmorphism Design System)
- **State & Data Fetching**: TanStack React Query v5, Context API
- **Routing**: React Router v6
- **Forms & Validation**: React Hook Form + Zod
- **Visualizations**: Recharts
- **Icons**: Lucide React

### Backend
- **Framework**: Java 21 + Spring Boot 3.2
- **Security**: Spring Security + Stateful/Stateless JWT Authentication & RBAC
- **Persistence**: Spring Data JPA + Hibernate + PostgreSQL
- **Real-Time Engine**: Spring WebSocket + STOMP Messaging
- **Documentation**: OpenAPI 3.0 / Swagger UI
- **Utilities**: Lombok, Jackson, SLF4J

### AI Engine
- **Framework**: Python 3.12 + FastAPI + Uvicorn
- **Computer Vision**: OpenCV, Ultralytics YOLOv8, MediaPipe
- **Text & OCR**: EasyOCR
- **System Monitoring**: `psutil`
- **Schema & Validation**: Pydantic v2

---

## 📁 Repository Directory Structure

```
sentinel-ai/
├── docker-compose.yml          # Multi-container orchestration
├── .env.example                # Centralized environment configurations
├── README.md                   # System documentation
├── deployments/                # Kubernetes, Docker, & Nginx manifests
├── scripts/                    # Database migrations & setup utility scripts
├── shared/                     # Shared OpenAPI schemas & API contracts
├── docs/                       # Architecture diagrams & API reference docs
├── frontend/                   # React 19 UI Dashboard Web Application
├── backend/                    # Spring Boot 3 Core Backend Service
└── ai-engine/                  # FastAPI Computer Vision & Threat Engine
```

---

## 🚀 Quick Start Guide (Docker Compose)

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (v24+)
- [Git](https://git-scm.com/)

### Step 1: Clone & Configure
```bash
git clone https://github.com/your-org/sentinel-ai.git
cd sentinel-ai
cp .env.example .env
```

### Step 2: Spin Up Infrastructure & Application
```bash
docker-compose up --build -d
```

### Access Points:
- **Frontend Dashboard**: `http://localhost:3000`
- **Backend Spring API**: `http://localhost:8080/api/v1`
- **Backend Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **AI Engine FastAPI Docs**: `http://localhost:8000/docs`
- **PostgreSQL Database**: `localhost:5432` (Database: `sentinel_db`)

---

## 🧪 Local Manual Development Setup

### 1. Backend (Spring Boot)
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### 2. AI Engine (FastAPI)
```bash
cd ai-engine
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

### 3. Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

---

## 🛰 Core API Specification (Endpoints Overview)

### Auth & Security
- `POST /api/v1/auth/login` - Authenticate user & issue JWT
- `POST /api/v1/auth/refresh` - Refresh access tokens

### Incident & Alert Management
- `GET /api/v1/incidents` - List threat incidents with pagination & filters
- `POST /api/v1/incidents` - Log a new insider threat incident
- `GET /api/v1/alerts` - Fetch real-time security alerts

### AI Engine Threat Endpoints
- `POST /process-monitor` - Scan running system processes for unauthorized tools
- `POST /screen-detection` - Analyze screen captures for recording software
- `POST /webcam-monitor` - Detect secondary recording devices or suspicious camera feed
- `POST /object-detection` - Detect mobile phones/cameras in workspace
- `POST /face-detection` - Detect multi-person or unauthorized observer looking at screen
- `POST /risk-score` - Calculate real-time employee risk score index
- `POST /ocr` - Extract confidential text on screen

---

## 🔒 Security & Compliance
- **Role-Based Access Control (RBAC)**: `ROLE_ADMIN`, `ROLE_ANALYST`, `ROLE_AUDITOR`, `ROLE_USER`
- **Audit Logging**: Mandatory immutable timestamped logs for all system interactions
- **JWT Standard**: HMAC-SHA256 signature validation with configurable token lifetimes

---

## 📜 License & Support
Distributed under the MIT License. See `LICENSE` for more information.
