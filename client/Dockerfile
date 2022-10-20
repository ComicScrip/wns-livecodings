FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
COPY .npmrc .npmrc

RUN npm i -g pnpm
RUN pnpm i

COPY postcss.config.js postcss.config.js 
COPY tsconfig.json tsconfig.json
COPY tailwind.config.js tailwind.config.js
COPY public public
COPY src src

CMD npm start