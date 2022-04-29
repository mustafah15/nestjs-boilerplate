
FROM node:alpine

ENV DIR=/home/node/app
RUN mkdir -p ${DIR}
WORKDIR ${DIR}
COPY package*.json tsconfig.json tsconfig.build.json ./

RUN npm install

RUN npm install -g @nestjs/cli

RUN npm run build

COPY . .

EXPOSE 3000

CMD ["node", "dist/main.js"]

