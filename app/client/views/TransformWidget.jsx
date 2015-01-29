var React     = require('react');
var Modal     = require('./mixins/Modal.jsx');
var ModalBody = require('./TransformWidgetBody.jsx');

module.exports = React.createClass({
  mixins: [Modal],
  open(){
    this.openModal(ModalBody);
  },

  remove(e){
    this.props.remove(this.props.reactKey);
    e.stopPropagation();
  },

  render() {
    return (
      <div className="transform-widget" onClick={this.open}>
        <p>Name {this.props.name}</p>
        <div className="remove" onClick={this.remove}>
          <span>Remove</span>
        </div>
      </div>
    )
  }
});
