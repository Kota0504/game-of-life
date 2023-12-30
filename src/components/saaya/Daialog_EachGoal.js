import React, { useState, useEffect } from "react";
import './Dialog.css';
import Player from "./Player.js";
import OshiTable from "./OshiTable.js";

const Daialog_EachGoal = () => {
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
          <div className="dialog">
            <p className='playerName'>name</p>
            <p className='message'>ゴール！第○○位</p>
          </div>
        </div>
      )}
      {isOshiTableOpen && <OshiTable />} {/* OshiTable を表示 */}
    </div>
  );
};

export default Daialog_EachGoal;


