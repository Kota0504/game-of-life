import React, { useState, useEffect } from "react";
import "./Dialog.css";
import Daialog_Result from "./Daialog_Result.js";

const Daialog_AllGoal = () => {
  const [isAllGoalDialogOpen, setAllGoalDialogOpen] = useState(true);
  const [isResultDialogOpen, setResultDialogOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAllGoalDialogOpen(false);
      setResultDialogOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isAllGoalDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            <p className="message">FINISH!</p>
          </div>
        </div>
      )}
      {isResultDialogOpen && <Daialog_Result />} {/* Daialog_Result を表示 */}
    </div>
  );
};

export default Daialog_AllGoal;

