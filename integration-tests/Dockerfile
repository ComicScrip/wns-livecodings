FROM node:lts-alpine

RUN apk --no-cache add curl
RUN apk add make g++ python3 git
RUN npm i -g node-pre-gyp

RUN mkdir /app
WORKDIR /app

COPY integration-tests/package*.json ./
RUN npm i 
COPY integration-tests/jest.config.js ./
COPY integration-tests/setupTests.ts ./

COPY integration-tests/tsconfig.json ./
COPY integration-tests/src ./src

ENV GIT_WORK_TREE=/app/server GIT_DIR=/app/.git

RUN mkdir /server
WORKDIR /server

COPY ./server ./
RUN rm -rf node_modules
RUN npm i -g pnpm
RUN pnpm i


WORKDIR /app


CMD npm run test