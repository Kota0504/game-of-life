import React, { useState } from "react";
import "./GameBoard.css";
import Player from "./Player";

const GameBoard = () => {
  // プレイヤーの初期状態を設定
  const initialPlayers = [
    {
      id: 1,
      name: "Player 1",
      position: 0,
      money: 100000,
      rank: 1,
      isMarried: false,
      children: 0,
      hasHouse: false,
    },
    {
      id: 2,
      name: "Player 2",
      position: 0,
      money: 100000,
      rank: 1,
      isMarried: false,
      children: 0,
      hasHouse: false,
    },
    // 他のプレイヤーの初期状態も同様に設定
  ];

  const [players, setPlayers] = useState(initialPlayers);
  const [currentTurn, setCurrentTurn] = useState(0); // 現在のターンを追跡

  const squareColors = ["blue", "blue", "red", "yellow"];

  const moveCurrentPlayerOneStep = () => {
    setPlayers(
      players.map((player, index) => {
        if (index === currentTurn) {
          let newPosition = player.position + 1;
          newPosition = newPosition >= 30 ? 29 : newPosition; // ボードの範囲を超えないようにする

          // マスの効果を適用
          const squareType = squareColors[newPosition % squareColors.length];
          let moneyChange = 0;
          switch (squareType) {
            case "blue":
              moneyChange = 10000;
              break;
            case "red":
              moneyChange = -3000;
              break;
            case "yellow":
              console.log(`Special event for ${player.name}`);
              break;
            default:
              break;
          }

          return {
            ...player,
            position: newPosition,
            money: player.money + moneyChange,
          };
        }
        return player;
      })
    );

    setCurrentTurn((currentTurn + 1) % players.length);
  };
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
            {players
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

  return (
    <div className="game-board">
      {renderSquares()}
      <div className="move-button-container">
        <button onClick={moveCurrentPlayerOneStep}>1マス進む</button>
      </div>
      <div className="player-status-section">
        {players.map((player, index) => (
          <div key={index} className="player-status">
            <Player {...player} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
