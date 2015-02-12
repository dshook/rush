var messenger = require('./Messenger');
var ev = require('./Messenger').event;

var appMessenger = new messenger();
appMessenger.ev = ev;

module.exports = appMessenger;