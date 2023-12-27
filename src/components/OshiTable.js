import React from "react";
//親のapp.jsにimport tailwindCSSが記述しているので、二重記述になるのでここでは記述不要。

const OshiTable = ({ players }) => {
  //コンポーネント作成
  // 位置によってプレイヤーを見つけるヘルパー関数
  const findPlayerByPosition = (position) => {
    return players.find((player) => player.position === position);
  };

  return (
    //返す処理を記述する
    <div class="board">
      <div className="column">
        <div
          className="h-screen grid grid-cols-16 grid-rows-10 gap-1"
          id="game-board"
        >
          {/* １行目  */}
          <div className="bg-blue-200" id="46"></div>
          <div className="bg-pink-200" id="45"></div>
          <div className="bg-blue-200" id="44"></div>
          <div className="bg-blue-200" id="43"></div>
          <div className=""></div>
          <div className="bg-blue-200" id="39"></div>
          <div className="bg-pink-200" id="38"></div>
          <div className="bg-blue-200" id="38"></div>
          <div className=""></div>
          <div className="bg-blue-200" id="34"></div>
          <div className="bg-pink-200" id="33"></div>
          <div className="bg-blue-200" id="32"></div>
          <div className="bg-blue-200" id="31"></div>
          <div className="bg-yellow-200" id="30">
            分岐点
          </div>
          <div className="bg-blue-200" id="29"></div>
          <div className="bg-blue-200" id="28"></div>
          {/* 2行目  */}
          <div className="bg-blue-200" id="47"></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-pink-200" id="42"></div>
          <div className="bg-yellow-200" id="41"></div>
          <div className="bg-blue-200" id="40"></div>
          <div className=""></div>
          <div className="bg-blue-200" id="37"></div>
          <div className="bg-pink-200" id="36"></div>
          <div className="bg-blue-200" id="35"></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-blue-200" id="21"></div>
          <div className=""></div>
          <div className="bg-pink-200" id="27"></div>
          {/* /* -- 3行目  */}
          <div className="bg-pink-200" id="48"></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-blue-200" id="51"></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-pink-200" id="18"></div>
          <div className="bg-pink-200" id="19"></div>
          <div className="bg-blue-200" id="20"></div>
          <div className=""></div>
          <div className="bg-blue-200" id="26"></div>
          {/* /* 4行目  */}
          <div className="bg-blue-200" id="49"></div>
          <div className="bg-pink-200" id="50"></div>
          <div className="bg-yellow-200" id="54">
            id
          </div>
          <div className="bg-blue-200" id="53"></div>
          <div className="bg-pink-200" id="52"></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-blue-200" id="17"></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-blue-200" id="25"></div>
          {/* 5行目 --> */}
          <div className=""></div>
          <div className=""></div>
          <div className="bg-pink-200" id="55"></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-blue-200" id="16"></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-pink-200" id="24"></div>
          {/* <!-- 6行目 --> */}
          <div className="bg-blue-200" id="58"></div>
          <div className="bg-blue-200" id="57"></div>
          <div className="bg-yellow-200" id="56">
            id
          </div>
          <div className="bg-blue-200" id="66"></div>
          <div className="bg-blue-200" id="67"></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-pink-200" id="15"></div>
          <div className="bg-blue-200" id="14"></div>
          <div className="bg-yellow-200" id="13"></div>
          <div className="bg-blue-200" id="22"></div>
          <div className="bg-blue-200" id="23"></div>
          {/* <!-- 7行目 --> */}
          <div className="bg-blue-200" id="59"></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-pink-200" id="68"></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-blue-200" id="12"></div>
          <div className=""></div>
          <div className=""></div>
          {/* <!-- 8行目 --> */}
          <div className="bg-blue-200" id="60"></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-blue-200" id="69"></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-pink-200" id="11"></div>
          <div className="bg-blue-200" id="10"></div>
          <div className="bg-blue-200" id="9"></div>
          {/* <!-- 9行目 --> */}
          <div className="bg-pink-200" id="61"></div>
          <div className=""></div>
          <div className="bg-blue-200" id="65"></div>
          <div className="bg-pink-200" id="66"></div>
          <div className="bg-yellow-200" id="70"></div>
          <div className=""></div>
          <div className="bg-pink-200" id="74">
            ゴール
          </div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-blue-200" id="0">
            スタート
          </div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-pink-200" id="8"></div>
          {/* 10行目 --> */}
          <div className="bg-blue-200" id="62"></div>
          <div className="bg-pink-200" id="53"></div>
          <div className="bg-blue-200" id="64"></div>
          <div className=""></div>
          <div className="bg-blue-200" id="71"></div>
          <div className="bg-pink-200" id="72"></div>
          <div className="bg-blue-200" id="73"></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-blue-200" id="1"></div>
          <div className="bg-blue-200" id="2"></div>
          <div className="bg-pink-200" id="3"></div>
          <div className="bg-blue-200" id="4"></div>
          <div className="bg-pink-200" id="5"></div>
          <div className="bg-blue-200" id="6"></div>
          <div className="bg-blue-200" id="7"></div>
        </div>
      </div>
    </div>
  );
};

export default OshiTable;
