var React = require('react');

module.exports = React.createClass({
  handleAdd(){
    this.props.onClick();
  },

  render() {
    return (
      <div onClick={this.handleAdd} className="transform-widget add">
        <p><i className="fa fa-plus"></i> Add</p>
      </div>
    )
  }
});
