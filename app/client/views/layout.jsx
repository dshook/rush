var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="layout">
          <p className="Bio-text">{this.props.text}</p>
      </div>
    )
  }
});
