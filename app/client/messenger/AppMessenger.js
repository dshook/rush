import messenger from './Messenger';

var appMessenger = new messenger();
appMessenger.ev = messenger.event;

module.exports = appMessenger;