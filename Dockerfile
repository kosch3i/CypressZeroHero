FROM cypress/base:20.11.0

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN npm install --force

RUN npm install --save-dev --force cypress

#RUN $(npm bin)/cypress verify

RUN [ "npm", "run", "cypress:run"]