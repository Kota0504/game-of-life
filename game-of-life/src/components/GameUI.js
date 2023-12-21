// GameUI.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gameBoardImage from "./image/☆推しテーブル♡.png";
import "./GameUI.css";

const GameUI = () => {
  const navigate = useNavigate();
  const [showStartModal, setShowStartModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStartModal(true);
      setTimeout(() => {
        navigate("/roulette"); // スタート表示後、ルーレット画面に遷移
      }, 3000);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="game-ui">
      <img src={gameBoardImage} alt="Game Board" className="game-board-image" />
      {showStartModal && (
        <div className="start-modal-overlay">
          <div className="start-modal-content">スタート！</div>
        </div>
      )}
    </div>
  );
};

export default GameUI;
