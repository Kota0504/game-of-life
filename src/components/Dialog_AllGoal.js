import React, { useState, useEffect } from "react";
import "./Dialog.css";
import Dialog_Result from "./Dialog_Result.js";

const Dialog_AllGoal = () => {
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
      {isResultDialogOpen && <Dialog_Result />} {/* Dialog_Result を表示 */}
    </div>
  );
};

export default Dialog_AllGoal;

