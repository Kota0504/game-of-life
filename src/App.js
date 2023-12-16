import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameUI from "./components/GameUI"; // 正しいパスに更新
import Roulette from "./components/Roulette"; // 正しいパスに更新
import StartScreen from "./components/StartScreen";
// ...他の必要なインポート...

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/game-ui" element={<GameUI />} />
        <Route path="/Roulette" element={<Roulette />} />
        {/* 他のルートを必要に応じて追加 */}
      </Routes>
    </Router>
  );
}

export default App;
