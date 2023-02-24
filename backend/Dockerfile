FROM node:16

COPY . /usr/share/nginx/api

WORKDIR /usr/share/nginx/api

RUN npm install

CMD ["npm", "run", "dev"]