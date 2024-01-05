import React from "react";

// // 結婚イベントを処理する関数
// export const handleMarriageEvent = (
//   players,
//   playerId,
//   willMarry,
//   setPlayers
// ) => {
//   const marriagePosition = 14; // 結婚した場合の移動先
//   const noMarriagePosition = 22; // 結婚しない場合の移動先

//   setPlayers(
//     players.map((player) => {
//       if (player.id === playerId) {
//         return {
//           ...player,
//           position: willMarry ? marriagePosition : noMarriagePosition,
//           isMarried: willMarry,
//         };
//       }
//       return player;
//     })
//   );
// };
// const events = {
//   // マスのIDをキーとしたイベントのオブジェクト
//   13: handleMarriageEvent,
//   // 30: handleWeddingEvent,
//   // 42: handleSecondMarriageEvent,
//   // 55: handleBabyEvent,
//   // 57: handleJobEvent,
//   // 71: handlehouseEvent,
// };

// // イベントを発火させる関数
// export function triggerEvent(squareId, player, players, setPlayers) {
//   if (events[squareId]) {
//     // イベントが定義されている場合は、それを実行します。
//     events[squareId](players, player.id, player.willMarry, setPlayers);
//   }
// }

// ｰｰｰｰｰｰｰｰｰｰ結婚のマスの処理ｰｰｰｰｰｰｰｰｰｰ
export const TriggerYellowSquareEvent = ({
  currentPlayerIndex,
  players,
  setPlayers,
  modalManagerRef,
  getSquareColor,
  handleSquareEvent,
  advanceTurn,
  allFinished,
  setShowRankingModal,
  setIsMarriageModalOpen,
  isMarriageModalOpen,
}) => {
  setIsMarriageModalOpen(true); // 結婚選択モーダルを表示

  const handleMarriageChoice = (choice) => {
    setIsMarriageModalOpen(false); // モーダルを閉じる
    const updatedPlayers = players.map((player, index) => {
      if (index === currentPlayerIndex) {
        if (choice === "marry") {
          // 結婚する選択
          return { ...player, isMarried: true, position: 14 }; // 結婚状態と位置を更新
        } else if (choice === "notMarry") {
          // 結婚しない選択
          return { ...player, position: 22 }; // 位置だけ更新
        }
      }
      return player;
    });

    setPlayers(updatedPlayers); // 新しいプレイヤーリストを設定

    // 選択に応じたマスの処理を行う
    const nextPosition = choice === "marry" ? 14 : 22;
    const color = getSquareColor(nextPosition);
    handleSquareEvent(
      players,
      players[currentPlayerIndex],
      color,
      setPlayers,
      modalManagerRef,
      advanceTurn,
      allFinished,
      setShowRankingModal
    );
  };

  return (
    <div className="marriage-modal">
      {isMarriageModalOpen && (
        <div>
          <p>幼馴染が飛び出してきた！結婚する？結婚しない？</p>
          <button onClick={() => handleMarriageChoice("marry")}>
            結婚する
          </button>
          <button onClick={() => handleMarriageChoice("notMarry")}>
            結婚しない
          </button>
        </div>
      )}
    </div>
  );
};
export default TriggerYellowSquareEvent;
