# Rush

The premise of this project is to create an interface that makes it easy to get data from one place to another.  A modern SSIS if you will.  Theoretically this should be fairly straightforward using node streams to connect data sources, transforms, and destinations.  However, the maturity of database integrations, and node debugging pushed this project out of the scope of feasibility for me.  Nevertheless, it was a great project to work on and experience React, the gulp build process, babel transforms, streams, and more node.  Feel free to adapt and learn.

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

## License
MIT