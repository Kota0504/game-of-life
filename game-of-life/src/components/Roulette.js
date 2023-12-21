import React, { useState } from "react";
import "./Roulette.css";

const Roulette = () => {
  const [participants, setParticipants] = useState([
    "Alice",
    "Bob",
    "Charlie",
    "David",
  ]); // ダミーの参加者データ
  const [currentTurn, setCurrentTurn] = useState(0);
  const [rouletteNumber, setRouletteNumber] = useState(null);

  // ルーレットの数字を生成
  const spinRoulette = () => {
    const number = Math.ceil(Math.random() * 10);
    setRouletteNumber(number);
  };

  return (
    <div className="roulette-container">
      <h2>ルーレット</h2>
      <button onClick={spinRoulette}>ルーレットを回す</button>
      {rouletteNumber && <p>ルーレットの数字: {rouletteNumber}</p>}
      <p>現在のターン: {participants[currentTurn]}</p>
    </div>
  );
};

export default Roulette;
