import React from 'react';
import Modal from 'react-modal';

import './index.scss';

Modal.setAppElement('#root');

const LoadingModal = ({ isModalOpen, shouldCloseOnOverlayClick = false }) => {
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        className="app-modal loading-modal-wrapper"
        overlayClassName="modal-overlay"
        contentLabel="Modal"
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      >
        <div className="loading">
          <span className="dot yellow"></span>
          <span className="dot turquoise"></span>
          <span className="dot orange"></span>
        </div>
      </Modal>
    </div>
  );
};

export default LoadingModal;
