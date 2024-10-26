# Use the latest Node.js image
FROM node:latest

# Set the working directory inside the container
WORKDIR /

# Copy package files first and install dependencies
COPY package*.json ./
RUN npm install

# Copy remaining project files to the working directory
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
