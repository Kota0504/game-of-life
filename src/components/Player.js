import React, { useState } from "react";

const Player = ({ name }) => {
  const [playerState, setPlayerState] = useState({
    position: 0, // プレイヤーの現在位置
    money: 0, // 所持金
    rank: 1, // 現在の順位
    isMarried: false, // 結婚しているかどうか
    children: 0, // 子供の数
    hasHouse: false, // 家を持っているかどうか
  });

  // プレイヤーの状態を更新する関数
  const updatePlayerState = (updates) => {
    setPlayerState((prevState) => ({ ...prevState, ...updates }));
  };

  // イベントハンドラなどのロジックをここに実装
  // ...

  // プレイヤーの状態を表示するUI
  return (
    <div className="player-info">
      <h2>{name}</h2>
      <p>位置: {playerState.position}</p>
      <p>所持金: ¥{playerState.money}</p>
      <p>順位: {playerState.rank}</p>
      <p>結婚状況: {playerState.isMarried ? "既婚" : "未婚"}</p>
      <p>子供の数: {playerState.children}</p>
      <p>家: {playerState.hasHouse ? "あり" : "なし"}</p>
    </div>
  );
};

export default Player;

// App.js または GameUI.js で Roulette コンポーネントを使用するときに、
// updatePlayerPosition 関数を props として渡す
<Roulette
  players={players}
  updatePlayerPosition={updatePlayerPosition}
  currentTurn={currentTurn}
  setCurrentTurn={setCurrentTurn}
/>;
// 親コンポーネント (例: App.js)
