import React from 'react';

export default class SaveButton extends React.Component {
  render(){
    return (
      <button type="submit" className="button button--action" >
        <i className="fa fa-save"></i>
        Save
      </button>
    );
  }
}
