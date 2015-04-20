import React from 'react';

export default class CSVFront extends React.Component {
  render() {
    return (
      <div className="content">
        <p>
          {this.props.name} {this.props.config.limit}
        </p>
      </div>
    );
  }
}
