import React from 'react';
import WidgetManager from './WidgetManager.jsx';
import ModalTemplate from './ModalTemplate.jsx';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div className="header">
          <div className="cozy">
            <h1><i className="fa fa-bolt"></i> Rush</h1>
          </div>
        </div>
        <div className="main">
          <WidgetManager {...this.props} />
        </div>
        <div className="footer">
          <p>Footer Content</p>
        </div>
        <ModalTemplate />
      </div>
    );
  }
}
