import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameUI from "./components/GameUI";
import Roulette from "./components/Roulette";
import GameBoard from "./components/GameBoard";
import StartScreen from "./components/StartScreen";
import ParticipantScreen from "./components/ParticipantScreen";
import PlayerPosition from "./components/playerPosition"; // Adjust the path as necessary

// 他の必要なインポート...

const initialPlayersData = [
  { id: 1, name: "Player 1", position: 0 },
  { id: 2, name: "Player 2", position: 0 },
];

// 他のプレイヤーデータを追加
function App() {
  //一時的なプレイヤーの状態

  // プレイヤーの状態を管理
  const [players, setPlayers] = useState(initialPlayersData);
  // ルーレットの結果を管理
  const [rouletteNumber, setRouletteNumber] = useState(null);

  // プレイヤーの位置を更新する関数;
  const updatePlayerPosition = (playerId, newPosition) => {
    setPlayers((currentPlayers) => {
      return currentPlayers.map((player) => {
        if (player.id === playerId) {
          return { ...player, position: newPosition };
        }
        return player;
      });
    });
  };

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
        // In App.js, pass setPlayers as a prop
        <Route
          path="/game-board"
          element={<GameBoard players={players} setPlayers={setPlayers} />}
        />
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
        <Route
          path="/player-position"
          element={
            <PlayerPosition
              players={players}
              updatePlayerPosition={updatePlayerPosition}
            />
          }
        />
        {/* 他のルートを必要に応じて追加 */}
      </Routes>
    </Router>
  );
}

export default App;
