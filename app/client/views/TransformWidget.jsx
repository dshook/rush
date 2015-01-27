var React = require('react');

module.exports = React.createClass({
  render() {
    return (
      <div className="transform-widget">
        <p>Name {this.props.name}</p>
      </div>
    )
  }
});
