import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // UUIDを生成するためにimportします
import "./ParticipantScreen.css";
import groupImage from "./image/g13.png";

const ParticipantScreen = () => {
  const { token } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [participantId, setParticipantId] = useState(""); // 参加者IDのためのステート

  const handleJoin = () => {
    if (!nickname) {
      setError("※ニックネームが入力されていません");
      return;
    }

    // 参加者に一意のIDを生成してステートにセットします
    const newParticipantId = uuidv4();
    setParticipantId(newParticipantId);

    // ここでサーバーに参加者のニックネームとIDを送信するなどの参加処理を実装します
    // ...

    setShowModal(true);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setError("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="start-screen">
      <>
        <div className="parent">
          <div className="header-class">
            <div className="App-logo">
              <img src={groupImage} alt="ロゴ" className="App-logo-2" />
              <span className="title">人生ゲーム</span>
              <span className="text-black">〜オンラインでみんなで遊ぼう〜</span>
            </div>
          </div>
          <div className="container">
            <p className="surprise">ニックネームを入力してください</p>
            <div className="nickname-form">
              <input
                type="text"
                placeholder="ニックネーム"
                value={nickname}
                onChange={handleNicknameChange}
                required
                className="nickname"
              />
            </div>

            <div className={`error-container ${error ? "active" : ""}`}>
              {error}
            </div>

            <div className="button-container">
              <button onClick={handleJoin} className="click-button">
                参加
              </button>
            </div>
            {showModal && (
              <div className="modal-backdrop" onClick={handleCloseModal}>
                <div className="modal-content">
                  <button className="close-button" onClick={handleCloseModal}>
                    ✖︎
                  </button>
                  <h2 className="setsumei-5">参加ありがとうございます。</h2>
                  <p className="setsumei-5">開始までこの画面でお待ちください</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default ParticipantScreen;
