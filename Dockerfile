# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy Sequelize CLI configuration file
COPY .sequelizerc .

# Initialize Sequelize project
RUN npx sequelize-cli init

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port on which your Node.js application is running
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
