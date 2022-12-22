FROM node:lts-alpine

RUN apk --no-cache add curl
RUN apk add make g++ python3 git
RUN npm i -g node-pre-gyp

RUN mkdir /app
WORKDIR /app

COPY package.json ./
COPY /pnpm-lock.yaml ./
RUN npm i -g pnpm
RUN pnpm i

COPY src src
COPY tsconfig.json tsconfig.json
COPY .env .env

CMD npm start