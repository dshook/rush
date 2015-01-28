var React = require('react');
var Modal = require('./mixins/Modal.jsx');

module.exports = React.createClass({
  mixins: [Modal],
  open(){
    this.openModal('#widget-1');
  },

  render() {
    return (
      <div className="transform-widget" onClick={this.open}>
        <p>Name {this.props.name}</p>
        <div id="widget-1" className="widget-container">
          <div className="widget-modal">
            <p>Modal content here!</p>
          </div>
        </div>
      </div>
    )
  }
});
