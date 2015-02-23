import React from 'react';
import layout from '../views/Layout.jsx';

export default class HomeActivity
{
	constructor($root, widgetStore, appStore){
		this.$root       = $root;
		this.widgetStore = widgetStore;
		this.appStore    = appStore;
	}

	onStart(){
		var Layout = React.createFactory(layout);
	  //init layout with all deps passed down
	  React.render(
	    new Layout({
	      stores: {
	      	widgetStore: this.widgetStore,
	      	appStore: this.appStore
	      }
	    })
	    , this.$root[0]
	  );
	}
}

