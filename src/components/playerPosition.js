import React, { useState, useEffect } from "react";

const PlayerPosition = ({
  players,
  setPlayers,
  rouletteNumber,
  setRouletteNumber,
}) => {
  // プレイヤーの位置を更新する関数
  const updatePlayerPositions = () => {
    if (rouletteNumber === null) return;

    setPlayers((prevPlayers) =>
      prevPlayers.map((player, index) => {
        if (index !== currentTurn) return player; // 現在のターンでなければ変更なし

        let newPosition = player.position + rouletteNumber;
        if (newPosition >= 30) {
          // ボードの最大値を超えないようにする
          newPosition = 29;
        }

        // 位置を更新したプレイヤー情報を返す
        return { ...player, position: newPosition };
      })
    );

    // ルーレットの数字をリセットする
    setRouletteNumber(null);
  };

  useEffect(() => {
    updatePlayerPositions();
  }, [rouletteNumber]); // ルーレットの数字が変わったら位置を更新

  // UIは特に必要ないのでnullを返す
  return null;
};

export default PlayerPosition;
