FROM node:22-alpine
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY prisma ./prisma/
COPY schema.zmodel ./
RUN npm install

# Expose port
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "start:dev"]