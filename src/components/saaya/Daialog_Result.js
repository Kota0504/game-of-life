import React, { useState } from 'react';
import Player from './Player';
import './Dialog.css';

const Daialog_Result = () => {
  const [isDialogOpen, setDialogOpen] = useState(true);

  // const openDialog = () => {
  //   setDialogOpen(true);
  // };

  // const closeDialog = () => {
  //   setDialogOpen(false);
  // };

  return (
    <div>
      {/* <button onClick={openDialog}>Open Dialog</button>  */}

      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            {/* <btn className="close-btn" onClick={closeDialog}>×</btn> */}
            <p className='message'>RESULT!!</p>
            <div className='result_list'>
            <p className='message result_item'>第○○位</p>
            <p className='message result_item'>ユーザーname</p>
            <p className='message result_item'>{Player.money}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Daialog_Result;
