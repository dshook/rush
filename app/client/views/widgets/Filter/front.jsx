import React from 'react';

export default class FilterFront extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    config: React.PropTypes.object
  }
  render() {
    var filterName = '';
    if(this.props.config.filter){
      filterName = '"'+ this.props.config.filter +'"';
      if(this.props.config.searchKeys){
        filterName += ' in ' + this.props.config.searchKeys;
      }
    }
    return (
      <div className="content">
        <p>
          {this.props.name} {filterName}
        </p>
      </div>
    );
  }
}
