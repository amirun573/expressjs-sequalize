# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) to the working directory
COPY package.json package-lock.json* yarn.lock* ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your Node.js application is listening on (if applicable)
EXPOSE 3000

# Command to start your Node.js application
CMD ["node", "index.js"]
