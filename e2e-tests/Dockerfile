FROM mcr.microsoft.com/playwright:v1.16.2-focal

RUN mkdir /server
WORKDIR /server

COPY ./server/package.json ./package.json
COPY ./server/pnpm-lock.yaml ./pnpm-lock.yaml

RUN npm i -g pnpm
RUN pnpm i

COPY ./server/src ./
COPY ./server/.env ./
COPY ./server/.eslintrc.js ./
COPY ./server/.npmrc ./
COPY ./server/tsconfig.json ./

RUN mkdir /e2e-tests
WORKDIR /e2e-tests

COPY e2e-tests/package*.json ./
RUN npm i 
RUN npx playwright install

COPY e2e-tests/playwright.config.ts ./
COPY e2e-tests/global-setup.ts ./
COPY e2e-tests/tsconfig.json ./
COPY ./server/.env ./.env

CMD npm run test