FROM node:lts-alpine

RUN mkdir app
WORKDIR /app

COPY package.json ./
COPY jest.config.js ./
RUN npm install

COPY tsconfig.json ./
COPY ./src ./src

ENV GIT_WORK_TREE=/app/server GIT_DIR=/app/.git

CMD npm run test