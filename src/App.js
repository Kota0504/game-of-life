import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "/Users/toshin/Desktop/game-of-life/src/tailwind.css";
import StartScreen from "./pages/start/StartScreen";
import OshiTable from "./pages/game/components/OshiTable";
import GameBoard from "./pages/game/GameBoard";
import "./App.css";
import Modal from "react-modal";

// 他の必要なインポート...

// ----------------------------------socket.io----------------------------------
import io from "socket.io-client";
const socket = io("http://localhost:5000"); //StartScreen.jsへpropsで渡す。
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
        <Route path="/" element={<StartScreen socket={socket} />} />
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
