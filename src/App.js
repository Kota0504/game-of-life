import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./tailwind.css";
import Roulette from "./components/Roulette";
import StartScreen from "./components/StartScreen";
// import ParticipantScreen from "./components/ParticipantScreen";
import OshiTable from "./components/OshiTable";
import GameBoard2 from "./components/GameBoard2";

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
  { id: 3, name: "Player 2", position: 0 },
];

// 他のプレイヤーデータを追加
function App() {
  //一時的なプレイヤーの状態

  // プレイヤーの状態を管理
  const [players, setPlayers] = useState(initialPlayersData);
  // ルーレットの結果を管理
  const [rouletteNumber, setRouletteNumber] = useState(null);

  // アプリケーションのルート要素をModalに設定する
  useEffect(() => {
    Modal.setAppElement("#root"); // ここでルート要素のIDを設定します
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen socket={socket} />} />
        {/* <Route path="/game-ui" element={<GameUI />} />
        <Route
          path="/roulette"
          element={
            <Roulette
              players={players}
              setPlayers={setPlayers}
              rouletteNumber={rouletteNumber}
              setRouletteNumber={setRouletteNumber}
            />
          }
        /> */}
        <Route
          path="/game-board"
          element={<GameBoard2 players={players} setPlayers={setPlayers} />}
        />
        {/* 他のルートを必要に応じて追加 */}
        <Route path="/oshitable" element={<OshiTable />} />

      </Routes>
    </Router>
  );
}

export default App;
