import React, { useState, useEffect } from "react";
import "./GameBoard.css";
import Player from "./Player";
import GameBoardModal from "./GameBoardModal";

const GameBoard = () => {
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
      isFinished: false,
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
      isFinished: false,
    },
  ];
  const [players, setPlayers] = useState(initialPlayers);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    playerName: "",
    message: "",
  });

  const squareColors = ["blue", "blue", "red", "yellow"];

  const getSquareEffect = (squareType, player, steps) => {
    let moneyChange = 0;
    switch (squareType) {
      case "blue":
        moneyChange = 10000;
        break;
      case "red":
        moneyChange = -5000;
        break;
      case "yellow":
        console.log(`Event occurred for ${player.name}`);
        break;
      default:
        break;
    }

    const newPosition = player.position + steps;
    const updatedPosition = newPosition > 29 ? 29 : newPosition;
    const updatedMoney =
      player.isFinished || newPosition > 29
        ? player.money
        : player.money + moneyChange;
    const isFinished = updatedPosition === 29;

    return {
      ...player,
      position: updatedPosition,
      money: updatedMoney,
      isFinished,
    };
  };

  const moveCurrentPlayerRandomSteps = () => {
    const updatedPlayers = players.map((player, index) => {
      if (index === currentTurn) {
        const randomSteps = Math.floor(Math.random() * 3) + 1;
        const newPlayer = getSquareEffect("blue", player, randomSteps);
        handleSquareLanding(newPlayer);
        return newPlayer;
      } else {
        return player;
      }
    });

    // プレイヤーの順位を計算して設定
    const rankedPlayers = calculatePlayerRanks(updatedPlayers);
    setPlayers(rankedPlayers);

    // ターンの更新
    setCurrentTurn((currentTurn + 1) % players.length);
  };

  // プレイヤーの順位を計算する関数
  const calculatePlayerRanks = (updatedPlayers) => {
    // プレイヤーを位置に基づいてソート
    const sortedPlayers = [...updatedPlayers].sort(
      (a, b) => b.position - a.position
    );

    // 順位を計算してプレイヤーに設定
    const rankedPlayers = sortedPlayers.map((player, index) => ({
      ...player,
      rank: index + 1,
    }));

    return rankedPlayers;
  };

  const handleSquareLanding = (player) => {
    const squareType = squareColors[player.position % squareColors.length];
    let message = "";
    switch (squareType) {
      case "blue":
        message = "10000円獲得しました";
        break;
      case "red":
        message = "5000円を失いました";
        break;
      case "yellow":
        message = "イベント発生！";
        break;
      default:
        message = "何も起こりませんでした";
        break;
    }

    // モーダルの内容をセット
    setModalContent({ playerName: player.name, message });

    // モーダルの表示
    setIsModalVisible(true);

    // モーダルを表示してから自動的に閉じる
    setTimeout(() => {
      setIsModalVisible(false);
    }, 3000);
  };

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
          <div
            key={index}
            className={squareClass}
            onClick={() => handleSquareLanding(players[currentTurn])}
          >
            {isStart && "Start"}
            {isGoal && "Goal"}
            {players
              .filter((player) => player.position === index)
              .map((player) => (
                <div key={player.id} className="player">
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
        <button onClick={moveCurrentPlayerRandomSteps}>ランダム進む</button>
      </div>
      <div className="player-status-section">
        {players.map((player, index) => (
          <div key={player.id} className="player-status">
            <Player {...player} />
          </div>
        ))}
      </div>
      {isModalVisible && (
        <GameBoardModal
          playerName={modalContent.playerName}
          message={modalContent.message}
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </div>
  );
};

export default GameBoard;
