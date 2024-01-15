import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "/Users/toshin/Desktop/game-of-life/src/tailwind.css";//→err原因の為一時コメントアウト
import "./tailwind.css";
import StartScreen from "./pages/start/StartScreen";
import ParticipantScreen from "./pages/start/ParticipantScreen";
import OshiTable from "./pages/game/components/OshiTable";
import GameBoard from "./pages/game/GameBoard";
import "./App.css";
import Modal from "react-modal";

// ----------------------------------socket.io----------------------------------
import io from "socket.io-client";
// 実際のserverのadressに合わせる。 今回はlocalhost:5000
const newSocket = io("http://localhost:5000"); //StartScreen.jsへpropsで渡す。
// ----------------------------------socket.io----------------------------------

const initialPlayersData = [
  { id: 1, name: "Player 1", position: 0 },
  { id: 2, name: "Player 2", position: 0 },
  { id: 3, name: "Player 3", position: 0 },
];

// 他のプレイヤーデータを追加
function App() {
  //一時的なプレイヤーの状態

  // プレイヤーの状態を管理
  const [players, setPlayers] = useState(initialPlayersData);

  // アプリケーションのルート要素をModalに設定する
  useEffect(() => {
    Modal.setAppElement("#root"); // ここでルート要素のIDを設定します
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen newSocket={newSocket} />} />
        {/* 削除されていた為一旦再度表示 */}
        <Route
          path="/participant"
          element={<ParticipantScreen newSocket={newSocket} />}
        />

        <Route
          path="/game-board"
          element={<GameBoard players={players} setPlayers={setPlayers} />}
        />
        {/* 他のルートを必要に応じて追加 */}
        <Route path="/oshitable" element={<OshiTable />} />
      </Routes>
    </Router>
  );
}

export default App;
