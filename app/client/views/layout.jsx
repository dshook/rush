var React = require('react');
var WidgetManager = require('./WidgetManager.jsx');
var ModalTemplate = require('./ModalTemplate.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="wrapper">
        <div className="header">
          <div className="cozy">
            <h1><i className="fa fa-bolt"></i> Rush</h1>
          </div>
        </div>
        <div className="main">
          <WidgetManager {...this.props} />
        </div>
        <div className="footer">
          <p>Footer Content</p>
        </div>
        <ModalTemplate />
      </div>
    )
  }
});
