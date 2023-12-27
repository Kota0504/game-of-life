import React, { useState, useEffect } from "react";
import "./GameBoard.css";
import Player from "./Player";
// import GameBoardModal from "./GameBoardModal";
import OshiTable from "./OshiTable";

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
    {
      id: 3,
      name: "Player 3",
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

  const calculatePlayerRanks = (players) => {
    // プレイヤーをそのお金に基づいてソートする（降順）
    const sortedPlayers = [...players].sort((a, b) => b.money - a.money);

    // ソートされたお金に基づいてランクを割り当てる
    const rankedPlayers = sortedPlayers.map((player, index) => ({
      ...player,
      rank: index + 1,
    }));

    return rankedPlayers;
  };

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
        //  handleYellowSquare(player);実際に実装する時に使うコード
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
        const randomSteps = Math.floor(Math.random() * 3) + 1; // 1から3のランダムな数
        const newPosition = player.position + randomSteps;
        const squareType = squareColors[newPosition % squareColors.length];
        const newPlayer = getSquareEffect(squareType, player, randomSteps);

        if (newPlayer.position !== player.position) {
          // プレイヤーが動いた場合のみモーダルを表示
          setModalContent({
            playerName: newPlayer.name,
            message: `Player ${newPlayer.name} moved to position ${newPlayer.position}`,
          });
          setIsModalVisible(true);
        }

        return newPlayer;
      } else {
        return player;
      }
    });

    const rankedPlayers = calculatePlayerRanks(updatedPlayers);
    setPlayers(rankedPlayers);
    setCurrentTurn((prevTurn) => (prevTurn + 1) % players.length);
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // モーダルを閉じる
    setCurrentTurn((prevTurn) => (prevTurn + 1) % players.length); // 次のプレイヤーにターンを移す
  };

  // GameBoardModalコンポーネントを直接GameBoard内に組み込む
  const GameBoardModal = ({ playerName, message, onClose }) => {
    useEffect(() => {
      const modalTimeout = setTimeout(() => {
        onClose(); // 0.5秒後にモーダルを閉じる
      }, 500);

      return () => clearTimeout(modalTimeout);
    }, [onClose]);

    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-content">
            <h3>ルーレット結果</h3>
            <div className="gameboard-modal-body">
              <p>
                <strong>{playerName}</strong>さんの結果
              </p>
              <p>{message}</p>
            </div>
            <button onClick={onClose}>閉じる</button>
          </div>
        </div>
      </div>
    );
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
        // handleSquareLanding(player);実装する時に使用するコード
        break;
      default:
        message = "何も起こりませんでした";
        break;
    }

    // const handleYellowSquare = (player) => {
    // 黄色マスのイベント処理
    // 例: ランダムな金額獲得、ランダムな位置に移動、特別なアイテム獲得など
    // };

    // モーダルの内容をセット
    setModalContent({ playerName: player.name, message });

    // モーダルの表示
    setIsModalVisible(true);
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
          <div key={index} className={squareClass}>
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
    <>
      <div
        className={`game-board ${
          isModalVisible ? "game-board-modal-visible" : ""
        }`}
      >
        <div className="header-class-8">{/* ヘッダーコンテンツ */}</div>
        <OshiTable />
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
            onClose={handleModalClose}
          />
        )}
      </div>
    </>
  );
};

export default GameBoard;
