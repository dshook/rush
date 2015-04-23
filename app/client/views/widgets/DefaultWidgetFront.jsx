import React from 'react';

export default class DefaultWidgetFront extends React.Component {
  static propTypes = {
    name: React.PropTypes.string
  }
  render() {
    return (
      <div className="content">
        <p>{this.props.name}</p>
      </div>
    );
  }
}
