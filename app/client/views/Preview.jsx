import React from 'react';
import BaseView from './BaseView.js';
import {previewChange} from '../stores/AppStore.js';
import AppActions from '../actions/AppActions.js';
import messenger from '../messenger/AppMessenger.js';

//TODO: evaluate a better way to combine with the results view
export default class Preview extends BaseView {
  constructor(props) {
    super(props);

    this.appStore = props.di('stores').appStore;
    this.state = this.getState();
  }

  getState() {
    return {
        results: this.appStore.preview
    };
  }

  [messenger.ev(previewChange)](){
    this.setState(this.getState());
    AppActions.clearPreview();
  }

  renderPlain(){
    return (
      <div className="results">
        <h3>Preview</h3>
        {this.state.results}
      </div>
    );
  }

  renderDownloadLink(link){
    return (
      <div className="results">
        <h3>Preview</h3>
        <a target="_blank" href={link}>Download Results</a>
      </div>
    );
  }

  renderTable(){
    var columns = Object.keys(this.state.results[0]);
    return (
      <div className="results">
        <h3>Preview</h3>
        <table>
          <thead>
            <tr>
              {columns.map(function(column, index){
                return <th key={index}>{column}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {
              this.state.results.map(function(rows, rowIndex){
                var values = Object.keys(rows).map(x => rows[x]);
                return (
                  <tr key={rowIndex}>
                    {
                      values.map(function(cell, cellIndex){
                        return (
                        <td key={cellIndex}>
                          {cell}
                        </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    var results = this.state.results;
    if(results instanceof Array && results.length > 0){
      return this.renderTable();
    }else if(results instanceof Object && results.fileLink){
      return this.renderDownloadLink(results.fileLink);
    }else{
      return this.renderPlain();
    }
  }
}
