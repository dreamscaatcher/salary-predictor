FROM node:18-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Set environment to production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application in production mode
CMD ["npm", "start"]
