FROM node:20.15.0-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install

ARG PORT=5000 

EXPOSE ${PORT}

CMD ["npm", "run", "start"]

