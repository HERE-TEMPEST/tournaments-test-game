FROM node:14.18.2-slim

WORKDIR /app

COPY node_modules/ ./node_modules/

COPY package*.json ./
COPY yarn*.lock ./

RUN yarn install

COPY . .

RUN npm install -g typescript

RUN tsc