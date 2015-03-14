import React from 'react';
import layout from '../views/Layout.jsx';

export default class HomeActivity
{
  constructor($root, stores){
    this.$root  = $root;
    this.stores = stores;
  }

  onStart(){
    var Layout = React.createFactory(layout);
    //init layout with all deps passed down
    React.render(
      new Layout({
        stores: this.stores
      })
      , this.$root[0]
    );
  }
}

