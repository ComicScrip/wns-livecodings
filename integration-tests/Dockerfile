FROM node:lts-alpine

RUN apk --no-cache add curl
RUN apk add make g++ python3 git
RUN npm i -g node-pre-gyp

RUN mkdir /server
WORKDIR /server

COPY ./server/package.json ./package.json
COPY ./server/pnpm-lock.yaml ./pnpm-lock.yaml

RUN npm i -g pnpm
RUN pnpm i

COPY ./server/src ./src
COPY ./server/.env ./.env
COPY ./server/.eslintrc.js ./.eslintrc.js
COPY ./server/.npmrc ./.npmrc
COPY ./server/tsconfig.json ./tsconfig.json

RUN mkdir /app
WORKDIR /app

COPY integration-tests/package*.json ./
RUN npm i -g pnpm
RUN pnpm i 
COPY integration-tests/jest.config.js ./
COPY integration-tests/setupTests.ts ./

COPY integration-tests/tsconfig.json ./
COPY integration-tests/src ./src
COPY ./server/.env ./.env

CMD npm run test