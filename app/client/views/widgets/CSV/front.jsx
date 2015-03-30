import React from 'react';

export default class CSVFront extends React.Component {
  render() {
    return (
      <div className="content">
        <p>
          {this.props.name}
        </p>
        <p>
          {this.props.config.file.originalname}
        </p>
      </div>
    );
  }
}
