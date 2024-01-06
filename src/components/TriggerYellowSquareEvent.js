import React from "react";

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
  const handleMarriageChoice = (choice) => {
    // setIsMarriageModalOpen(false); // モーダルを閉じる
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
    <div>
      {isMarriageModalOpen && (
        <div className="marigge-modal">
          <p>幼馴染が飛び出してきた！</p>
          <button onClick={() => handleMarriageChoice("marry")}>
            結婚する?
          </button>
          <button onClick={() => handleMarriageChoice("notMarry")}>
            結婚しない?
          </button>
        </div>
      )}
    </div>
  );
};
export default TriggerYellowSquareEvent;
