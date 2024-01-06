import React, { useState, useEffect } from "react";
import './Dialog.css';
import OshiTable from "./OshiTable.js";
import player from "./GameBoard2";

const Dialog_EachGoal = () => {
  const [isEachGoalDialogOpen, setEachGoalDialogOpen] = useState(true);
  const [isOshiTableOpen, setOshiTableOpen] = useState(false);

  // const userName = "saaaya";

  useEffect(() => {
    const timer = setTimeout(() => {
      setEachGoalDialogOpen(false);
      setOshiTableOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* <button onClick={openDialog}>Open Dialog</button>  */}

      {isEachGoalDialogOpen && (
        <div className="dialog-overlay">
          <div key={player.id} className="dialog">
            <p className='playerName'>{player.name}</p>
            <p className='message'>{player.money}円</p>
          </div>
        </div>
      )}
      {isOshiTableOpen && <OshiTable />} {/* OshiTable を表示 */}
    </div>
  );
};

export default Dialog_EachGoal;

