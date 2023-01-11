# Use the official Node.js image as the base image
FROM node:14.20.0-alpine as build-stage

# Set the working directory in the container
WORKDIR /usr/src/app

ARG configuration=production

RUN npm cache clean --force

# Install the Angular CLI globally
RUN npm install -g @angular/cli

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm ci
#    --only=production

# Copy the rest of the application's files to the container
COPY . .

# Build the Angular application
RUN npm run build --output-path=./dist/out
#    --configuration $configuration

# Use the official Nginx image as the production image
FROM nginx:alpine

# Copy the built application from the build stage
COPY --from=build-stage /usr/src/app/dist/ /usr/share/nginx/html

# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port that the development server runs on
EXPOSE 80

# Start the development server

# Start Nginx
#CMD ["nginx", "-g", "daemon off;"]

# Start app
#CMD ["ng","serve","--host", "0.0.0.0"]
