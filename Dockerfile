FROM node:14.18.2-slim as node-build

WORKDIR /

COPY yarn.lock package.json ./

RUN yarn install

COPY . .

RUN yarn run build


FROM node:14.18.2-slim

WORKDIR /

COPY --from=node-build /dist ./dist
COPY --from=node-build /node_modules ./node_modules
