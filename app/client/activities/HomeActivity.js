var React        = require('react');
var Layout       = React.createFactory(require('../views/Layout.jsx'));

module.exports = HomeActivity;

/**
 * @constructor
 */
function HomeActivity($root, storage, transport)
{
  this.$root     = $root;
  this.transport = transport;
  this.storage   = storage;
}

/**
 * @private
 */
HomeActivity.prototype.onStart = function()
{
  React.render(new Layout({text: 'Hello React'}), this.$root[0]);
};
