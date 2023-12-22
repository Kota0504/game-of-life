import React, { useEffect } from "react";
import "./GameBoardModal.css";

const GameBoardModal = ({ playerName, message, onClose }) => {
  useEffect(() => {
    const modalTimeout = setTimeout(() => {
      onClose(); // 3秒後にモーダルを閉じる
    }, 1000);

    return () => clearTimeout(modalTimeout);
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-banner">5000円獲得</div>
        <div className="modal-roulette-bg"></div>
        <div className="modal-content">
          <h3>ルーレット結果</h3>
          <div className="gameboard-modal-body">
            <p>
              <strong>{playerName}</strong>さんの結果
            </p>
            <p>{message}</p>{" "}
            {/* Ensure this is the only place where {message} is displayed */}
          </div>
          <button onClick={onClose}>閉じる</button>
        </div>
      </div>
    </div>
  );
};

export default GameBoardModal;
