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
  isFinished,
}) => {
  return (
    <div>
      {/* <div className="player" style={{ backgroundColor: "white", zIndex: 10 }}>
        <span>{name}</span>
      </div> */}
      <div className="player-info">
        <h2>{name}</h2>
        <p>順位: {rank}</p>
        <p>所持金: ¥{money}</p>
        <p>位置: {position}</p>
        <p>結婚: {isMarried ? "既婚" : "未婚"}</p>
        <p>家: {hasHouse ? "あり" : "なし"}</p>
        <p>子供: {children ? "あり" : "なし"}</p>
        <p>ゴール: {isFinished ? "済" : "未"}</p>
      </div>
    </div>
  );
};

export default Player;