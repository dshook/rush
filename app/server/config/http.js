var path = require('path');

module.exports = {

  // Port to listen on for http traffic
  port: process.env.PORT || 12345,

  // location to host static files
  webroot: path.resolve(path.join(__dirname, '../../../public')),

  // used for securing cookies etc
  cookieSecret: 'shhhh',

  connectionTimeout: 30000,

  uploadPath: './public/upload/'

};
