import React, { useState, useEffect } from "react";
import "./GameBoard.css";
import Player from "./Player";
import OshiTable from "./OshiTable";
import Roulette from "./Roulette";
import Modal from "react-modal";

const GameBoard = () => {
  //----------暫定的に実装しているプレイヤーのステータス あとで参加プレイヤーのステータスになるように実装する----------
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
  //-----------useStateで渡す定義 必要----------
  const [players, setPlayers] = useState(initialPlayers);
  const [showStartModal, setShowStartModal] = useState(true);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [showTurnModal, setShowTurnModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showRouletteModal, setShowRouletteModal] = useState(false);
  const [rouletteNumber, setRouletteNumber] = useState(null);
  const [modalContent, setModalContent] = useState({
    playerName: "",
    message: "",
  });
  const boardSize = 76; // 仮にボードのマスが30だとする
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

  //----------プレイヤーを そのお金に基づいてソートする、ソートされたお金に基づいてランクを割り当てる（降順) 未実装----------
  // const calculatePlayerRanks = (players) => {
  //   const sortedPlayers = [...players].sort((a, b) => b.money - a.money);
  //   const rankedPlayers = sortedPlayers.map((player, index) => ({
  //     ...player,
  //     rank: index + 1,
  //   }));

  //   return rankedPlayers;
  // };

  //----------プレイヤーのターンを処理する関数 必要----------
  const nextTurn = () => {
    setModalContent({
      message: `${players[currentTurn].name}のターン！`,
    });
    setShowTurnModal(true);

    // 2秒後にルーレットモーダルを表示し、ターンモーダルを非表示にする 必要
    setTimeout(() => {
      setShowTurnModal(false);
      setShowRouletteModal(true);
    }, 2000);
  };

  const advanceTurn = () => {
    // 1. ターンを進める前に必要な処理
    setRouletteNumber(null); // この行を追加
    const nextPlayerIndex = (currentTurn + 1) % players.length;
    setCurrentTurn(nextPlayerIndex);

    // 2. 次のプレイヤーのターンモーダルを表示
    setShowTurnModal(true);
    setModalContent({
      message: `${players[nextPlayerIndex].name}のターン！`,
    });

    // 3. 2秒後にルーレットモーダルを表示し、ターンモーダルを非表示にする
    setTimeout(() => {
      setShowTurnModal(false);
      setShowRouletteModal(true);
    }, 2000);
  };

  //---------- ルーレットの結果を処理し、結果を表示し、次のターンへ進む関数 必要---------------------

  const handleRouletteResult = (result) => {
    // ルーレットの結果に基づいてプレイヤーを移動させる
    const rouletteValue = parseInt(result, 10);
    const currentPlayer = players[currentTurn];
    currentPlayer.position =
      (currentPlayer.position + rouletteValue) % boardSize;

    // 4. ⚪︎マス進みやがれのモーダルを2秒表示
    setModalContent({
      message: `${rouletteValue} マス進みやがれ`,
    });
    setIsModalVisible(true);

    // 5. モーダルが表示された後、マスを移動し、マスのイベントを処理
    setTimeout(() => {
      setIsModalVisible(false); // モーダルを閉じる
      const landedSquareColor = getSquareColor(currentPlayer.position); // マスの色を取得する関数
      handleSquareEvent(currentPlayer, landedSquareColor); // マスのイベントを処理

      // 6. マスイベントのモーダルを3秒表示し、次のターンに移行
      setTimeout(() => {
        setIsModalVisible(false); // マスイベントのモーダルを閉じる
        advanceTurn(); // 次のターンに進む
      }, 3000);
    }, 2000);
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

  //----------マスごとのイベント処理 必要だが未実装----------
  const handleSquareEvent = (player, color) => {
    let message = "";
    let updatedPlayers = players.map((p) => {
      if (p.id === player.id) {
        // プレイヤーの所持金を一時変数に格納
        let updatedMoney = p.money;

        // マスの色に応じたイベント処理
        switch (color) {
          case "blue":
            updatedMoney += 10000; // 青マス: 10000円獲得
            message = "10000円獲得しました";
            break;
          case "pink":
            updatedMoney -= 5000; // ピンクマス: 5000円失う
            message = "5000円失いました";
            break;
          case "yellow":
            // イエローマス: その他イベント発生
            message = "イベント発生！";
            break;
          default:
            // その他の色（または色なし）のマス
            message = "何も起こりませんでした";
        }

        // 新しいプレイヤーオブジェクトを返す
        return { ...p, money: updatedMoney };
      } else {
        // 他のプレイヤーはそのまま返す
        return p;
      }
    });

    // 状態を更新
    setPlayers(updatedPlayers);
    // モーダルに表示する内容を設定
    setModalContent({ playerName: player.name, message: message });
    // モーダルを表示
    setIsModalVisible(true);

    //---------- プレイヤー情報とモーダルのメッセージを更新----------
    if (player.position !== 0) {
      setModalContent({
        playerName: player.name,
        message: message,
      });
      setIsModalVisible(true);
    }
  };

  //----------マス目の色を基にイベントを実行する関数 必要----------
  const handleSquareLanding = (playerId) => {
    const player = players.find((p) => p.id === playerId);
    if (!player) return; // プレイヤーが見つからなければ何もしない

    const squareElement = document.getElementById(player.position.toString());
    if (!squareElement) return; // マス目が存在しなければ何もしない

    // classNameから色を抽出する
    const colorClass = squareElement.className.match(/bg-[a-z]+-200/);
    if (!colorClass) return; // 色のクラスが見つからなければ何もしない
    const color = colorClass[0].split("-")[1]; // "bg-blue-200" -> "blue"

    handleSquareEvent(player, color); // 親コンポーネントのイベントハンドラを呼び出し
  };

  //----------画面ロード時にスタートモーダルを表示し、ゲームを進行させる 必要----------
  useEffect(() => {
    const startGameTimer = setTimeout(() => {
      setShowStartModal(false);
      nextTurn(); // 初回のプレイヤーターンを開始
    }, 3000);

    return () => clearTimeout(startGameTimer);
  }, []);

  //----------次のプレイヤーのターンへ 必要-------------------------
  useEffect(() => {
    if (rouletteNumber !== null && !isModalVisible) {
      let updatedPlayers = players.map((player, index) => {
        if (index === currentTurn) {
          let newPosition = player.position + rouletteNumber;
          if (newPosition >= boardSize) {
            newPosition -= boardSize;
          }
          const updatedPlayer = { ...player, position: newPosition };
          handleSquareEvent(updatedPlayer);
          return updatedPlayer;
        } else {
          return player;
        }
      });

      setPlayers(updatedPlayers);
      setRouletteNumber(null); // ルーレット番号リセット

      // 一定時間後に次のターンへ
      setTimeout(() => {
        advanceTurn();
      }, 2000);
    }
  }, [
    rouletteNumber,
    isModalVisible,
    currentTurn,
    setPlayers,
    boardSize,
    advanceTurn,
    handleSquareEvent,
    players,
  ]);

  //----------モーダルを閉じる関数 必要----------
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

  // ゲームの開始時にゲームスタートモーダルを3秒表示
  useEffect(() => {
    setShowStartModal(true);
    setTimeout(() => {
      setShowStartModal(false);
      nextTurn(); // ゲーム開始とともに最初のプレイヤーのターンを開始
    }, 3000);
  }, []);

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
        </Modal>
      )}
      {/* // 直接ルーレットコンポーネントを埋め込む */}
      {!showStartModal && showRouletteModal && (
        <div className="roulette-container">
          <Roulette onStopSpinning={handleRouletteResult} />
        </div>
      )}
      {/* // OshiTable コンポーネントでスタート位置にプレイヤーアイコンを表示する */}
      <OshiTable players={players} onPlayerLanding={handleSquareLanding} />
      {/* ステータスを一時的に表示させるためのコンポーネント */}
      <div className="player-status-section">
        {players.map((player, index) => (
          <div key={player.id} className="player-status">
            <Player {...player} />
          </div>
        ))}
      </div>
    </>
  );
};

export default GameBoard;
