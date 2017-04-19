FROM node:7

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# RUN npm install -g yarn --silent
RUN npm install -g yarn

COPY package.json /usr/src/app/
RUN yarn

COPY . /usr/src/app

RUN npm run build

EXPOSE 3000

CMD ["sh", "docker-entrypoint.sh"]
