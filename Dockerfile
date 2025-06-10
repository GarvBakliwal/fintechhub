# Stage 1: Build the Next.js app
FROM node:24-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy all files and build the app
COPY . .
RUN npm run build

# Stage 2: Run the app using a lightweight server
FROM node:24-alpine

# Set working directory
WORKDIR /app

# Copy only the necessary files from builder
COPY --from=builder /app/package.json /app/next.config.js /app/public ./ 
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]