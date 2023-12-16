import React from "react";

const ParticipantScreen = () => {
  return (
    <div className="participant-screen">
      <h1>人生ゲーム ～オンラインでみんなで遊ぼう～</h1>
      <p>ニックネームを入力してください</p>
      <input type="text" placeholder="ニックネーム" />
      <p>※ニックネームが入力されていません</p>
      <button>参加</button>
    </div>
  );
};

export default ParticipantScreen;
