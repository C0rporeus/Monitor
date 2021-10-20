# back-end

> ### Node backend (Express + sqlite + socketio + serialport ) software to get data from device by serial port, store in sqlite and send to frontend in real time.

This repo is functionality complete — PRs and issues welcome!

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `rm -f data/inspiramed.db && node db/createdb.js` to create database with example data
- `npm run dev` to start the local server

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [node-sqlite3](https://github.com/mapbox/node-sqlite3) - For create, store data in database file
- [socket.io](https://github.com/socketio/socket.io) - For enable real-time bidirectional event-based communication
- [node-serialport](https://github.com/serialport/node-serialport) - For access to serial ports with JavaScript

- [pretter + eslint + airbnb style](https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a) - For standard code

## Application Structure

- `server.js` - The entry point to our application. This file requires the file with our implementation.
- `app.js` - This file defines our express server and socket io. It also requires the routes and models we'll be using in the application.
- `data/` - This folder contains database.
- `db/` - This folder contains schema, methods for database, and script to createdb.
- `static/` - This folder contains static files i.e: build of react app.
