# Use node:18 for build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy config and install dependencies
COPY package.json package-lock.json tsconfig.json vite.config.ts ./
RUN npm install

# Copy project files
COPY . .

# Build app
RUN npm run build

# Use Nginx to serve build files
FROM nginx:alpine

# Copy built files to Nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]