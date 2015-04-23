import React from 'react';
import messenger from 'client/messenger/AppMessenger.js';

export default class BaseView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    messenger.bindInstance(this);
  }

  componentWillUnmount() {
    messenger.unbindInstance(this);
  }
}
