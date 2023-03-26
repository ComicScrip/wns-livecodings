#!/bin/sh
docker compose -f docker-compose.staging.yml down && \
    docker compose -f docker-compose.staging.yml pull && \
    docker compose -f docker-compose.staging.yml --env-file .env.staging up -d;