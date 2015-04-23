import React from 'react';
import WidgetManager from './WidgetManager.jsx';
import ModalTemplate from './ModalTemplate.jsx';
import Results from './Results.jsx';
import AppActions from 'client/actions/AppActions.js';

export default class Layout extends React.Component {
  startJob(){
    AppActions.start();
  }

  render() {
    return (
      <div className="wrapper">
        <div className="header">
          <div className="header-container">
            <div className="title">
              <h1><i className="fa fa-bolt"></i> Rush</h1>
            </div>
            <div className="actions">
              <button onClick={this.startJob} className="button button--action" >
                <i className="fa fa-play"></i>
                Start Job
              </button>
            </div>
          </div>
        </div>
        <div className="main">
          <WidgetManager />
        </div>
        <div className="footer">
          <Results />
        </div>
        <ModalTemplate />
      </div>
    );
  }
}
