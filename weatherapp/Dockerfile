FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 6000
EXPOSE 6005

ENV API_KEY="1a7ee52df2f34d61b31171106241003"

# Command to run the application
CMD ["node", "forecast.js"]
