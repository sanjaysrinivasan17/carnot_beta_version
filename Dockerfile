# Use the official Node.js image as the base image
FROM node:16-alpine as build-stage

RUN apk update && apk add bash

# Set the working directory in the container
WORKDIR /usr/src/app

ARG configuration=production

RUN npm cache clean --force \
    && npm install -g npm@9.2.0 \
    && npm update @angular/cli --force

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

COPY ./src/assets/leaflet-side-by-side ./node_modules/leaflet-side-by-side

#RUN npm run test -- --browsers ChromeHeadlessNoSandbox --watch=false

# Install the dependencies
RUN npm ci --force

# Copy the rest of the application's files to the container
COPY . .

# Build the Angular application
RUN npm run build -- --output-path=./dist/out
#    --configuration $configuration

# Use the official Nginx image as the production image
FROM nginx:alpine

# Copy the default nginx.conf provided from node image
#COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf

#COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built application from the build stage
COPY --from=build-stage /usr/src/app/dist/out/ /usr/share/nginx/html

# Exposing a port, here it means that inside the container
# the app will be using Port 80 while running
EXPOSE 4200 80

SHELL ["/bin/bash", "-o", "pipefail", "-c"]


