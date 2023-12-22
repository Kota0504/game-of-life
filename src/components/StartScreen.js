import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StartScreen.css";
import { v4 as uuidv4 } from "uuid";

const StartScreen = () => {
  const [nickname, setNickname] = useState("");
  const [page, setPage] = useState(1);
  const [participantModal, setParticipantModal] = useState(false); // これもモーダル表示のためのフラグです
  const [participantUrl, setParticipantUrl] = useState(""); // 参加者用 URL
  const [participantCount, setParticipantCount] = useState(0); // URLにアクセスしている人数
  const [participants, setParticipants] = useState(["A", "B", "C"]); // 仮のデータ
  const [adminNickname, setAdminNickname] = useState("");
  const [error, setError] = useState("");
  const [adminId, setAdminId] = useState(""); // 管理者のIDを追加

  const navigate = useNavigate();

  // 管理者用URLと参加者用URLの生成
  const generateRandomUrl = () => {
    // ランダムなトークンを生成します。これは参加者に一意のIDを割り当てるために使用されます。
    const token = Math.random().toString(36).substring(2, 8);
    // アプリケーションの URL 構造に従って参加者画面への完全な URL を返します。
    return `https://example.com/participant/${token}`;
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
      setParticipantCount(4); // 仮の人数です
    }
  }, [page]);

  // 参加者用URLにアクセスしている人数を取得するための関数
  const fetchParticipantCount = async () => {
    try {
      const response = await fetch("/api/participant-count");
      const data = await response.json();
      setParticipantCount(data.count);
    } catch (error) {
      console.error("参加者数の取得に失敗しました:", error);
    }
  };
  // ニックネームの送信ハンドラ
  const handleNicknameSubmit = (e) => {
    e.preventDefault();
    if (!nickname) {
      setError("※ニックネームが入力されていません");
      return;
    }
    if (nickname) {
      // URLを生成して状態に保存
      setParticipantUrl(generateRandomUrl());
      setPage(3); // 3ページ目に遷移

      // 一意のIDを生成して設定
      const adminUniqueId = uuidv4();
      setAdminId(adminUniqueId);
      setAdminNickname(nickname); // 管理者のニックネームを設定

      // ここで、既存のparticipants配列を変更せずに管理者のみを追加します。
      // また、IDが不要であれば、adminIdの設定も省略できます。
      const newParticipant = { id: adminUniqueId, name: nickname };
      if (
        !participants.some((participant) => participant.id === adminUniqueId)
      ) {
        setParticipants([newParticipant, ...participants]);
      }
    }
  };

  // 参加者一覧を取得するための関数
  const fetchParticipants = async () => {
    try {
      const response = await fetch("/api/participants");
      const data = await response.json();
      setParticipants(data.participants);
    } catch (error) {
      console.error("参加者一覧の取得に失敗しました:", error);
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

  // 参加制限を確認するための関数
  const checkParticipantLimit = async () => {
    try {
      const response = await fetch("/api/check-limit");
      const data = await response.json();
      return data.isLimitExceeded;
    } catch (error) {
      console.error("参加制限の確認に失敗しました:", error);
      return true; // エラーが発生した場合は参加を制限する
    }
  };

  // ゲーム開始ボタンの処理
  const handleGameStart = async () => {
    const isLimitExceeded = await checkParticipantLimit();
    if (isLimitExceeded) {
      alert("参加人数が上限に達しています。");
      return;
    }

    // ゲームページに遷移する
    navigate("/game-ui");
  };
  // コンポーネントがマウントされた時に参加者数と参加者一覧を取得
  useEffect(() => {
    fetchParticipantCount();
    fetchParticipants();
  }, []);

  return (
    <div className="start-screen">
      {page === 1 && (
        <>
          <h1>
            人生ゲーム <span className="text-black">〜オンラインでみんなで遊ぼう〜</span>
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
          <p className="surprise">ニックネームを入力してください</p>
          <div className="nickname-form">
            <form onSubmit={handleNicknameSubmit}>
              <input
                type="text"
                placeholder="ニックネーム"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
              {error && <p className="error-message">{error}</p>}
              <button type="submit">参加</button>
            </form>
          </div>
        </>
      )}

      {page === 3 && (
        <>
          <h1>
            人生ゲーム{" "}
            <span className="nickname">{`こんにちは、${nickname}さん`}</span>
          </h1>
          <p>
            このページはゲームを進める管理者専用です。<br></br>
            参加者に「参加者用URL」を共有してください。<br></br>
            参加者が全員参加してから開始ボタンを押してください。
          </p>
          <div className="header">
            <span className="participant-count">
              {`参加者用URLにアクセスしている人数: ${participantCount}人`}
              <button onClick={handleShowParticipants}>参加者一覧</button>
              <button onClick={handleGameStart}>開始</button>
            </span>
          </div>
          <div className="participant-url">
            参加者用URL
            <span>{participantUrl}</span>
            <button onClick={copyToClipboard}>コピー</button>
          </div>
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
                  {participants.map((participant) => (
                    <li key={participant.id}>{participant.name}</li>
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
  <div className="modal" >
    <h2>{title}</h2>
    <p>{content}</p>
    <button onClick={handleClose}>閉じる</button>
  </div>
);

export default StartScreen;
