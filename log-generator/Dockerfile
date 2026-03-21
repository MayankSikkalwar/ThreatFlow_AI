# The generator is packaged independently so the Phase 1 stack can be started
# with a single docker-compose up --build and still carry its own dependencies.
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY generator.py ./

# The generator continuously emits security telemetry into Kafka so the full
# SIEM ingestion path can be exercised without any external data source.
CMD ["python", "generator.py"]
