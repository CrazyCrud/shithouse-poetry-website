# develop stage
FROM node:lts-alpine as develop-stage
WORKDIR /usr/src/web
COPY package*.json ./

RUN ls

RUN npm install

RUN npm install -g @vue/cli

COPY . .

# build stage
FROM develop-stage as build-stage
CMD ["npm", "run", "build"]

# production stage
# TODO
