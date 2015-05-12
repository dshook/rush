import React from 'react';
import Widget from 'shared/models/widget.js';

export default class PostgresWrite extends React.Component {
  static propTypes = {
    widget: React.PropTypes.instanceOf(Widget),
    onClose: React.PropTypes.func
  }

  render() {
    return (
      <div className="content">
        <p> Postgres write back! </p>
      </div>
    );
  }
}
