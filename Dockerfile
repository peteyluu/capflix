# specify the node base image with your desired version node:<version>
# the first thing we need to do is define from what image we want to build from.
# -> Here we will use the latest LTS version `carbon` of `node` available from the Docker Hub
FROM node:carbon

# create a directory to hold the app code inside the image, this will be the working directory for your app
# -> Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
# if you are building you code for product
# RUN npm install --only=production

# Note that, rather than copying the entire working directory, we are only copying the package.json file.
# This allows us to take advantage of cached Docker layers.

# To bundle your app's source code inside the Docker image, use the COPY instruction:
COPY . .

# App binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the doker daemon:
EXPOSE 3000

# define the command to run your app using CMD which defines your runtime.
# here we will use the basic npm start to run node server.js to start server.
CMD [ "npm", "start" ]