var React = require('react');

module.exports = React.createClass({
  render() {
    return (
      <div className="modal">
        <div className="modal-inner">
          <a rel="modal:close">&times;</a>
          <div className="modal-content"></div>
        </div>
      </div>
    )
  }
});
