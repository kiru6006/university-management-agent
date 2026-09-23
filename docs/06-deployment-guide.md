# Enterprise Deployment & Operations Guide
## University AI Operations Platform (UniOps-AI)

---

### Document Overview
This guide provides complete operational instructions for configuring, deploying, monitoring, and scaling the **University AI Operations Platform (UniOps-AI)** across local development, staging, and production Kubernetes environments.

---

## 1. Infrastructure Requirements

### Minimum Production Specifications (High-Availability Cluster)
- **FastAPI Application Nodes:** 3 Nodes (4 vCPU, 8 GB RAM each)
- **Angular Client / Nginx Ingress:** 2 Nodes (2 vCPU, 4 GB RAM each)
- **PostgreSQL 16 Primary + Read Replica:** 8 vCPU, 32 GB RAM, SSD Storage (Provisioned IOPS)
- **Qdrant Vector Database Cluster:** 3 Nodes (4 vCPU, 16 GB RAM each)
- **Redis 7.2 Cluster (Sessions + Queue):** 2 Nodes (2 vCPU, 8 GB RAM each)
- **On-Prem Fallback Inference Node (Optional):** 2x NVIDIA A100 / H100 GPUs for self-hosted Llama 3.3 70B inference via vLLM / Ollama.

---

## 2. Docker Compose (Local Dev & Testing)

```yaml
version: '3.9'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: uniops-backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql+asyncpg://uniops_user:uniops_secret@postgres:5432/uniops_db
      - REDIS_URL=redis://redis:6379/0
      - QDRANT_URL=http://qdrant:6333
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - JWT_SECRET_KEY=${JWT_SECRET_KEY}
    depends_on:
      - postgres
      - redis
      - qdrant
    volumes:
      - ./backend:/app

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: uniops-frontend
    ports:
      - "4200:80"
    depends_on:
      - backend

  postgres:
    image: postgres:16-alpine
    container_name: uniops-postgres
    environment:
      POSTGRES_USER: uniops_user
      POSTGRES_PASSWORD: uniops_secret
      POSTGRES_DB: uniops_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7.2-alpine
    container_name: uniops-redis
    ports:
      - "6379:6379"

  qdrant:
    image: qdrant/qdrant:latest
    container_name: uniops-qdrant
    ports:
      - "6333:6333"
    volumes:
      - qdrant_data:/qdrant/storage

volumes:
  postgres_data:
  qdrant_data:
```

---

## 3. Environment Variable Configuration (`.env.example`)

```bash
# Server Configuration
ENVIRONMENT=production
PORT=8000
ALLOWED_ORIGINS=https://portal.university.edu,https://admin.university.edu

# Security & Authentication
JWT_SECRET_KEY=replace_with_super_secure_256bit_key_here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=120

# Primary Databases
DATABASE_URL=postgresql+asyncpg://uniops_user:password@postgres-primary.internal:5432/uniops_db
READ_REPLICA_DATABASE_URL=postgresql+asyncpg://uniops_user:password@postgres-replica.internal:5432/uniops_db
REDIS_URL=redis://:password@redis.internal:6379/0
QDRANT_URL=http://qdrant.internal:6333
QDRANT_API_KEY=optional_qdrant_api_key

# LLM Providers (Multi-Tier Failover)
OPENAI_API_KEY=sk-proj-your-openai-api-key
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key
GEMINI_API_KEY=your-gemini-key
LOCAL_LLM_URL=http://vllm-cluster.internal:8000/v1

# External Integration Webhooks & Gateways
RAZORPAY_KEY_ID=rzp_live_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
SMTP_SERVER=smtp.office365.com
SMTP_PORT=587
SMTP_USER=no-reply@university.edu
SMTP_PASSWORD=your_smtp_password
TWILIO_OR_WHATSAPP_TOKEN=your_whatsapp_business_api_token
```

---

## 4. Deployment Runbook

### Step 1: Clone and Setup Configuration
```bash
git clone https://github.com/university-ai-agent/university-ai-agent.git
cd university-ai-agent
cp .env.example .env
# Edit .env with your production credentials
```

### Step 2: Database Migration & Seeding
```bash
# Run Alembic migrations
docker-compose run --rm backend alembic upgrade head

# Ingest university prospectus, syllabi, and bylaws into Qdrant Vector Store
docker-compose run --rm backend python scripts/ingest_knowledge_base.py
```

### Step 3: Launch Containers
```bash
docker-compose up -d --build
```

### Step 4: Health Check Verification
```bash
curl -f http://localhost:8000/api/v1/health
# Expected Output: {"status":"healthy","database":"connected","vector_db":"connected","redis":"connected"}
```

---

## 5. Observability, Logging & Telemetry

- **Prometheus & Grafana:** Monitors API request rates, p95/p99 latency, WebSocket active connection counts, and token throughput.
- **OpenTelemetry & LangSmith:** Distributed tracing across Orchestrator routing decisions, tool execution latencies, and RAG retrieval chunks.
- **Alerting Rules:** PagerDuty / Slack alerts fire if:
  - Error rate exceeds $1.0\%$ over a 5-minute rolling window.
  - LLM API latency exceeds $4,000\text{ ms}$.
  - System memory utilization exceeds $85\%$.
