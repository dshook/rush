var React        = require('react');
var Layout       = React.createFactory(require('../views/Layout.jsx'));

module.exports = HomeActivity;

/**
 * @constructor
 */
function HomeActivity($root, widgetStore)
{
  this.$root       = $root;
  this.widgetStore = widgetStore;
}

/**
 * @private
 */
HomeActivity.prototype.onStart = function()
{
  //init layout with all deps passed down
  React.render(
    new Layout({
      stores: {widgetStore: this.widgetStore}
    })
    , this.$root[0]
  );
};
