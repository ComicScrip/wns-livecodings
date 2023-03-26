#!/bin/sh
docker compose -f docker-compose.staging.yml down && \
    docker compose -f docker-compose.staging.yml pull && \
    GATEWAY_PORT=8001 docker compose -f docker-compose.staging.yml up -d;