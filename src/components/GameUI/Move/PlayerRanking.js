export const updatePlayerRanks = (players) => {
  if (!Array.isArray(players)) {
    console.error("Error: players should be an array", players);
    return []; // エラーの場合は空の配列を返す
  }

  const sortedPlayers = [...players].sort((a, b) => b.money - a.money);
  return sortedPlayers.map((player, index) => ({
    ...player,
    rank: index + 1,
  }));
};
