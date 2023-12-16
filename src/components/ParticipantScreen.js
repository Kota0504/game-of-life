import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./ParticipantScreen.css"; // CSSファイルをインポート

const ParticipantScreen = () => {
  const { token } = useParams();
  const [showModal, setShowModal] = useState(false); // モーダル表示ステート

  // 参加ボタンのハンドラ
  const handleJoin = () => {
    // ここで参加処理を実装します（例: APIにニックネームを送信する等）
    // ...

    // 参加処理後、モーダルを表示
    setShowModal(true);
  };

  // モーダルを閉じるハンドラ
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="participant-screen">
      <h1>人生ゲーム 〜オンラインでみんなで遊ぼう〜</h1>
      <p>ニックネームを入力してください</p>
      <input type="text" placeholder="ニックネーム" />
      <p className="error-message">※ニックネームが入力されていません</p>
      <button onClick={handleJoin}>参加</button>
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <button onClick={handleCloseModal} className="close-button">
              ×
            </button>
            <p>開始までこの画面でお待ちください</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantScreen;
