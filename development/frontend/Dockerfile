FROM node:12

WORKDIR /app

COPY ./source/*.json        ./
COPY ./source/*.js          ./

COPY ./source/page/*.html    ./page/
COPY ./source/style/*.css   ./style/
COPY ./source/script/*.js   ./script/

RUN npm install

CMD [ "npm", "start" ]