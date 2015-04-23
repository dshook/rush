import React from 'react';

export default class CSVFront extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    config: React.PropTypes.object
  }
  render() {
    return (
      <div className="content">
        <p>
          {this.props.name}
        </p>
        <p>
          {this.props.config.file ? this.props.config.file.originalname : ''}
        </p>
      </div>
    );
  }
}
