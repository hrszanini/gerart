FROM node:12

WORKDIR /app

COPY ./Database/* /db_scripts/

COPY ./server/*.json ./

COPY ./server/*.js ./
COPY ./server/controllers/*.js ./controllers/
COPY ./server/implementantions/*.js ./implementantions/
COPY ./server/models/*.js ./models/
COPY ./server/repositories/*.js ./repositories/


RUN npm install

CMD [ "npm", "start" ]
