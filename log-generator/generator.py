import json
import logging
import os
import random
import time
from datetime import datetime, timezone
from pathlib import Path

from faker import Faker


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
)

fake = Faker()

LOG_DIRECTORY = Path(os.getenv("LOG_DIRECTORY", "/logs"))
SCENARIO_PAUSE_SECONDS = int(os.getenv("SCENARIO_PAUSE_SECONDS", "5"))


def iso_at_timestamp() -> str:
    # Elasticsearch and Kibana both recognize @timestamp as the canonical event time field.
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def build_event(log_source: str, event_type: str, source_ip: str, message: str) -> dict:
    # The event schema is intentionally fixed because Phase 2 depends on these exact fields.
    return {
        "@timestamp": iso_at_timestamp(),
        "log_source": log_source,
        "event_type": event_type,
        "source_ip": source_ip,
        "message": message,
    }


def log_path_for_source(log_source: str) -> Path:
    return LOG_DIRECTORY / f"{log_source}.log"


def append_local_log(event: dict) -> None:
    # The PRD requires the generator to write JSON lines to disk first.
    # Filebeat then tails those files and ships them into Kafka on the generator's behalf.
    log_path = log_path_for_source(event["log_source"])
    log_path.parent.mkdir(parents=True, exist_ok=True)
    with log_path.open("a", encoding="utf-8") as log_file:
        log_file.write(json.dumps(event) + "\n")


def write_batch(events: list[dict]) -> None:
    for event in events:
        append_local_log(event)


def generate_benign_background() -> None:
    events = [
        build_event(
            log_source="ssh",
            event_type="authentication_success",
            source_ip=fake.ipv4_public(),
            message=f"Accepted publickey login for {fake.user_name()} from {fake.ipv4_public()}",
        ),
        build_event(
            log_source="firewall",
            event_type="allowed_connection",
            source_ip=fake.ipv4_public(),
            message=f"Allowed outbound connection to 198.51.100.{random.randint(1, 254)}:{random.choice([80, 443, 53])}",
        ),
        build_event(
            log_source="web",
            event_type="http_request",
            source_ip=fake.ipv4_public(),
            message="GET /dashboard HTTP/1.1 200",
        ),
    ]
    write_batch(events)


def simulate_ssh_bruteforce() -> None:
    attacker_ip = fake.ipv4_public()
    usernames = ["root", "admin", "ubuntu", "postgres", "oracle", "test"]
    events = []
    for _ in range(120):
        username = random.choice(usernames)
        events.append(
            build_event(
                log_source="ssh",
                event_type="authentication_failure",
                source_ip=attacker_ip,
                message=f"Failed password for invalid user {username} from {attacker_ip} port {random.randint(20000, 65000)} ssh2",
            )
        )

    logging.info("Writing %s SSH brute force events to %s", len(events), log_path_for_source("ssh"))
    write_batch(events)


def simulate_port_scan() -> None:
    attacker_ip = fake.ipv4_public()
    target_host = fake.ipv4_private()
    scanned_ports = random.sample(range(1, 1024), 60)
    events = []
    for port in scanned_ports:
        protocol = random.choice(["tcp", "tcp", "udp"])
        events.append(
            build_event(
                log_source="firewall",
                event_type="connection_attempt",
                source_ip=attacker_ip,
                message=f"Denied connection attempt from {attacker_ip} to {target_host}:{port}/{protocol}",
            )
        )

    logging.info("Writing %s port scan events to %s", len(events), log_path_for_source("firewall"))
    write_batch(events)


def simulate_sql_injection() -> None:
    attacker_ip = fake.ipv4_public()
    payloads = [
        "/login?username=admin' OR 1=1 --&password=test",
        "/reports?id=10 UNION SELECT username,password FROM users",
        "/inventory?sort=name; DROP TABLE customers; --",
        "/search?q=' UNION SELECT credit_card_number FROM vault --",
        "/checkout?promo=' OR 1=1#",
    ]
    events = []
    for request_path in payloads * 12:
        events.append(
            build_event(
                log_source="web",
                event_type="http_request",
                source_ip=attacker_ip,
                message=f"GET {request_path} HTTP/1.1 500",
            )
        )

    logging.info("Writing %s SQL injection events to %s", len(events), log_path_for_source("web"))
    write_batch(events)


def main() -> None:
    LOG_DIRECTORY.mkdir(parents=True, exist_ok=True)
    logging.info("Writing PRD-aligned JSON logs to %s for Filebeat to harvest", LOG_DIRECTORY)

    while True:
        generate_benign_background()
        simulate_ssh_bruteforce()
        time.sleep(2)

        generate_benign_background()
        simulate_port_scan()
        time.sleep(2)

        generate_benign_background()
        simulate_sql_injection()
        time.sleep(SCENARIO_PAUSE_SECONDS)


if __name__ == "__main__":
    main()
