# Use the official Node.js image as the base image
FROM node:16-alpine as build-stage

# install chrome for protractor tests
#RUN \
#  echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
#  && echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
#  && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
#  && apk --no-cache update \
#  && apk --no-cache upgrade \
#  && apk add --no-cache --virtual .build-deps chromium chromium-chromedriver \
#  && rm -rf /var/cache/apk/* /tmp/*
#
#ENV CHROME_BIN /usr/bin/chromium-browser

# Set the working directory in the container
WORKDIR /usr/src/app

ARG configuration=production

RUN npm cache clean --force \
    && npm install -g npm@9.2.0 \
    && npm update @angular/cli --force

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm ci --legacy-peer-deps

COPY ./src/assets/leaflet-side-by-side ./node_modules/leaflet-side-by-side

# Copy the rest of the application's files to the container
COPY . .

# run tests
#RUN ng test --watch=false
#RUN ng e2e --port 4202

# Build the Angular application
RUN npm run build -- --output-path=./dist/out --configuration $configuration

############
### prod ###
############

# Use the official Nginx image as the production image
FROM nginx:alpine

# Copy the default nginx.conf provided from node image
COPY security-headers.conf /etc/nginx/security-headers.conf

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf  /etc/nginx/conf.d/default.conf

# Copy the built application from the build stage
COPY --from=build-stage /usr/src/app/dist/out/ /usr/share/nginx/html

COPY certs /etc/nginx/ssl

# Exposing a port, here it means that inside the container
# the app will be using Port 80 while running
EXPOSE 80
EXPOSE 443

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# run nginx
CMD ["nginx", "-g", "daemon off;"]


