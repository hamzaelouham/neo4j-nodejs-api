# pull official base image
FROM node:19-alpine3.16 AS FrontEnd

WORKDIR /app
# install app dependencies
#copies package.json and package-lock.json to Docker environment
COPY package.json yarn.lock ./

# Installs all node packages
RUN yarn install 

COPY . ./

RUN yarn run build

#Stage 2

FROM nginx:1.19.0

WORKDIR /usr/share/nginx/html
# Remove default nginx static resources
RUN rm -rf ./*
# Copies static resources from builder stage
COPY --from=FrontEnd /app/build .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]