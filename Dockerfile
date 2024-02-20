# Multi-stage builds

# Stage 1: Create builder
FROM node:20-bullseye-slim as builder
WORKDIR /usr/src/app

# Copy files and install deps
COPY . .
RUN npm install

# Build js files and create binaries for cli tool
RUN npm run build

# Stage 2: Create an intermediate stage that contains production only packages
FROM node:20-bullseye-slim as node_builder
WORKDIR /usr/src/app
COPY package*.json ./

# Install production only packages
RUN npm ci --only=production

# Stage 3: Serve the app in next stage
FROM node:20-bullseye-slim

# Create a production app
ARG SERVER_URL
ENV TODOS_SERVER_URL=$SERVER_URL
ENV NODE_ENV production
WORKDIR /usr/src/app

# Copy only necessary files
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/build ./build
COPY --from=node_builder /usr/src/app/node_modules ./node_modules

# Install package globally to access as binary
RUN npm i -g
USER node

# Get even todos
CMD [ "npm", "start", "--", "-gte" ]