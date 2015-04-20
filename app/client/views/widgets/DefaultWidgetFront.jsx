import React from 'react';

export default class DefaultWidgetFront extends React.Component {
  render() {
    return (
      <div className="content">
        <p>{this.props.name}</p>
      </div>
    );
  }
}
