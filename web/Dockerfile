# pull official base image
FROM node:19-alpine3.16 

WORKDIR /app
# install app dependencies
#copies package.json and package-lock.json to Docker environment
COPY package.json yarn.lock ./

# Installs all node packages
RUN yarn install 

COPY . ./

# Expose port
EXPOSE 3000
# Containers run nginx with global directives and daemon off
CMD ["yarn", "start"]