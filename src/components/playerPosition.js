import React from "react";

const PlayerPosition = ({
  players,
  setPlayers,
  currentTurn,
  rouletteNumber,
}) => {
  // This effect updates the player's position when the rouletteNumber changes
  React.useEffect(() => {
    if (rouletteNumber !== null) {
      setPlayers((prevPlayers) =>
        prevPlayers.map((player, index) => {
          if (index !== currentTurn) return player; // It's not this player's turn

          let newPosition = player.position + rouletteNumber;
          if (newPosition >= 30) {
            newPosition = 29; // Ensure we don't go past the end of the board
          }

          // Return updated player info
          return { ...player, position: newPosition };
        })
      );
    }
  }, [rouletteNumber, currentTurn, setPlayers]);

  // No UI needed for this component, as it only handles logic
  return null;
};

export default PlayerPosition;
