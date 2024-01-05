// 結婚イベントを処理する関数
export const handleMarriageEvent = (
  players,
  playerId,
  willMarry,
  setPlayers
) => {
  const marriagePosition = 14; // 結婚した場合の移動先
  const noMarriagePosition = 22; // 結婚しない場合の移動先

  setPlayers(
    players.map((player) => {
      if (player.id === playerId) {
        return {
          ...player,
          position: willMarry ? marriagePosition : noMarriagePosition,
          isMarried: willMarry,
        };
      }
      return player;
    })
  );
};
const events = {
  // マスのIDをキーとしたイベントのオブジェクト
  13: handleMarriageEvent,
  // 30: handleWeddingEvent,
  // 42: handleSecondMarriageEvent,
  // 55: handleBabyEvent,
  // 57: handleJobEvent,
  // 71: handlehouseEvent,
};

// イベントを発火させる関数
export function triggerEvent(squareId, player, players, setPlayers) {
  if (events[squareId]) {
    // イベントが定義されている場合は、それを実行します。
    events[squareId](players, player.id, player.willMarry, setPlayers);
  }
}
