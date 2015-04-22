import React from 'react';

export default class FilterFront extends React.Component {
  render() {
    return (
      <div className="content">
        <p>
          {this.props.name} &quot;{this.props.config.filter}&quot;
        </p>
      </div>
    );
  }
}
