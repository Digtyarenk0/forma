FROM node:22.3.0

WORKDIR /app

COPY . .

RUN npm run migration:run