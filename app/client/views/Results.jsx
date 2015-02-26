import React from 'react';
import {AppStore, change} from '../stores/AppStore.js';
import messenger from '../messenger/AppMessenger.js';

export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.appStore = props.stores.appStore;
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

  componentDidMount() {
    messenger.bindInstance(this);
  }

  componentWillUnmount() {
    messenger.unbindInstance(this);
  }

  renderPlain(){
    return (
      <div className="results">
        {this.state.results}
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
              {columns.map(function(column){
                return <th>{column}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {
              this.state.results.map(function(rows){
                var values = Object.keys(rows).map(x => rows[x]);
                return (
                  <tr>
                    {
                      values.map(function(cell){
                        return (
                        <td>
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
    }else{
      return this.renderPlain();
    }
  }
}
