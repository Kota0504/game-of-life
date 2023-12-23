import React from "react";
//親のapp.jsにimport tailwindCSSが記述しているので、二重記述になるのでここでは記述不要。

const OshiTable = () => {
  //コンポーネント作成

  return (
    //返す処理を記述する
    <div class="board">
      <div className="column">
        <div
          className="h-screen grid grid-cols-16 grid-rows-10 gap-1"
          id="game-board"
        >
          {/* １行目  */}
          <div className="bg-blue-200"></div>
          <div className="bg-pink-200" id="square2">
            id2
          </div>
          <div className="bg-blue-200"></div>
          <div className="bg-blue-200"></div>
          <div className=""></div>
          <div className="bg-blue-200"></div>
          <div className="bg-pink-200"></div>
          <div className="bg-blue-200"></div>
          <div className=""></div>
          <div className="bg-blue-200"></div>
          <div className="bg-pink-200"></div>
          <div className="bg-blue-200"></div>
          <div className="bg-blue-200"></div>
          <div className="bg-yellow-200" id="square3">
            分岐点
          </div>
          <div className="bg-blue-200"></div>
          <div className="bg-blue-200"></div>
          {/* 2行目  */}
          <div className="bg-blue-200"></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-pink-200"></div>
          <div className="bg-yellow-200"></div>
          <div className="bg-blue-200"></div>
          <div className=""></div>
          <div className="bg-blue-200"></div>
          <div className="bg-pink-200"></div>
          <div className="bg-blue-200"></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-blue-200"></div>
          <div className=""></div>
          <div className="bg-pink-200"></div>
          {/* /* -- 3行目  */}
          <div className="bg-pink-200"></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-blue-200"></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-pink-200"></div>
          <div className="bg-pink-200"></div>
          <div className="bg-blue-200"></div>
          <div className=""></div>
          <div className="bg-blue-200"></div>
          {/* /* 4行目  */}
          <div className="bg-blue-200"></div>
          <div className="bg-pink-200"></div>
          <div className="bg-blue-200"></div>
          <div className="bg-blue-200"></div>
          <div className="bg-pink-200"></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-blue-200"></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-blue-200"></div>
          {/* 5行目 --> */}
          <div className=""></div>
          <div className=""></div>
          <div className="bg-pink-200"></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-blue-200"></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-pink-200"></div>
          {/* <!-- 6行目 --> */}
          <div className="bg-blue-200"></div>
          <div className="bg-blue-200"></div>
          <div className="bg-yellow-200"></div>
          <div className="bg-blue-200"></div>
          <div className="bg-blue-200"></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-pink-200"></div>
          <div className="bg-blue-200"></div>
          <div className="bg-yellow-200"></div>
          <div className="bg-blue-200"></div>
          <div className="bg-blue-200"></div>
          {/* <!-- 7行目 --> */}
          <div className="bg-blue-200"></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-pink-200"></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-blue-200"></div>
          <div className=""></div>
          <div className=""></div>
          {/* <!-- 8行目 --> */}
          <div className="bg-blue-200"></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-blue-200"></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-pink-200"></div>
          <div className="bg-blue-200"></div>
          <div className="bg-blue-200"></div>
          {/* <!-- 9行目 --> */}
          <div className="bg-pink-200"></div>
          <div className=""></div>
          <div className="bg-blue-200"></div>
          <div className="bg-pink-200"></div>
          <div className="bg-yellow-200"></div>
          <div className=""></div>
          <div className="bg-pink-200" id="squareN">
            ゴール
          </div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-blue-200" id="square1">
            スタート
          </div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-pink-200"></div>
          {/* 10行目 --> */}
          <div className="bg-blue-200"></div>
          <div className="bg-pink-200"></div>
          <div className="bg-blue-200"></div>
          <div className=""></div>
          <div className="bg-blue-200"></div>
          <div className="bg-pink-200"></div>
          <div className="bg-blue-200"></div>
          <div className=""></div>
          <div className=""></div>
          <div className="bg-blue-200"></div>
          <div className="bg-blue-200"></div>
          <div className="bg-pink-200"></div>
          <div className="bg-blue-200"></div>
          <div className="bg-pink-200"></div>
          <div className="bg-blue-200"></div>
          <div className="bg-blue-200"></div>
        </div>
      </div>
    </div>
  );
};

export default OshiTable;
