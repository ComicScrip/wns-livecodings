FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json ./
COPY /pnpm-lock.yaml ./
RUN npm i -g pnpm
RUN pnpm i

COPY sendMessage.ts .

CMD npm run test-message