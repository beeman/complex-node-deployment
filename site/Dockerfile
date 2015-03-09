FROM dockerfile/nodejs

RUN mkdir /src
WORKDIR /src
ADD . /src

RUN npm install

EXPOSE 8080

CMD npm start
