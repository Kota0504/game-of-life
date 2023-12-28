import React from "react";
import { useNavigate } from "react-router-dom";
//親のapp.jsにimport tailwindCSSが記述しているので、二重記述になるのでここでは記述不要。

const OshiTable = () => {
  const navigate = useNavigate();

  const handleCloseModal = () => {
    navigate("/"); // start-screen に遷移
  };
  return (
    //返す処理を記述する
    <>
      <div className="header-class-8">
        <div className="App-logo-8">
          <img
            src="src/components/image/group.png"
            alt="ロゴ"
            className="App-logo-2"
          />
          <span className="title-8">テーブル</span>
        </div>
        <div className="ranking-list">
          <span className="title-9">ランキング</span>
          <span className="title-9">●</span>
          <span className="title-9">●</span>
          <span className="title-9">●</span>
        </div>
        <button onClick={handleCloseModal} className="close-button-9">
          終了
        </button>
      </div>
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
    </>
  );
};

export default OshiTable;
