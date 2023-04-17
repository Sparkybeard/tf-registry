FROM node:latest as build

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY bin/TFRegNodeTS ./bin/TFRegNodeTS

RUN npm install
COPY . .
RUN npm run build

FROM mcr.microsoft.com/cbl-mariner/base/nodejs:16

WORKDIR /tfreg
COPY package.json ./
RUN npm install
COPY --from=build /app/out  ./out
COPY --from=build /app/bin ./bin

EXPOSE 3000
CMD [ "npm", "run", "prod" ]
