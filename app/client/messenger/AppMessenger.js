import Messenger from './Messenger';

var appMessenger = new Messenger();
appMessenger.ev = Messenger.event;

module.exports = appMessenger;
