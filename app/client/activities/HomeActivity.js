import React from 'react';
import layout from '../views/Layout.jsx';
import ReactDI from 'react-di';

export default class HomeActivity
{
  constructor($root, stores){
    this.$root  = $root;
    this.stores = stores;
  }

  onStart(){
    var container = new ReactDI({
      stores: this.stores
    });
    container.inject(React);

    var Layout = React.createFactory(layout);
    React.render(
      new Layout()
      , this.$root[0]
    );
  }
}

