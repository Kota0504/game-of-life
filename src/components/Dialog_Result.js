import React, { useState } from 'react';
import './Dialog.css';
import player from "./GameBoard2";
import '../App.css';

const Dialog_Result = () => {
  const [isDialogOpen, setDialogOpen] = useState(true);

  // const openDialog = () => {
  //   setDialogOpen(true);
  // };

  // const closeDialog = () => {
  //   setDialogOpen(false);
  // };

  return (
    <div className="App">
      {/* <button onClick={openDialog}>Open Dialog</button>  */}

      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            {/* <btn className="close-btn" onClick={closeDialog}>×</btn> */}
            <p className='message'>結果発表！</p>
            <div key={player.id} className='result_list'>
            <p className='message result_item'>{player.index + 1}位</p>
            <p className='message result_item'>{player.name}</p>
            <p className='message result_item'>{player.money}円</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dialog_Result;

// import React, { useState, useEffect } from 'react';
// import Modal from "react-modal";
// import { useNavigate } from "react-router-dom";
// import Player from './Player';
// import './Dialog.css';

// const Dialog_Result = ({ players, isOpen, setShowRankingModal }) => {
//   const [isDialogOpen, setDialogOpen] = useState(true);
//   const navigate = useNavigate();
//   const sortedPlayers = players.slice().sort((a, b) => b.money - a.money); // 金額順にソート

//   useEffect(() => {
//     if (isOpen) {
//       // 3秒後に結果発表モーダルを表示し、さらに10秒後に初期画面にリダイレクト
//       setTimeout(() => {
//         setShowRankingModal(false); // 結果発表モーダルを閉じる
//         navigate("/"); // 初期画面にリダイレクト
//       }, 10000); // 10秒後
//     }
//   }, [isOpen, navigate, setShowRankingModal]);
//   // const openDialog = () => {
//   //   setDialogOpen(true);
//   // };

//   // const closeDialog = () => {
//   //   setDialogOpen(false);
//   // };

//   return (
//     <div isOpen={isOpen}>
//       {/* <button onClick={openDialog}>Open Dialog</button>  */}

//       {isDialogOpen && (
//         <div className="dialog-overlay">
//           <div className="dialog">
//             {/* <btn className="close-btn" onClick={closeDialog}>×</btn> */}
//             <h2 className='message'>結果発表</h2>
//             {sortedPlayers.map((player, index) => (
//             <div  key={player.id} className='result_list'>
//             <p className='message result_item'>第{index + 1}位: </p>
//             <p className='message result_item'>{player.name} </p>
//             <p className='message result_item'>{player.money}円</p>
//             </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dialog_Result;


// import React, { useEffect } from "react";
// import Modal from "react-modal";
// import { useNavigate } from "react-router-dom";

// const Dialog_Result = ({ players, isOpen, setShowRankingModal }) => {
//   const navigate = useNavigate();
//   const sortedPlayers = players.slice().sort((a, b) => b.money - a.money); // 金額順にソート

//   useEffect(() => {
//     if (isOpen) {
//       // 3秒後に結果発表モーダルを表示し、さらに10秒後に初期画面にリダイレクト
//       setTimeout(() => {
//         setShowRankingModal(false); // 結果発表モーダルを閉じる
//         navigate("/"); // 初期画面にリダイレクト
//       }, 10000); // 10秒後
//     }
//   }, [isOpen, navigate, setShowRankingModal]);

//   return (
//     <Modal isOpen={isOpen}>
//       <h2>結果発表</h2>
//       <ol>
//         {sortedPlayers.map((player, index) => (
//           <li key={player.id}>
//             {index + 1}位: {player.name} {player.money}円
//           </li>
//         ))}
//       </ol>
//     </Modal>
//   );
// };

// export default Dialog_Result;
