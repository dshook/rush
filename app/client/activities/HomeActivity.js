var React = require('react');

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
};
