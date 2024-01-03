import React, { useState, useEffect, useRef } from "react";
import "./GameBoard.css";
import Player from "./Player";
import OshiTable from "./OshiTable";
import Roulette from "./Roulette";
import Modal from "react-modal";
import ModalManager from "./ModalManager";
import { handleSquareEvent, handleSquareLanding } from "./SquareEvents";

const GameBoard2 = () => {
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rouletteNumber, setRouletteNumber] = useState(null);
  const [modalContent, setModalContent] = useState("");

  const modalManagerRef = useRef();

  useEffect(() => {
    if (!modalManagerRef.current) {
      modalManagerRef.current = new ModalManager((visible, message) => {
        setIsModalVisible(visible);
        setModalContent(message);
      });
    }
  }, []); // ModalManagerのインスタンス初期化用のEffect

  useEffect(() => {
    if (showStartModal) {
      modalManagerRef.current.queueModal("ゲームスタート!", 3000);
      const timer = setTimeout(() => {
        setShowStartModal(false); // これをfalseに設定して、モーダルが再表示されないようにする
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showStartModal]);

  // currentTurnが更新されたときにのみnextTurnを実行
  useEffect(() => {
    if (!showStartModal) {
      // ゲーム開始モーダルが表示されていない場合のみ
      nextTurn();
    }
  }, [currentTurn]);

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
  const calculatePlayerRanks = (players) => {
    const sortedPlayers = [...players].sort((a, b) => b.money - a.money);
    const rankedPlayers = sortedPlayers.map((player, index) => ({
      ...player,
      rank: index + 1,
    }));

    return rankedPlayers;
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
    const nextPlayerIndex = (currentTurn + 1) % players.length;
    setCurrentTurn(nextPlayerIndex);
  };

  // currentTurnの変更を監視して、変更があったらnextTurnを呼び出す
  useEffect(() => {
    if (currentTurn !== null) {
      // 初期状態など、無効なターンでないことを確認
      nextTurn();
    }
  }, [currentTurn]); // currentTurnが変更されたときにのみこのeffectを実行

  //---------- ルーレットの結果を処理し、結果を表示し、次のターンへ進む関数 必要---------------------

  const handleRouletteResult = (result) => {
    // ...ルーレットの結果を処理...
    const rouletteValue = parseInt(result);
    const currentPlayer = players[currentTurn];
    currentPlayer.position =
      (currentPlayer.position + rouletteValue) % boardSize;

    modalManagerRef.current.queueModal(
      `${rouletteValue} マス進みやがれ!`,
      2000
    );

    setTimeout(() => {
      const landedSquareColor = getSquareColor(currentPlayer.position);
      handleSquareEvent(
        players,
        currentPlayer,
        landedSquareColor,
        setPlayers,
        modalManagerRef,
        advanceTurn
      );
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

  return (
    <>
      {/* モーダル表示 */}
      <Modal isOpen={isModalVisible} style={customStyles}>
        <h2>{modalContent}</h2>
      </Modal>

      {/* 直接ルーレットコンポーネントを埋め込む */}
      <div className="roulette-container">
        <Roulette onStopSpinning={handleRouletteResult} />
      </div>

      {/* OshiTable コンポーネントでスタート位置にプレイヤーアイコンを表示する */}
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

export default GameBoard2;
