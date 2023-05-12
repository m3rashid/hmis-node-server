FROM node:16 as base

# Install deps needed for node-gyp
#  add libraries needed to build canvas
RUN apk add --no-cache build-base g++ libpng libpng-dev jpeg-dev pango-dev cairo-dev giflib-dev python

#  add glibc and install canvas
RUN apk --no-cache add ca-certificates wget  && \
    wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.35-r1/glibc-2.35-r1.apk && \
    apk add glibc-2.35-r1.apk && \
    npm i -g canvas;

WORKDIR /usr/src/app
RUN npm i -g yarn node-gyp

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .

FROM base as production
RUN yarn build
