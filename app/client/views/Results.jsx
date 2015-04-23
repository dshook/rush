import React from 'react';
import BaseView from './BaseView.js';
import {change} from 'client/stores/AppStore.js';
import messenger from 'client/messenger/AppMessenger.js';

export default class Results extends BaseView {
  constructor(props) {
    super(props);

    this.appStore = props.di('stores').appStore;
    this.state = this.getState();
  }

  getState() {
    return {
        results: this.appStore.results
    };
  }

  [messenger.ev(change)](){
    this.setState(this.getState());
  }

  renderPlain(){
    return (
      <div className="results">
        {this.state.results}
      </div>
    );
  }

  renderDownloadLink(link){
    return (
      <div className="results">
        <a target="_blank" href={link}>Download Results</a>
      </div>
    );
  }

  renderTable(){
    var columns = Object.keys(this.state.results[0]);
    return (
      <div className="results">
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
