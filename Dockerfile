# Use an official Python runtime as a parent image
FROM node:latest

# Set the working directory to /app
WORKDIR /stream_service

# Copy the current directory contents into the container at /app
ADD . /stream_service

# Install any needed packages specified in requirements.txt
RUN npm install

# Make port 80 available to the world outside this container
EXPOSE 2410

# Define environment variable
ENV NAME Whatisthis

# Run app.py when the container launches
CMD ["node", "stream_service/index.js"]