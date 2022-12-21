FROM mcr.microsoft.com/playwright:v1.16.2-focal

RUN mkdir /app
WORKDIR /app

COPY e2e-tests/package*.json ./
RUN npm i 
RUN npx playwright install

COPY e2e-tests/playwright.config.ts ./playwright.config.ts
COPY e2e-tests/tsconfig.json ./tsconfig.json

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

WORKDIR /app

CMD npm run test