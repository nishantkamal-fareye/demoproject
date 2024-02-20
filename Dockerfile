# Use the official Node.js image as a base image
FROM node:14

# Create a directory to hold the application code
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which your application will run
EXPOSE 9000

# Command to run the application
CMD ["node", "myapp1.js"]
