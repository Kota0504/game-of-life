import React, { useState, useEffect } from "react";
import "./Roulette.css";
import { Wheel } from "react-custom-roulette";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import groupImage from "./image/g13.png";

const RouletteApp = () => {
  const data = [
    { option: "1" },
    { option: "2" },
    { option: "3" },
    { option: "4" },
    { option: "5" },
    { option: "6" },
    { option: "7" },
    { option: "8" },
    { option: "9" },
    { option: "10" },
  ];

  const [prizeNumber, setPrizeNumber] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setSpinning(true);
  };

  const handleSpinStop = () => {
    setSpinning(false);
    setModalIsOpen(true);
  };

  const navigate = useNavigate();

  const [showStartModal, setShowStartModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStartModal(true);
      setTimeout(() => {
        navigate("/roulette"); // スタート表示後、ルーレット画面に遷移
      }, 3000);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleCloseModal = () => {
    setShowStartModal(false); // モーダルを非表示にする
    navigate("/"); // StartScreen コンポーネントに遷移させる
  };

  return (
    <div>
      <div className="header-class">
        <div className="App-logo-8">
          <img src={groupImage} alt="ロゴ" className="App-logo-2" />
          <span className="title">テーブル</span>
        </div>
        <div className="ranking-list">
          <span className="title">ランキング</span>
          <span className="title-9">●</span>
          <span className="title-9">●</span>
          <span className="title-9">●</span>
        </div>
        <button onClick={handleCloseModal} className="click-button-10">
          終了
        </button>
      </div>
      <Wheel
        mustStartSpinning={spinning}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={["#FF90BC", "#95DCE7"]}
        textColors={["#ffffff"]}
        onStopSpinning={handleSpinStop}
      />
      <button onClick={handleSpinClick}>ルーレットを回す</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <h2> {data[prizeNumber].option}進みやがれ</h2>
        <button onClick={() => setModalIsOpen(false)}>閉じる</button>
      </Modal>
    </div>
  );
};

export default RouletteApp;
