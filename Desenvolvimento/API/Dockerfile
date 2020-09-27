FROM node:12

WORKDIR /app

COPY ./Database/* /db_scripts/
COPY ./Server/* /app/

RUN npm install

CMD [ "npm", "start" ]
