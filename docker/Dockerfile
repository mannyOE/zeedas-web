FROM node:10-alpine3.9 AS BUILD_IMAGE

# Specify sensitive keys as arguments
ARG REACT_APP_BASE_URL="https://api.dev.zeedas.com"

LABEL MAINTAINER="Chuka"
LABEL application="Zeedas Frontend Service"

RUN mkdir -p /home/node/frontend/node_modules && chown -R node:node /home/node/frontend

WORKDIR /home/node/frontend

ENV PATH /home/node/frontend/node_modules/.bin:$PATH

COPY package*.json ./

USER node

RUN npm ci --only=prod --silent

COPY --chown=node:node . ./

# Set environment variables
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL

RUN npm run build

FROM nginx:stable-alpine

COPY --from=BUILD_IMAGE /home/node/frontend/build /usr/share/nginx/html

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
