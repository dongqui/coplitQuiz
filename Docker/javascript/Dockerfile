FROM node:8-slim

RUN npm install -g mocha
RUN npm install chai

COPY docker-entrypoint /

RUN ["chmod", "+x", "/docker-entrypoint"]

ENTRYPOINT ["/docker-entrypoint"]
