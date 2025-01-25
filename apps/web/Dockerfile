FROM node:22-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Clean and set permissions
RUN rm -rf .vite node_modules/.vite \
    && chown -R node:node .

# Switch to non-root user
USER node

# Expose port
EXPOSE 3002

# Start the application
CMD ["sh", "-c", "rm -rf node_modules/.vite && npm run dev -- --host"]