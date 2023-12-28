// GameUI.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GameUI.css";
import groupImage from "./image/g13.png";

const GameUI = () => {
  const navigate = useNavigate();
  const [showStartModal, setShowStartModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStartModal(true);
      setTimeout(() => {
        navigate("/roulette");
      }, 3000);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleCloseModal = () => {
    setShowStartModal(false); // モーダルを非表示にする
    navigate("/"); // StartScreen コンポーネントに遷移させる
  };

  return (
    <div className="game-ui">
      {/* ヘッダーを追加 */}
      <div className="header-class-8">
        <div className="App-logo-8">
          <img src={groupImage} alt="ロゴ" className="App-logo-2" />
          <span className="title-8">テーブル</span>
        </div>
        <div className="ranking-list">
          <span className="title-9">ランキング</span>
          <span className="title-9">●</span>
          <span className="title-9">●</span>
          <span className="title-9">●</span>
        </div>
        <button onClick={handleCloseModal} className="close-button-9">
          終了
        </button>
      </div>
      {/* <img src={gameBoardImage} alt="Game Board" className="game-board-image" /> */}
      {showStartModal && (
        <div className="start-modal-overlay">
          <div className="start-modal-content">スタート！</div>
        </div>
      )}
    </div>
  );
};

export default GameUI;
