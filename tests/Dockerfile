FROM node:lts-alpine

RUN mkdir app
WORKDIR /app

COPY package.json ./
COPY jest.config.js ./
RUN npm install

COPY tsconfig.json ./
COPY ./src ./src

CMD npm run test