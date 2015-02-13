import React from 'react';

export default class ModalTemplate extends React.Component {
  render() {
    return (
      <div className="modal">
        <div className="modal-inner">
          <a rel="modal:close">&times;</a>
          <div className="modal-content"></div>
        </div>
      </div>
    );
  }
}
