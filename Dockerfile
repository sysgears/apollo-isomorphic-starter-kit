FROM node:8.9-alpine

MAINTAINER Victor Vlasenko <victor.vlasenko@sysgears.com>

ARG APP_DIR

RUN apk add --no-cache tini git && \
    mkdir -p ${APP_DIR}/build && \
    mkdir -p ${APP_DIR}/node_modules && \
    mkdir -p /home/node/.cache/yarn && \
    chown node:node -R ${APP_DIR} /home/node

USER node

ENTRYPOINT ["/sbin/tini", "--"]
