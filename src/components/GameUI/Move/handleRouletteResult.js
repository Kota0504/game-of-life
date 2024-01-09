//---------- ルーレットの結果を処理し、結果を表示し、次のターンへ進む関数 ---------------------
const handleRouletteResult = (
  players,
  result,
  currentTurn,
  setPlayers,
  boardSize,
  modalManagerRef,
  getSquareColor,
  handleSquareEvent,
  advanceTurn,
  setRouletteNumber,
  setCurrentTurn,
  allFinished,
  handleMarriageEvent
) => {
  // プレイヤー配列と現在のターンが有効な範囲内にあるかをチェック
  if (!players || currentTurn < 0 || currentTurn >= players.length) {
    return; // エラーがある場合は処理を中断
  }
  const currentPlayer = players[currentTurn]; // 現在のプレイヤー
  // ...ルーレットの結果を処理...
  const rouletteValue = parseInt(result);
  const newPosition = currentPlayer.position + rouletteValue;
  // プレイヤーの新しい位置を更新
  const updatedPlayers = players.map((player) => {
    if (player.id === currentPlayer.id) {
      return { ...player, position: newPosition };
    }
    return player;
  });
  setPlayers(updatedPlayers); // 新しいプレイヤーリストを設定

  if (newPosition >= boardSize) {
    // ゴールに到達したかチェック
    currentPlayer.isFinished = true; // ゴールフラグを立てる
    currentPlayer.position = boardSize; // ゴール位置に設定
  } else {
    currentPlayer.position = newPosition; // 新しい位置を更新
  }

  modalManagerRef.current.queueModal(`${rouletteValue} マス進みやがれ!`, 2000);
  setTimeout(() => {
    const landedSquareColor = getSquareColor(newPosition);
    handleSquareEvent(
      players,
      currentPlayer,
      landedSquareColor,
      setPlayers,
      modalManagerRef,
      () =>
        advanceTurn(currentTurn, players, setRouletteNumber, setCurrentTurn),
      allFinished,
      handleMarriageEvent
    );
  }, 2000);
};
export default handleRouletteResult;
