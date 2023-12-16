import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameUI from "./components/GameUI"; // 正しいパスに更新
import Roulette from "./components/Roulette"; // 正しいパスに更新
import StartScreen from "./components/StartScreen";
import ParticipantScreen from "./components/ParticipantScreen"; // 新しいインポート
// ...他の必要なインポート...

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/game-ui" element={<GameUI />} />
        <Route path="/Roulette" element={<Roulette />} />
        <Route path="/participant" element={<ParticipantScreen />} />{" "}
        {/* 他のルートを必要に応じて追加 */}
      </Routes>
    </Router>
  );
}

export default App;
