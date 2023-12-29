//// App.js
// import React from 'react';
// import Dialog_AllGoal from './Daialog_AllGoal'; // Dialogコンポーネントのインポート
// // import Daialog_Result from "./Daialog_EachGoal.js";
// import './App.css';

// function App() {
//   // if () {
//     return (
//       <div className="app">
//         {/* <h1>Hello, React!</h1> */}
//         <Dialog_AllGoal />
//       </div>
//     );
    
//   // }
  
// }

// export default App;
import React, { useState } from 'react';
import Dialog_AllGoal from './Daialog_AllGoal'; // Dialogコンポーネントのインポート
import Dialog_EachGoal from './Daialog_EachGoal'; // Dialogコンポーネントのインポート
import './App.css';

function App() {
  // プレイヤー情報を仮定 how実際はデータ入れる？
  // "isfinished=true"のPlayerは次回以降のルーレットをスキップ　→"option"でスキップ作成予定？
  const players = [
    { name: 'プレイヤー1', isfinished: false },
    { name: 'プレイヤー2', isfinished: true },
  ];

  // 最後のプレイヤーがゴールしたかどうかを判断
  const lastPlayerisfinished = players.every(player => player.isfinished);

  if (lastPlayerisfinished) {
    return (
      <div className="app">
        <Dialog_AllGoal />
      </div>
    );
  } else {
    return (
      <div className="app">
        <Dialog_EachGoal />
      </div>
    );
  }
}

export default App;

