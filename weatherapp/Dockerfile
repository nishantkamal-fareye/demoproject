FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 7004
EXPOSE 7004

ENV API_KEY="0463d36f8a64d3405f77ae069770d0a4"

# Command to run the application
CMD ["node", "forecast.js"]
