import React, { useState, useEffect } from "react";
import "./GameBoard.css";
import Player from "./Player";
import OshiTable from "./OshiTable";
import Roulette from "./Roulette";
import Modal from "react-modal";

const GameBoard2 = () => {
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
  const [showRouletteModal, setShowRouletteModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    playerName: "",
    message: "",
  });
  const [showTurnModal, setShowTurnModal] = useState(false);
  // 仮の`calculateNewPosition`関数を定義
  // これはプレイヤーの新しい位置を計算するための関数で、現在の位置、移動するステップ数、そしてボードのマスの数をパラメーターとして受け取ります。
  const calculateNewPosition = (currentPosition, steps, boardSize) => {
    let newPosition = currentPosition + steps;
    // ボードのサイズを超えた場合はラップアラウンド
    if (newPosition >= boardSize) {
      newPosition = newPosition - boardSize;
    }
    // 新しい位置を返します
    return newPosition;
  };

  const calculatePlayerRanks = (players) => {
    // プレイヤーを そのお金に基づいてソートする（降順）
    const sortedPlayers = [...players].sort((a, b) => b.money - a.money);

    // ソートされたお金に基づいてランクを割り当てる
    const rankedPlayers = sortedPlayers.map((player, index) => ({
      ...player,
      rank: index + 1,
    }));

    return rankedPlayers;
  };

  const [showStartModal, setShowStartModal] = useState(true);
  const [rouletteNumber, setRouletteNumber] = useState(null);

  // 画面ロード時にスタートモーダルを表示し、ゲームを進行させる　必要
  useEffect(() => {
    const startGameTimer = setTimeout(() => {
      setShowStartModal(false);
      nextTurn(); // 初回のプレイヤーターンを開始
    }, 3000);

    return () => clearTimeout(startGameTimer);
  }, []);

  // プレイヤーのターンを処理する関数　必要
  const nextTurn = () => {
    setModalContent({
      message: `${players[currentTurn].name}のターン！`,
    });
    setShowTurnModal(true);

    // 2秒後にルーレットモーダルを表示し、ターンモーダルを非表示にする
    setTimeout(() => {
      setShowTurnModal(false);
      setShowRouletteModal(true);
    }, 2000);
  };
  // モーダルを閉じる関数　必要
  useEffect(() => {
    let timer;
    if (isModalVisible) {
      // モーダルが表示された後2秒で自動的に閉じるタイマーを設定
      timer = setTimeout(() => {
        setIsModalVisible(false);
      }, 2000);
    }

    // コンポーネントがアンマウントされたとき、またはモーダルが手動で2秒前に閉じられたときにタイマーをクリアする
    return () => clearTimeout(timer);
  }, [isModalVisible]);

  // ルーレットの結果を処理し、結果を表示し、次のターンへ進む関数　必要
  const handleRouletteResult = (result) => {
    const rouletteValue = parseInt(result, 10); // ルーレットの結果を数値として処理
    const currentPlayer = players[currentTurn];
    // 新しい位置に基づいてプレイヤーアイコンを移動する
    const newPosition = calculateNewPosition(
      currentPlayer.position,
      rouletteValue,
      players.length
    );

    setRouletteNumber(rouletteValue); // 状態にルーレットの結果を保存

    // プレイヤーの位置を更新
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === currentPlayer.id
          ? { ...player, position: newPosition }
          : player
      )
    );

    // // 新しい位置の効果をトリガーする　効果実装後
    // const effectResult = applySquareEffect(
    //   determineSquareType(newPosition),
    //   currentPlayer,
    //   rouletteValue
    // );

    // 結果モーダルの表示内容を更新
    setModalContent({
      playerName: players[currentTurn].name,
      message: ` ${rouletteValue} マス進みやがれ`,
    });

    setShowRouletteModal(false); // ルーレットモーダルを閉じる
    setIsModalVisible(true); // 結果モーダルを表示

    // 一定時間後に結果モーダルを閉じて次のプレイヤーのターンに進む
    setTimeout(() => {
      setIsModalVisible(false); // 結果モーダルを閉じる

      // // プレイヤーの位置更新などの処理をここに追加
      // // ...
      advanceTurn(); // 次のプレイヤーのターンへ
    }, 2000);
  };

  // ターンを進める関数　必要
  const advanceTurn = () => {
    // 現在のターンのプレイヤーが最後のプレイヤーであれば、最初のプレイヤーに戻る
    const nextPlayerIndex = (currentTurn + 1) % players.length;
    setCurrentTurn(nextPlayerIndex); // 次のプレイヤーにターンを設定

    // 次のプレイヤーのターンモーダルを表示
    setShowTurnModal(true);
    setModalContent({
      message: `${players[nextPlayerIndex].name}のターン！`,
    });

    // 2秒後にルーレットモーダルを表示
    setTimeout(() => {
      setShowTurnModal(false);
      setShowRouletteModal(true);
    }, 2000);
  };

  // モーダルのスタイル設定　必要
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

  // マスに止まった時の処理　未実装
  // useEffect(() => {
  //   if (rouletteNumber !== null) {
  //     const currentPlayer = players[currentTurn]; // この行を追加する
  //     const someConditionForModalToShow = (player, number) => {
  //       // ここに条件ロジックを書く。例えば:
  //       return number > 0 && player.position < 30; // 仮の条件
  //     };
  //     if (someConditionForModalToShow(currentPlayer, rouletteNumber)) {
  //       setIsModalVisible(true);
  //     }
  //   }
  // }, [rouletteNumber, currentTurn, players]);

  // // マス目のタイプを判断する関数
  // const determineSquareType = (position) => {
  //   // OshiTableのマス目の色に基づいてタイプを決定
  //   // ここではシンプルな例を示しますが、実際には OshiTable のマス目の配列またはオブジェクトを参照する必要があります
  //   const types = ["bg-blue-200", "bg-pink-200", "bg-yellow-200"];
  //   const color = types[position % types.length]; // 仮の色決定ロジック
  //   return color;
  // };

  // // マス目の効果を適用する関数
  // const applySquareEffect = (squareType, player, steps) => {
  //   let message = "";
  //   let moneyChange = 0;
  //   switch (squareType) {
  //     case "bg-blue-200":
  //       moneyChange = 10000;
  //       message = "プラス10000円！！";
  //       break;
  //     case "bg-pink-200":
  //       moneyChange = -3000;
  //       message = "マイナス3000円！！";
  //       break;
  //     case "bg-yellow-200":
  //       // イベント発生の詳細な処理はここに実装する
  //       message = "イベントが発生！！";
  //       break;
  //     default:
  //       message = "何も起こりませんでした。";
  //       break;
  //   }
  //   return {
  //     position: player.position + steps,
  //     money: player.money + moneyChange,
  //     message,
  //   };
  // };

  return (
    <>
      {/* スタートモーダル */}
      {showStartModal && (
        <Modal isOpen={true} style={customStyles}>
          <h2>ゲームスタート!</h2>
        </Modal>
      )}
      {/* ターンモーダル */}
      {showTurnModal && (
        <Modal isOpen={true} style={customStyles}>
          <h2>{modalContent.playerName}</h2>
          <p>{modalContent.message}</p>
          {/* ターンモーダル特有の内容 */}
        </Modal>
      )}
      {/* // 直接ルーレットコンポーネントを埋め込む */}
      {!showStartModal && showRouletteModal && (
        <div className="roulette-container">
          <Roulette onStopSpinning={handleRouletteResult} />
        </div>
      )}
      {isModalVisible && (
        <Modal isOpen={isModalVisible} style={customStyles}>
          <h2>{modalContent.playerName}</h2>
          <p>{modalContent.message}</p>
        </Modal>
      )}
      {/* // OshiTable コンポーネントでスタート位置にプレイヤーアイコンを表示する */}
      <OshiTable players={players.filter((player) => player.position === 0)} />
      {/* 他の UI コンポーネント */}
    </>
  );
};

export default GameBoard2;
