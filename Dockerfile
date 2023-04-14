FROM --platform=linux/amd64 node:latest as build

WORKDIR /app
ARG TARGETPLATFORM
ARG BUILDPLATFORM
COPY package.json ./
COPY yarn.lock ./

RUN echo "I am running on $BUILDPLATFORM, building for $TARGETPLATFORM"
RUN npm install
COPY . .
RUN npm run build:linux

FROM mcr.microsoft.com/cbl-mariner/base/core:2.0

COPY --from=build /app/dist/TFRegNodeTS-linux-x64 /usr/local/bin/tfreg
RUN ls -al /usr/local/bin

WORKDIR /citizen
EXPOSE 3000
CMD [ "npm", "run", "dev" ]
