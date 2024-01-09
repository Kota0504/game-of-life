import { useState } from "react";

//----------プレイヤーのターンを処理する関数 必要----------

export const nextTurn = (modalManagerRef, players, currentTurn) => {
  if (modalManagerRef && modalManagerRef.current) {
    modalManagerRef.current.queueModal(
      `${players[currentTurn].name}のターン！`,
      2000
    );
  }
};

// advanceTurnはただcurrentTurnを更新する
export const advanceTurn = (
  currentTurn,
  players,
  setRouletteNumber,
  setCurrentTurn
) => {
  setRouletteNumber(null);
  let nextPlayerIndex = (currentTurn + 1) % players.length;
  // ゴールに到達しているプレイヤーをスキップする
  while (players[nextPlayerIndex].isFinished) {
    nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
  }
  setCurrentTurn(nextPlayerIndex);
};
