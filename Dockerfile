FROM node:18-alpine AS base

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .
COPY .env .env

RUN npm run build

ENV NODE_ENV production

EXPOSE 8080
CMD [ "npm", "start" ]