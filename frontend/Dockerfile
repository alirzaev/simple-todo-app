FROM node:14 as build-stage

WORKDIR /usr/src/project

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ARG VUE_APP_API_URL

RUN yarn run build

FROM nginx:alpine

COPY --from=build-stage /usr/src/project/dist/ /usr/share/nginx/html