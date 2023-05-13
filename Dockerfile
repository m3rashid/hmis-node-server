FROM node:16 as base

# Install deps needed for node-gyp
#  add libraries needed to build canvas
RUN apt update && apt install build-essential python3 ca-certificates wget -y
RUN npm i -g yarn node-gyp canvas --force

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .

FROM base as production
RUN yarn build
