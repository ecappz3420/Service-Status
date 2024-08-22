import React, { useState } from 'react';

const Switch = () => {
  const [toggle, setToggle] = useState(true);
  const [pendingToggle, setPendingToggle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleToggleClick = (e) => {
    setPendingToggle(e.target.checked);
    setShowModal(true);
  };

  const handleConfirm = () => {
    if (pendingToggle !== null) {
      setToggle(pendingToggle);
    }
    setShowModal(false);
    setPendingToggle(null);
  };

  const handleCancel = () => {
    setShowModal(false);
    setPendingToggle(null);
  };

  return (
    <>
      <div className="form-check form-switch d-flex justify-content-center gap-2 align-items-center">
        <input
          type="checkbox"
          className="form-check-input"
          checked={toggle}
          onChange={handleToggleClick}
        />
        <span className='timer'>12:00:00</span>
      </div>

      <div className={`modal ${showModal ? 'show d-block' : 'fade'}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Alert</h5>
              <button type="button" className="btn-close" onClick={handleCancel} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h6>Do you wish to update the status to Up for the source 'Green Pay' and service No. 1?</h6>
            </div>
            <div className="modal-footer justify-content-center">
              <button className='btn btn-secondary' onClick={handleCancel}>Cancel</button>
              <button className='btn btn-primary' onClick={handleConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      </div>

      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default Switch;
