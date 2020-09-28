FROM node:12

WORKDIR /app

COPY ./database/* /db_scripts/

COPY ./server/*.json ./

COPY ./server/*.js ./
COPY ./server/controllers/*.js ./controllers/
COPY ./server/implementations/*.js ./implementations/
COPY ./server/models/*.js ./models/
COPY ./server/repositories/*.js ./repositories/
COPY ./server/services/*.js ./services/


RUN npm install

CMD [ "npm", "start" ]
