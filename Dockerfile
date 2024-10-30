
FROM alpine:3


RUN apk update && apk add --no-cache \
    chromium \
    nodejs \
    npm \
    bash


RUN npm install -g chrome-headless-render-pdf

WORKDIR /app
COPY package.json .
COPY server.js .


RUN npm install


EXPOSE 3000


CMD ["node", "server.js"]
