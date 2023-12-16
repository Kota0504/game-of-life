import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StartScreen.css";

const StartScreen = () => {
  const [nickname, setNickname] = useState("");
  const [page, setPage] = useState(1);
  const [participantModal, setParticipantModal] = useState(false); // これもモーダル表示のためのフラグです
  const [participantUrl, setParticipantUrl] = useState(""); // 参加者用 URL
  const [submitted, setSubmitted] = useState(false); // submitted 状態を追加
  const [participantCount, setParticipantCount] = useState(0); // URLにアクセスしている人数
  const [participants, setParticipants] = useState(["A", "B", "C", "D"]); // 仮のデータ
  const navigate = useNavigate();

  // 管理者用URLと参加者用URLの生成
  const generateRandomUrl = () => {
    return `https://example.com/${Math.random().toString(36).substring(2, 8)}`;
  };

  // 「今すぐ開始！」ボタンのハンドラ
  const handleStartClick = () => {
    setPage(2); // 2ページ目に遷移
  };

  // URL生成と参加者数の仮想的な更新
  useEffect(() => {
    if (page === 3) {
      setParticipantUrl(generateRandomUrl());
      // 参加者数の更新をシミュレート
      setParticipantCount(5); // 仮の人数です
    }
  }, [page]);

  // ニックネームの送信ハンドラ
  const handleNicknameSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // ニックネームが送信されたときに submitted を更新
    if (nickname) {
      // URLを生成して状態に保存
      setParticipantUrl(generateRandomUrl());
      setPage(3); // 3ページ目に遷移
    }
  };

  const handleShowParticipants = () => {
    // 参加者モーダルの状態をtrueに設定
    setParticipantModal(true);
  };
  // モーダルを閉じる関数
  const handleCloseModal = () => {
    setParticipantModal(false);
  };
  const handleModalOutsideClick = (e) => {
    if (e.target.id === "modal-backdrop") {
      handleCloseModal();
    }
  };

  // URLをクリップボードにコピー
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(participantUrl);
      alert("URLがコピーされました。");
    } catch (err) {
      console.error("クリップボードにコピーできませんでした。", err);
      // ここでユーザーにフィードバックを与えることもできます。
      alert("エラーが発生しました。手動でURLをコピーしてください。");
    }
  };

  // ゲーム開始ボタンの処理
  const handleGameStart = () => {
    // ゲームページに遷移する
    navigate("/game-ui");
  };

  return (
    <div className="start-screen">
      {page === 1 && (
        <>
          <h1>
            人生ゲーム <span>〜オンラインでみんなで遊ぼう〜</span>
          </h1>
          <p className="surprise">毎日がサプライズ！</p>
          <p className="story">あなたの人生ストーリーを描こう！</p>
          <button onClick={handleStartClick}>今すぐ開始！</button>{" "}
          {/* handleStartClickを使用 */}
        </>
      )}
      {page === 2 && (
        <>
          <h1>
            人生ゲーム <span>〜オンラインでみんなで遊ぼう〜</span>
          </h1>
          <div className="nickname-form">
            <form onSubmit={handleNicknameSubmit}>
              {" "}
              {/* ここに onSubmit イベントを追加 */}
              <input
                type="text"
                placeholder="ニックネーム"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
              {submitted && !nickname && (
                <p className="error-message">
                  ※ニックネームが入力されていません
                </p>
              )}
              <button type="submit">参加</button>{" "}
              {/* ボタンのタイプを 'submit' に変更 */}
            </form>
          </div>
        </>
      )}

      {page === 3 && (
        <>
          <div className="header">
            <span className="nickname">{`こんにちは、${nickname}さん`}</span>
            <span className="participant-count">{`オンライン: ${participantCount}人`}</span>
          </div>
          <button onClick={handleShowParticipants}>参加者一覧</button>
          <div className="participant-url">
            <span>{participantUrl}</span>
            <button onClick={copyToClipboard}>コピー</button>
          </div>
          <button onClick={handleGameStart}>開始</button>
          {/* 参加者一覧モーダル */}
          {participantModal && (
            <div
              id="modal-backdrop"
              className="modal-backdrop"
              onClick={handleModalOutsideClick}
            >
              <div className="modal-content">
                <button className="close-button" onClick={handleCloseModal}>
                  ✖︎
                </button>
                <h2>参加者一覧</h2>
                <ul>
                  {participants.map((name, index) => (
                    <li key={index}>{name}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const Modal = ({ title, content, handleClose }) => (
  <div className="modal">
    <h2>{title}</h2>
    <p>{content}</p>
    <button onClick={handleClose}>閉じる</button>
  </div>
);

export default StartScreen;
