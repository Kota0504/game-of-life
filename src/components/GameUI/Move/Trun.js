//----------プレイヤーのターンを処理する機能 ----------

export const nextTurn = (modalManagerRef, players, currentTurn) => {
  if (!players || currentTurn < 0 || currentTurn >= players.length) {
    console.error("Invalid currentTurn");
    return; // 無効な currentTurn の場合は処理を中断
  }

  if (modalManagerRef && modalManagerRef.current) {
    modalManagerRef.current.queueModal(
      `${players[currentTurn].name}のターン！`,
      1000
    );
  }
};

// advanceTurn 関数内で setCurrentTurn の呼び出しを確認
export const advanceTurn = (
  currentTurn,
  players,
  setRouletteNumber,
  setCurrentTurn
) => {
  setRouletteNumber(null);

  // 次のプレイヤーを計算する
  let nextPlayerIndex = (currentTurn + 1) % players.length;
  while (
    players[nextPlayerIndex].isFinished &&
    !players.every((player) => player.isFinished)
  ) {
    nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
  }

  setCurrentTurn(nextPlayerIndex); // 新しいターンをセット
};
