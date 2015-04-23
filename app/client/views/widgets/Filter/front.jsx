import React from 'react';

export default class FilterFront extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    config: React.PropTypes.object
  }
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
