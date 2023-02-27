FROM node:16

COPY ./backend /usr/share/nginx/api

WORKDIR /usr/share/nginx/api

RUN npm install

CMD ["npm", "run", "dev"]