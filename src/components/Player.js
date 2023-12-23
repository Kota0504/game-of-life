// Player.js
import React from "react";

const Player = ({
  name,
  position,
  money,
  rank,
  isMarried,
  children,
  hasHouse,
  isfinished,
}) => {
  return (
    <div className="player-info">
      <h2>{name}</h2>
      <p>位置: {position}</p>
      <p>所持金: ¥{money}</p>
      <p>順位: {rank}</p>
      <p>結婚状況: {isMarried ? "既婚" : "未婚"}</p>
      <p>子供の数: {children}</p>
      <p>家: {hasHouse ? "あり" : "なし"}</p>
    </div>
  );
};

export default Player;
