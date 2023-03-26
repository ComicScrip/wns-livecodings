#!/bin/sh
docker compose -f docker-compose.staging.yml down && \
    docker compose -f docker-compose.staging.yml pull && \
    docker compose -f docker-compose.staging.yml up -d --env-file .env.staging;