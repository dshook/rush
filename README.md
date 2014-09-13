# Project Template

## Project Structure

* `app/client` All client-side code
* `app/server` All server code
* `app/node_modules` Local libraries and shared code
* `public` Web root of the node app
* `public/dist` Output directory for client artifacts
* `style` LESS style sheets

## What ya got

* Browserify v5 compiler
* NodeJS server app
* Grunt task runner
* LESS css pre-procesor
* Bootstrap 3 style framework
* Activities state management
* billy application harness
* tape testing library

## How to use

Install local deps

```
$ npm install
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

## Server

Port is `12345` or `PORT` environment variable (or use a local `.env` file)

