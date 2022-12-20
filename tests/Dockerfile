FROM node:lts-alpine

RUN apk --no-cache add curl
RUN apk add make g++ python3 git
RUN npm i -g node-pre-gyp

WORKDIR /server

COPY ./server ./
RUN rm -rf node_modules
RUN npm i -g pnpm
RUN pnpm i


RUN mkdir /app
WORKDIR /app

COPY tests/package*.json ./
RUN npm i 
COPY tests/jest.config.js ./
COPY tests/setupTests.ts ./

COPY tests/tsconfig.json ./
COPY tests/src ./src

ENV GIT_WORK_TREE=/app/server GIT_DIR=/app/.git

CMD npm run test