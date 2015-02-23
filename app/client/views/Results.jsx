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

  render() {
    return (
      <div className="results">
        {this.state.results}
      </div>
    );
  }
}
