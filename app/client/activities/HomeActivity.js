var React = require('react');
var test =  React.createFactory(require('../views/layout.jsx'));

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
  React.render(new test({text: 'Hello React'}), this.$root[0]);
};
