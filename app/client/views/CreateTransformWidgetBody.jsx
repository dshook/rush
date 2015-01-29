var React = require('react');

module.exports = React.createClass({
  handleAdd(name){
    this.props.onAdd(name);
  },

  render() {
    return (
      <div className="modal-widget">
        {this.props.widgetTypes.map(function(item, i) {
          var boundClick = this.handleAdd.bind(this, item);
          return (
            <div onClick={boundClick} className="widget-type">
              <span>{item}</span>
            </div>
          );
        }, this)}
      </div>
    )
  }
})
