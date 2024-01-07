import React, { useState } from "react";
import "/Users/toshin/Desktop/game-of-life/src/components/css/Dialog.css";
import player from "../GameBoard";
import "/Users/toshin/Desktop/game-of-life/src/App.css";

const Dialog_Result = () => {
  const isDialogOpen = useState(true);

  return (
    <div className="App">
      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            <p className="message">結果発表！</p>
            <div key={player.id} className="result_list">
              <p className="message result_item">{player.index + 1}位</p>
              <p className="message result_item">{player.name}</p>
              <p className="message result_item">{player.money}円</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dialog_Result;
