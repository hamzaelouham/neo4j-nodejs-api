FROM node:19-alpine3.16

WORKDIR /app 

COPY  package*.json .

RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]

