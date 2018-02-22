FROM node:latest
# RUN mkdir -p
# set the working directory to /usr/src/app
WORKDIR /usr/src/app

# copy the package.json file to /usr/app
COPY package*.json ./

# install node_modules
RUN npm install

# copy all the files from the project's root to /usr/app
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
