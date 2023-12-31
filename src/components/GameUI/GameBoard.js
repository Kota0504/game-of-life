import React, { useState, useEffect, useRef } from "react";
import "/Users/toshin/Desktop/game-of-life/src/components/css/GameBoard.css";
import Player from "./Data/Player";
import OshiTable from "./OshiTable";
import Roulette from "./Move/Roulette";
import Modal from "react-modal";
import ModalManager from "./Modal/ModalManager";
import { handleSquareEvent, handleSquareLanding } from "./Move/SquareEvents";
import Dialog_AllGoal from "./Modal/Dialog_AllGoal"; // Dialogコンポーネントのインポート
import Dialog_EachGoal from "./Modal/Dialog_EachGoal"; // Dialogコンポーネントのインポート

const GameBoard2 = () => {
  //----------暫定的に実装しているプレイヤーのステータス あとで参加プレイヤーのステータスになるように実装する----------
  const initialPlayers = [
    {
      id: 1,
      name: "Player 1",
      position: 74,
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
      position: 74,
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
      position: 74,
      money: 100000,
      rank: 1,
      isMarried: false,
      children: 0,
      hasHouse: false,
      isFinished: false,
    },
  ];
  //-----------useStateで渡す定義 必要----------
  const [players, setPlayers] = useState(initialPlayers);
  const [showStartModal, setShowStartModal] = useState(true);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rouletteNumber, setRouletteNumber] = useState(null);
  const allFinished = players.every((player) => player.isFinished); // すべてのプレイヤーがゴールしたか
  const eachGoal = players.some((player) => player.isFinished);

  const [modalContent, setModalContent] = useState("");
  const [modalChoices, setModalChoices] = useState([]);
  const modalManagerRef = useRef();
  // 選択肢のボタンがクリックされたときに呼び出される関数
  const handleChoice = (choiceValue) => {
    // handleMarriageChoice関数に選択された値を渡す
    handleMarriageChoice(choiceValue);
  };

  //----------結婚の実装----------
  const handleMarriageChoice = (choice) => {
    const updatedPlayers = players.map((player) => {
      if (player.id === currentTurn + 1) {
        if (choice === "marry") {
          return { ...player, isMarried: true, position: 14 };
        } else if (choice === "notMarry") {
          return { ...player, position: 22 };
        }
      }
      return player;
    });

    setPlayers(updatedPlayers);
    setIsModalVisible(false); // 選択後にモーダルを閉じる
    setModalChoices([]);
    advanceTurn(); // 次のターンに進む
  };

  // handleMarriageEventはモーダルをキューに入れ、次のターンを適切にセットアップするべきです
  const handleMarriageEvent = () => {
    modalManagerRef.current.queueChoiceModal(
      "幼馴染が現れた！！！",
      [
        { label: "結婚する？", value: "marry" },
        { label: "結婚しない？", value: "notMarry" },
      ],
      (choice) => {
        handleMarriageChoice(choice);
        // advanceTurn(); // 選択後に次のターンに進む
      }
    );
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

  useEffect(() => {
    if (showStartModal) {
      modalManagerRef.current.queueModal("ゲームスタート!", 3000);
      const timer = setTimeout(() => {
        setShowStartModal(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else if (currentTurn === 0) {
      // showStartModalがfalseになった後、最初のターンを開始する
      nextTurn();
    }
  }, [showStartModal]);

  // currentTurnが更新されたときにのみnextTurnを実行
  useEffect(() => {
    if (!showStartModal) {
      // ゲーム開始モーダルが表示されていない場合のみ
      nextTurn();
    }
  }, [currentTurn]);

  const boardSize = 75; // 仮にボードのマスが30だとする
  // マスの位置から色を取得する関数
  const getSquareColor = (position) => {
    // プレイヤーの位置に対応するIDを持つマスの要素を探す
    const squareElement = document.getElementById(position.toString());
    if (!squareElement) return null; // 要素が見つからなければnullを返す

    // マスのクラス名から色を抽出する
    const color = extractColorFromClassname(squareElement.className);
    return color;
  };

  // クラス名文字列から色を抽出するヘルパー関数
  const extractColorFromClassname = (classname) => {
    const colorPattern = /bg-([a-z]+)-200/; // この正規表現はクラス名で使われている色のフォーマットにマッチする
    const match = classname.match(colorPattern);
    return match ? match[1] : null; // 色に該当する部分を返す、またはマッチしない場合はnullを返す
  };

  //----------プレイヤーのターンを処理する関数 必要----------
  const nextTurn = () => {
    modalManagerRef.current.queueModal(
      `${players[currentTurn].name}のターン！`,
      2000
    );
  };

  // advanceTurnはただcurrentTurnを更新する
  const advanceTurn = () => {
    setRouletteNumber(null);
    let nextPlayerIndex = (currentTurn + 1) % players.length;
    // ゴールに到達しているプレイヤーをスキップする
    while (players[nextPlayerIndex].isFinished) {
      nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
    }
    setCurrentTurn(nextPlayerIndex);
  };

  // currentTurnが更新されたらnextTurnを呼び出すが、最初のターン（currentTurn === 0）は除外する
  useEffect(() => {
    if (currentTurn > 0) {
      // currentTurnが0より大きい場合にのみnextTurnを呼び出す
      nextTurn();
    }
  }, [currentTurn]);

  //---------- ルーレットの結果を処理し、結果を表示し、次のターンへ進む関数 必要---------------------
  const handleRouletteResult = (result) => {
    // ...ルーレットの結果を処理...
    const rouletteValue = parseInt(result);
    const currentPlayer = players[currentTurn];
    const newPosition = currentPlayer.position + rouletteValue;
    // プレイヤーの新しい位置を更新
    const updatedPlayers = players.map((player, index) => {
      if (index === currentPlayer.id) {
        return { ...player, position: newPosition };
      }
      return player;
    });
    setPlayers(updatedPlayers); // 新しいプレイヤーリストを設定

    // if (newPosition === 13) {
    //   handleMarriageEvent();
    // }
    // ゴール判定を追加
    // else
    if (newPosition >= boardSize) {
      // ゴールに到達したかチェック
      currentPlayer.isFinished = true; // ゴールフラグを立てる
      currentPlayer.position = boardSize; // ゴール位置に設定
    } else {
      currentPlayer.position = newPosition; // 新しい位置を更新
    }

    modalManagerRef.current.queueModal(
      `${rouletteValue} マス進みやがれ!`,
      2000
    );
    setTimeout(() => {
      const landedSquareColor = getSquareColor(newPosition);
      handleSquareEvent(
        players,
        currentPlayer,
        landedSquareColor,
        setPlayers,
        modalManagerRef,
        advanceTurn,
        allFinished,
        handleMarriageEvent
      );
    }, 2000);
  };
  // handleSquareEventを呼び出す部分
  const squareLanded = (player, color) => {
    handleSquareEvent(
      players,
      player,
      color,
      setPlayers,
      modalManagerRef,
      advanceTurn,
      allFinished,
      handleMarriageEvent // handleMarriageEventを引数として渡す
    );
  };

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

  //----------各モーダルのスタイル設定 必要だがCSSでも可----------
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
        <Roulette onStopSpinning={handleRouletteResult} />
      </div>

      {/* OshiTable コンポーネントでスタート位置にプレイヤーアイコンを表示する */}
      <OshiTable players={players} onPlayerLanding={handleSquareLanding} />

      {/* goalDialogの表示 */}
      {goalDialog()}

      {/* ランキング表示のコンポーネント */}
      {/* <RankingModal players={players} isOpen={showRankingModal} /> */}
      {/* ステータスを一時的に表示させるためのコンポーネント */}
      <div className="player-status-section">
        {[...players]
          .sort((a, b) => b.money - a.money)
          .map((player, index) => (
            <div key={player.id} className="player-status">
              <Player {...player} />
            </div>
          ))}
      </div>
    </>
  );
};

export default GameBoard2;
