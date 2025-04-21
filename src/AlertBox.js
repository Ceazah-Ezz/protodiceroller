import React, { useState, useEffect } from 'react';

function AlertBox({ message, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
    }
  }, [message]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(), 300); // Allow time for animation
  };

  return (
    <div className={`custom-alert ${visible ? 'show' : ''}`}>
      <button className="alert-close" onClick={handleClose}>×</button>
      <div>{message}</div>
    </div>
  );
}

export default AlertBox;