import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // UUIDを生成するためにimportします
// import "@/pages/start/css/ParticipantScreen.css";
// import groupImage from "@/assets/g13.png";

const ParticipantScreen = ({ newSocket }) => {
  // 一般的なパターンで、userNameInputがリアルタイムでの入力値を管理し、userNameが最終的な確定された値を保持するための変数として使われる
  const [userNameInput, setUserNameInput] = useState(""); // ユーザー名の入力値をリアルタイムで管理
  const [userName, setUserName] = useState(""); // 確定したユーザー名を保持
  // 接続が切り替わる場合や異なる接続を行う必要がある場合 新しいSocket.IOインスタンスを作成
  // コンポーネントの初回レンダリング時にはSocket.IOの接続が確立されていないため、最初はsocketをnullで初期化
  // const [socket, setSocket] = useState(null);
  const [participantLists, setParticipantLists] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [participantId, setParticipantId] = useState("");
  const navigate = useNavigate();

  // 管理者が発行したURLから部屋名を取得する
  const urlParams = new URLSearchParams(window.location.search);
  const roomName = urlParams.get("room"); // URL内の'room'パラメータから部屋名を取得する

  // ----------------------------------↓↓↓new Code↓↓↓----------------------------------
  // ----------------------------------↓↓↓new Code↓↓↓----------------------------------

  useEffect(() => {
    // 現在の接続先(localhost:5000)をsetSocketで登録
    // setSocket(newSocket);
  }, []); // 初回マウント時のみ実行

  // Roomに参加する関数
  const joinRoom = (roomName, userName) => {
    // サーバーに参加を通知
    newSocket.emit("joinRoom", { roomName, userName });
    setShowModal(true);

    // 参加者数を管理者に通知
    newSocket.emit("participantCountUpdate");
  };

  // onChangeなので入力内容をリアルタイムでuserNameを取得
  const handleUserNameInput = (event) => {
    setUserNameInput(event.target.value);
    // if (userNameInput === "") {
    //   setError("※ニックネームが入力されていません");
    //   return;
    // }
  };
  // ユーザー名をセットする関数
  const joinAndSetUserName = () => {
    setUserName(userNameInput);
  };
  // userNameが確実に更新された後joinRoomを発火→useStatenの非同期性を考慮
  useEffect(() => {
    // 初回マウント時に発火しないようにデータが空の場合を除く
    if (userName !== "") {
      joinRoom(roomName, userName);
    }
  }, [userName]);

  useEffect(() => {
    const handleAdminAllow = () => {
      navigate("/game-board");
    };

    newSocket.on("adminAllow", handleAdminAllow);

    return () => {
      newSocket.off("adminAllow", handleAdminAllow);
      // socket.disconnect(); // クリーンアップ
    };
  }, [newSocket, navigate]);

  // ----------------------------------↑↑↑new Code↑↑↑----------------------------------
  // ----------------------------------↑↑↑new Code↑↑↑----------------------------------

  // useEffect(() => {
  //   const handleAdminAllow = () => {
  //     navigate("/game-ui");
  //   };

  //   socket.on("adminAllow", handleAdminAllow);

  //   return () => {
  //     socket.off("adminAllow", handleAdminAllow);
  //     // socket.disconnect(); // クリーンアップ
  //   };
  // }, [socket, navigate]);

  const handleJoin = () => {
    if (!userNameInput) {
      setError("※ニックネームが入力されていません");
      return;
    }

    // const newParticipant = {
    //   id: uuidv4(),
    //   name: nickname,
    // };

    // setParticipantLists([...participantLists, newParticipant]);

    // socket.emit("ParticipantStart");

    setShowModal(true);
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
              {/* <img src={groupImage} alt="ロゴ" className="App-logo-2" /> */}
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
                value={userNameInput}
                onChange={(e) => handleUserNameInput(e)}
                required
                className="nickname"
              />
            </div>

            <div className={`error-container ${error ? "active" : ""}`}>
              {error}
            </div>

            <div className="button-container">
              <button onClick={joinAndSetUserName} className="click-button">
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
