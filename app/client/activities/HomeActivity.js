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
  //init layout with all deps passed down
  React.render(
    new Layout({
      transport: this.transport,
      storage: this.storage,
    })
    , this.$root[0]
  );
};
