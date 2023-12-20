import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameUI from "./components/GameUI";
import Roulette from "./components/Roulette";
import GameBoard from "./components/GameBoard";
import StartScreen from "./components/StartScreen";
import ParticipantScreen from "./components/ParticipantScreen";
// 他の必要なインポート...

function App() {
  // プレイヤーの状態を管理
  const [players, setPlayers] = useState([
    // 初期プレイヤーの状態
  ]);

  // ルーレットの結果を管理
  const [rouletteNumber, setRouletteNumber] = useState(null);

  // 他の状態や関数...

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/game-ui" element={<GameUI />} />
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
        />
        <Route path="/game-board" element={<GameBoard players={players} />} />
        {/* 他のルートを必要に応じて追加 */}
      </Routes>
    </Router>
  );
}

export default App;
