# Stage 1 : Build React App
FROM node:16.14.0 as react-build
WORKDIR /app

COPY ./app/package*.json .
RUN npm install
COPY ./app .
RUN npm run-script build


# Stage 2: Run Node Service
FROM node:16.14.0-alpine3.15
RUN mkdir -p /opt/public
WORKDIR /opt
# Copy the server side code
COPY ./server /opt
# Copy built code from folder from Stage 1
COPY --from=react-build /app/build/ ./public/

ARG PORT=8000
ENV PORT=${PORT}

RUN npm install

CMD [ "/usr/local/bin/node", "index.js" ]