import React from 'react';
import Modal from 'react-modal';

import './GeneralModal.scss';

Modal.setAppElement('#root');

const GeneralModal = ({
  isModalOpen,
  modalTitle,
  modalText,
  primaryBtnText,
  secondaryBtnText,
  onClickPrimaryBtn,
  onClickSecondaryBtn,
  shouldCloseOnOverlayClick = false,
}) => {
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        className="general-modal-wrapper"
        overlayClassName="modal-overlay"
        onRequestClose={onClickSecondaryBtn}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      >
        <div className="app-modal modal-wrapper">
          <h1 className="modal-title">{modalTitle}</h1>
          <p className="modal-text">{modalText}</p>
          <div className="btns">
            <button
              className="modal-btn primary-btn"
              onClick={onClickPrimaryBtn}
            >
              {primaryBtnText}
            </button>
            <button
              className="modal-btn secondary-btn"
              onClick={onClickSecondaryBtn}
            >
              {secondaryBtnText}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GeneralModal;
