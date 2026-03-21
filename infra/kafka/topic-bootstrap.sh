#!/usr/bin/env bash
set -euo pipefail

# This helper runs once during stack startup so every producer and consumer
# can rely on the raw-logs topic existing before they begin sending traffic.
echo "Waiting for Kafka broker to accept connections..."
cub kafka-ready -b kafka:29092 1 30

echo "Ensuring raw-logs topic exists..."
kafka-topics \
  --bootstrap-server kafka:29092 \
  --create \
  --if-not-exists \
  --topic raw-logs \
  --partitions 3 \
  --replication-factor 1

echo "Kafka topic bootstrap completed."
