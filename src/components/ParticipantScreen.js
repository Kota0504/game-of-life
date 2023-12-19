import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // UUIDを生成するためにimportします
import "./ParticipantScreen.css";

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
    <div className="participant-screen">
      <h1>人生ゲーム 〜オンラインでみんなで遊ぼう〜</h1>
      <p>ニックネームを入力してください</p>
      <input
        type="text"
        placeholder="ニックネーム"
        value={nickname}
        onChange={handleNicknameChange}
      />
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleJoin}>参加</button>
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <p>参加ありがとうございます。</p>
            <p>開始までこの画面でお待ちください</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantScreen;
