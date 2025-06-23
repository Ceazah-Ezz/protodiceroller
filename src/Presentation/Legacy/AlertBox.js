import React, { useState, useEffect, useRef } from "react";
import AlertSFX from "../../Assets/DiceImg/alert.m4a";
function AlertBox({ message, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const AlertSfx = new Audio(AlertSFX);
      AlertSfx.play();
    }
  }, [message]);

  useEffect(() => {
    const handleAnyClick = () => {
      setVisible(false);
      setTimeout(() => onClose(), 300); // Allow time for animation
    };

    if (visible) {
      document.addEventListener("mousedown", handleAnyClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleAnyClick);
    };
  }, [visible, onClose]);

  return (
    <div className={`custom-alert ${visible ? "show" : ""}`}>
      <div>
        <div>{message}</div>
        <div style={{ marginTop: "20px", fontSize: "0.9em", color: "#666" }}>
          Click anywhere to continue
        </div>
      </div>
    </div>
  );
}

export default AlertBox;
