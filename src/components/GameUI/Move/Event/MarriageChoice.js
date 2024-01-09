//----------結婚の実装----------
export const handleMarriageChoice = (
  players,
  advanceTurn,
  currentTurn,
  setIsModalVisible,
  setPlayers,
  choice,
  setModalChoices
) => {
  const updatedPlayers = players.map((player) => {
    if (player.id === currentTurn + 1) {
      if (choice === "marry") {
        return { ...player, isMarried: true, position: 14 };
      } else if (choice === "notMarry") {
        return { ...player, position: 22 };
      }
    }
    return player;
  });

  setPlayers(updatedPlayers);
  setIsModalVisible(false); // 選択後にモーダルを閉じる
  setModalChoices([]);
  advanceTurn(); // 次のターンに進む
};

// handleMarriageEventはモーダルをキューに入れ、次のターンを適切にセットアップするべきです
export const handleMarriageEvent = (modalManagerRef) => {
  modalManagerRef.current.queueChoiceModal(
    "幼馴染が現れた！！！",
    [
      { label: "結婚する？", value: "marry" },
      { label: "結婚しない？", value: "notMarry" },
    ],
    (choice) => {
      handleMarriageChoice(choice);
      // advanceTurn(); // 選択後に次のターンに進む
    }
  );
};
