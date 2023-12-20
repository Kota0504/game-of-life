// GameBoard.js
import React from "react";
import "./GameBoard.css";

const GameBoard = ({ players, setPlayers, updatePlayerState }) => {
  //一時的なボタンを実装
  const moveCurrentPlayerOneStep = () => {
    const currentPlayer = players.find((player, index) => index === 0);
    const playerId = currentPlayer.id;
    const newPosition = currentPlayer.position + 1;
    if (newPosition < 30) {
      updatePlayerPosition(playerId, newPosition);
    }
  };

  // マスの色を定義
  const squareColors = ["blue", "blue", "red", "yellow"];

  const updatePlayerPosition = (playerId, steps) => {
    setPlayers(
      players.map((player) => {
        if (player.id !== playerId) return player;

        let newPosition = player.position + steps;
        // newPosition がボードの範囲を超えないように調整
        // 他のプレイヤーの位置やゲームの状態を更新
        // ...

        return { ...player, position: newPosition };
      })
    );
  };

  // マスの効果を決定する関数（ここではダミーの実装）
  const getSquareEffect = (squareType, player) => {
    switch (squareType) {
      case "blue":
        return { ...player, money: player.money + 10000 };
      case "red":
        return { ...player, money: player.money - 3000 };
      case "yellow":
        // 黄色マスで発生するイベントを実行
        console.log(`Special event for ${player.name}`);
        return player; // 実際のイベントは実装に応じて異なります
      default:
        return player;
    }
  };

  // プレイヤーがマスに止まった際の効果を処理する関数
  const handleSquareLanding = (player) => {
    const squareType = squareColors[player.position % squareColors.length];
    const updatedPlayer = getSquareEffect(squareType, player);
    updatePlayerState(updatedPlayer);
  };

  // プレイヤーがマスを進む処理
  // 実際のゲームでは、プレイヤーの現在位置を更新したり、マスの効果を適用する必要があります。

  // ボードのマスを生成
  const renderSquares = () => {
    return Array(30)
      .fill(null)
      .map((_, index) => {
        const color = squareColors[index % squareColors.length];
        const isStart = index === 0;
        const isGoal = index === 29;
        const squareClass = `square ${color} ${isStart ? "start" : ""} ${
          isGoal ? "goal" : ""
        }`;
        return (
          <div key={index} className={squareClass}>
            {isStart && "Start"}
            {isGoal && "Goal"}
            {players &&
              players
                .filter((player) => player.position === index)
                .map((player) => (
                  <div key={player.name} className="player">
                    {player.name}
                  </div>
                ))}
          </div>
        );
      });
  };

  // In GameBoard.js
  return (
    <div className="game-board">
      {renderSquares()}
      {/* Buttons for moving the current player */}
      <div className="move-button-container">
        <button onClick={moveCurrentPlayerOneStep}>Move 1 Step</button>
      </div>
    </div>
  );
};

export default GameBoard;
