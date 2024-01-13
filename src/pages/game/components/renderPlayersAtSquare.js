// //Playerをマスに表示させるコンポーネント　　分けたいが、できないのでコメントアウト中
// const renderPlayersAtSquare = (players, squareId, onPlayerLanding) => {
//   const playersAtSquare = players
//     ? players.filter((player) => player.position === squareId)
//     : [];
//   playersAtSquare.forEach((player) => onPlayerLanding(player.id));
//   return playersAtSquare.map((player, index) => (
//     <div key={player.id} className={`player player-${index + 1}`}>
//       <span>{player.name}</span>
//     </div>
//   ));
// };

// export default renderPlayersAtSquare;
