var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div class="wrapper">
        <div className="header">
          <h1>Rush</h1>
        </div>
        <div className="main">
          <p>Main Content</p>
        </div>
        <div className="footer">
          <p>Footer Content</p>
        </div>
      </div>
    )
  }
});
