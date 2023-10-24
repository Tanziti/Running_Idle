import React from 'react';
import './Modal.css';

function Modal({ onClose }) {
  
  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Welcome to Running Idle!</h1>
        <p>Click anywhere to continue</p>
      </div>
      <div className="modal-overlay" onClick={onClose}></div>
      
    </div>
  );
}

export default Modal;