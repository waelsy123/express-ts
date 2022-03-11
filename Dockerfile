FROM node:14

RUN npm update
RUN apt update

COPY . /express-ts
WORKDIR /express-ts

RUN yarn install

CMD ["yarn", "start"]
