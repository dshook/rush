# Rush

## Requirements

* NodeJS

## How to use

Install local deps

```
$ npm install

$ npm install -g gulp
```

Build the client app

```
$ npm run build
```

Start the server

```
$ npm start
```

Run automated testing

```
$ npm test
```

Debug server

```
$ npm run debug
```

## Project Structure

* `app/client` All client-side code
* `app/server` All server code
* `app/shared` Code shared between client and server
* `app/node_modules` Local libraries and shared code
* `public` Web root of the node app
* `public/dist` Output directory for client artifacts
* `style` SCSS style sheets

## Server

Port is `12345` or `PORT` environment variable (or use a local `.env` file)

