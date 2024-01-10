import React, { useState, useEffect, useRef } from "react";
import "/Users/toshin/Desktop/game-of-life/src/components/css/GameBoard.css";
import Player from "./Data/Player";
import initialPlayers from "./Data/InitalPlayers";
import OshiTable from "./Table/OshiTable";
import Roulette from "./Move/Roulette";
import Modal from "react-modal";
import ModalManager from "./Modal/ModalManager";
import { handleSquareEvent, handleSquareLanding } from "./Move/handleSquareEvents.js";
import Dialog_AllGoal from "./Modal/Dialog_AllGoal"; // Dialogコンポーネントのインポート
import Dialog_EachGoal from "./Modal/Dialog_EachGoal"; // Dialogコンポーネントのインポート
import {
  handleMarriageChoice,
  handleMarriageEvent,
} from "/Users/toshin/Desktop/game-of-life/src/components/GameUI/Move/Event/MarriageChoice.js";
import {
  nextTurn,
  advanceTurn,
} from "/Users/toshin/Desktop/game-of-life/src/components/GameUI/Move/Trun.js";
import handleRouletteResult from "./Move/handleRouletteResult.js";
import { getSquareColor } from "./Move/getSquareColor.js";

const GameBoard = () => {
  //-----------useStateで渡す定義 必要----------
  const [players, setPlayers] = useState(initialPlayers);
  const [sortedPlayers, setSortedPlayers] = useState([...initialPlayers]);
  const [showStartModal, setShowStartModal] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rouletteNumber, setRouletteNumber] = useState(null);
  const allFinished = players.every((player) => player.isFinished); // すべてのプレイヤーがゴールしたか
  const eachGoal = players.some((player) => player.isFinished);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [modalContent, setModalContent] = useState("");
  const [modalChoices, setModalChoices] = useState([]);
  const modalManagerRef = useRef(null);
  const boardSize = 75; // 仮にボードのマスが75だとする
  // 選択肢のボタンがクリックされたときに呼び出される関数
  const handleChoice = (choiceValue) => {
    // handleMarriageChoice関数に選択された値を渡す
    handleMarriageChoice(choiceValue);
  };
  useEffect(() => {
    // ModalManagerのインスタンス初期化用のEffect
    if (!modalManagerRef.current) {
      modalManagerRef.current = new ModalManager(
        (visible, message, choices) => {
          setIsModalVisible(visible);
          if (choices) {
            // 選択肢がある場合は、選択肢関連のステートも更新する
            setModalContent(message);
            setModalChoices(choices); // このステートは選択肢を表示するために使う
          } else {
            setModalContent(message);
          }
        }
      );
    }
  }, []);

  //----------ターン管理のuseEffect----------
  useEffect(() => {
    if (showStartModal) {
      modalManagerRef.current.queueModal("ゲームスタート!", 1000);
      const timer = setTimeout(() => {
        setShowStartModal(false);
      }, 2000);

      return () => clearTimeout(timer);
    } else if (currentTurn === 0) {
      // showStartModalがfalseになった後、最初のターンを開始する
      nextTurn(modalManagerRef, players, currentTurn);
    }
  }, [showStartModal]);

  // currentTurnが更新されたらnextTurnを呼び出すが、最初のターン（currentTurn === 0）は除外する
  useEffect(() => {
    if (currentTurn > 0) {
      // currentTurnが0より大きい場合にのみnextTurnを呼び出す
      nextTurn(modalManagerRef, players, currentTurn);
    }
  }, [currentTurn]);

  //-----------順位によってソートするuseEffect----------
  useEffect(() => {
    const newSortedPlayers = [...players].sort((a, b) => b.money - a.money);
    setSortedPlayers(newSortedPlayers);
  }, [players]);

  const goalDialog = () => {
    if (allFinished) {
      return (
        <div className="App">
          <Dialog_AllGoal />
        </div>
      );
    } else {
      if (eachGoal) {
        return (
          <div className="App">
            <Dialog_EachGoal />
          </div>
        );
      }
    }
  };

  //----------各モーダルのスタイル設定 CSSでも可だがバグで実装できていない----------
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <>
      {/* モーダル表示 */}
      <div className="modal-container">
        <Modal isOpen={isModalVisible} style={customStyles}>
          {/*ここのStyleがCSSでやりたいができていないところ
           */}
          <h2>{modalContent}</h2>
          {/* ここに選択肢を表示するロジックを追加 */}
          {modalChoices &&
            modalChoices.map((choice) => (
              <button onClick={() => handleChoice(choice.value)}>
                {choice.label}
              </button>
            ))}
        </Modal>
      </div>

      {/* 直接ルーレットコンポーネントを埋め込む */}
      <div className="roulette-container">
        <Roulette
          onStopSpinning={(result) =>
            handleRouletteResult(
              players,
              result,
              currentTurn,
              setPlayers,
              boardSize,
              modalManagerRef,
              getSquareColor,
              handleSquareEvent,
              advanceTurn,
              setRouletteNumber,
              setCurrentTurn,
              allFinished,
              handleMarriageEvent
            )
          }
        />
      </div>

      {/* OshiTable コンポーネントでスタート位置にプレイヤーアイコンを表示する */}
      <OshiTable players={players} onPlayerLanding={handleSquareLanding} />

      {/* goalDialogの表示 */}
      {goalDialog()}

      {/* ステータスを一時的に表示させるためのコンポーネント */}
      <div className="player-status-section">
        {sortedPlayers.map((player, index) => (
          <div key={player.id} className="player-status">
            <Player {...player} />
          </div>
        ))}
      </div>
    </>
  );
};

export default GameBoard;
