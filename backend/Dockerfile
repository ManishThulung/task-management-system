# FROM node:20-alpine
# WORKDIR /app
# COPY package*.json .
# COPY tsconfig*.json .
# RUN npm install
# RUN npm run build
# COPY . .
# EXPOSE 6000
# CMD ["node", "dist/src/server.js"]

#Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json .
COPY tsconfig*.json .
RUN npm install
COPY . .
RUN npm run build

#Production stage
FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json .
RUN npm ci --only=production
COPY --from=build /app/dist ./dist
# RUN npm run seed
CMD ["node", "dist/server.js"]