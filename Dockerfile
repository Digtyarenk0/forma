FROM node:20-alpine

RUN apk add --no-cache redis python3 make g++ xdg-utils

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --force

COPY . .

RUN yarn workspace fe add -D @swc/cli @swc/core && \
    yarn workspace be add -D @swc/cli @swc/core

RUN cd be && yarn add bcrypt --force

CMD redis-server --daemonize yes && yarn start