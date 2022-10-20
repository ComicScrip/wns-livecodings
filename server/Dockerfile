FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app

COPY package.*json ./
RUN npm i -g pnpm
RUN pnpm i

COPY src src
COPY tsconfig.json tsconfig.json

CMD npm start