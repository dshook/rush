var React         = require('react');
var Modal         = require('./mixins/Modal.jsx');
var ModalBody     = require('./TransformWidgetBody.jsx');
var WidgetActions = require('../actions/WidgetActions');

module.exports = React.createClass({
  mixins: [Modal],
  open(){
    this.openModal(ModalBody);
  },

  remove(e){
    WidgetActions.removeWidget(this.props.reactKey);
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
