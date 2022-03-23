# About this project
A small web application to record time logs. 

> Frontend - Built with React.js, scafolded with create-react-app.

> Server - Built with Node.js, Express.js, and SQLite.

Application has 2 functionalities:
- View stored time logs as a table sorted by start datetime.
- Add new time logs with
  - start datetime
  - end datetime
  - description

Information is stored in SQLite database.

# Developer's guide

## Running on Dev machine

- Install Dependencies - Run the following command
  ```
  cd app && npm install && cd ../server && npm install && cd ..
  ```

- Run the client
  ```
  cd app && npm start
  ```
  This will start the client application (ReactJS) on port 3000. Do not access the app on this port, as it needs to be accesed using the server port.

- Run the server
  ```
  cd server && npm start
  ```
  This will start the server on port 8000 and proxy request for Frontend to port 3000

- Access the frontend
  ```
  http://localhost:8000
  ```

## Running with Docker
- Build Docker Image
    ```
    docker build -t log-entry-app-and-server .
    ```
- Run the server
    ```
    docker run -p 8000:8000 -it log-entry-app-and-server
    ```
- Access the frontend
  ```
  http://localhost:8000
  ```