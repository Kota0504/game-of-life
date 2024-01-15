import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../start/css/StartScreen.css";
import { v4 as uuidv4 } from "uuid";
import groupImage from "../../assets/g13.png";

const StartScreen = ({ newSocket }) => {
  // const [socket, setSocket] = useState(null);
  // 一般的なパターンで、userNameInputがリアルタイムでの入力値を管理し、userNameが最終的な確定された値を保持するための変数として使われる
  const [adminNameInput, setAdminNameInput] = useState(""); // ユーザー名の入力値をリアルタイムで管理
  const [adminName, setAdminName] = useState(""); // 確定したユーザー名を保持
  const [roomName, setRoomName] = useState(""); // 確定したユーザー名を保持

  const [admin, setAdmin] = useState(null); // 管理者情報を単一のオブジェクトとして管理
  const [participantLists, setParticipantLists] = useState([]); // 参加者リスト

  const [nickname, setNickname] = useState("");
  const [page, setPage] = useState(1);
  const [participantModal, setParticipantModal] = useState(false); // これもモーダル表示のためのフラグです
  const [participantUrl, setParticipantUrl] = useState(""); // 参加者用 URL

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [participantCount, setParticipantCount] = useState(0);

  // ------------------------------↓↓↓Participant.Screenより参加者情報受け取り↓↓↓------------------------------

  useEffect(() => {
    newSocket.on("participantCountUpdate", ({ count }) => {
      setParticipantCount(count);
    });
  }, [newSocket]);

  useEffect(() => {
    if (adminName !== "") {
      joinRoom(roomName, adminName);
    }
  }, [roomName]);

  const joinRoom = () => {
    newSocket.emit("joinRoom", { roomName, adminName });
  };

  // ニックネームの送信ハンドラ
  const joinAndSetAdminName = (e) => {
    e.preventDefault();
    if (!adminNameInput) {
      setError("※ニックネームが入力されていません");
      return;
    }
    setAdminName(adminNameInput);
    if (adminNameInput) {
      setParticipantUrl(generateRandomUrl());

      setPage(3); // 3ページ目に遷移
    }
  };

  useEffect(() => {
    newSocket.on("ParticipantInfo", (data) => {
      console.log(data);

      setParticipantLists((prevParticipants) => [...prevParticipants, data]);
    });
  }, [newSocket]);

  useEffect(() => {
    // 現在の接続先(localhost:5000)をsetSocketで登録
    // setSocket(newSocket);
  }, []); // 初回マウント時のみ実行
  useEffect(() => {
    const roomId = participantUrl ? participantUrl.split("?room=")[1] : "";
    if (participantUrl) {
      setRoomName(roomId);
    }
  }, [participantUrl]);

  useEffect(() => {
    newSocket.on("newUser", (users) => {
      console.log(users);
    });
  }, []);

  // 参加者用URLの生成
  const generateRandomUrl = () => {
    // ランダムなトークンを生成します。これは参加者に一意のIDを割り当てるために使用されます。
    const token = "?room=room" + uuidv4();

    // アプリケーションの URL 構造に従って参加者画面への完全な URL を返します。
    // return `https://example.com/participant/${token}`;
    return `localhost:3000/participant/${token}`;
  };

  // 「今すぐ開始！」ボタンのハンドラ
  const handleStartClick = () => {
    setPage(2); // 2ページ目に遷移
  };

  // 初回マウント時にURL生成
  useEffect(() => {
    generateRandomUrl();
  }, []);

  // ニックネームの送信ハンドラ
  const handleAdminnameSubmit = (e) => {
    e.preventDefault();
    if (!adminName) {
      setError("※ニックネームが入力されていません");
      return;
    }
    if (nickname) {
      setPage(3); // 3ページ目に遷移

      setAdmin({
        id: uuidv4(),
        name: nickname,
      });
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
    //   try {
    //     const response = await fetch("/api/check-limit");
    //     const data = await response.json();
    //     return data.isLimitExceeded;
    //   } catch (error) {
    //     console.error("参加制限の確認に失敗しました:", error);
    //     return true; // エラーが発生した場合は参加を制限する
    //   }
  };

  // ----------------------------------↓↓↓socket.io↓↓↓----------------------------------
  // ----------------------------------↓↓↓socket.io↓↓↓----------------------------------

  // ゲーム開始ボタンの処理
  const handleGameStart = async () => {
    const isLimitExceeded = await checkParticipantLimit();
    newSocket.emit("adminStart", roomName); // 開始ボタンが押されたことをサーバーにemit

    if (isLimitExceeded) {
      alert("参加人数が上限に達しています。");
      return;
    }

    // ゲームページに遷移する
    navigate("/game-board");
  };

  useEffect(() => {
    newSocket.on("adminAllow", () => {
      // サーバーからの指示を受けてゲームページに遷移
      navigate("/game-board");
    });
  }, [newSocket]);

  // ----------------------------------↑↑↑socket.io↑↑↑----------------------------------
  // ----------------------------------↑↑↑socket.io↑↑↑----------------------------------
  return (
    <div className="start-screen">
      {page === 1 && (
        <>
          <div className="parent">
            <div className="header-class">
              <div className="App-logo">
                <img src={groupImage} alt="ロゴ" className="App-logo-2" />

                <span className="title">人生ゲーム</span>
                <span className="text-black">
                  〜オンラインでみんなで遊ぼう〜
                </span>
              </div>
            </div>
            <div className="container">
              <p className="surprise">毎日がサプライズ！</p>
              <p className="story">あなたの人生ストーリーを描こう！</p>
              <button onClick={handleStartClick} className="click-button-7">
                今すぐ無料で遊ぶ
              </button>
            </div>
          </div>
        </>
      )}
      {page === 2 && (
        <>
          <div className="parent">
            <div className="header-class">
              <div className="App-logo">
                <img src={groupImage} alt="ロゴ" className="App-logo-2" />
                <span className="title">人生ゲーム</span>
                <span className="text-black">
                  〜オンラインでみんなで遊ぼう〜
                </span>
              </div>
            </div>
            <div className="container">
              <p className="surprise">ニックネームを入力してください</p>
              <div className="nickname-form">
                <form onSubmit={joinAndSetAdminName}>
                  <input
                    type="text"
                    placeholder="ニックネーム"
                    value={adminNameInput}
                    onChange={(e) => setAdminNameInput(e.target.value)}
                    className="nickname"
                  />
                  <div className={`error-container ${error ? "active" : ""}`}>
                    {error}
                  </div>
                  <button type="submit" className="click-button-6">
                    参加
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {page === 3 && (
        <>
          <div className="parent">
            <div className="header-class">
              <div className="App-logo">
                <img src={groupImage} alt="ロゴ" className="App-logo-2" />
                <span className="title">人生ゲーム</span>
                <span className="text-black">
                  〜オンラインでみんなで遊ぼう〜
                </span>
              </div>
            </div>
            <div className="container">
              <p className="setsumei">
                このページはゲームを進める管理者専用です。<br></br>
                参加者に「参加者用URL」を共有してください。<br></br>
                参加者が全員参加してから開始ボタンを押してください。
              </p>
              <div className="header-2">
                <div className="participant-count">
                  <div className="setumei-parent">
                    <span className="count-people">{` ${participantCount}人`}</span>
                    <span className="setsumei-2">
                      「参加者用URL」に参加している人数
                    </span>
                  </div>

                  <div className="button-twins">
                    <button
                      onClick={handleShowParticipants}
                      className="click-button-3"
                    >
                      参加者一覧
                    </button>
                    <button
                      onClick={handleGameStart}
                      className="click-button-4"
                    >
                      開始
                    </button>
                  </div>
                </div>
              </div>
              <div className="participant-url">
                <span className="participant-url-2"> 参加者用URL</span>

                <span className="participant-url-3">{participantUrl}</span>
                <button onClick={copyToClipboard} className="click-button-5">
                  コピー
                </button>
              </div>
              {/* 参加者一覧モーダル */}
              {participantModal && (
                <div
                  id="modal-backdrop"
                  className="modal-backdrop"
                  onClick={handleModalOutsideClick}
                >
                  <div>
                    <button className="close-button" onClick={handleCloseModal}>
                      ✖︎
                    </button>
                    <span className="title-4">参加者一覧</span>
                    <ul className="list">
                      {/* 管理者 */}
                      {adminName && <li>{adminName}</li>}
                      {/* 参加者リストをmapして表示 */}
                      {participantLists.map(
                        (participant) =>
                          participant.userName &&
                          participant.userName.trim() !== "" && (
                            <li key={participant.id}>{participant.userName}</li>
                          )
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
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
