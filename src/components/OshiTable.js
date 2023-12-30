import React from "react";
import { useNavigate } from "react-router-dom";
//親のapp.jsにimport tailwindCSSが記述しているので、二重記述になるのでここでは記述不要。

const OshiTable = ({ players, onPlayerLanding }) => {
  const navigate = useNavigate();

  const handleCloseModal = () => {
    navigate("/"); // start-screen に遷移
  };

  // 各プレイヤーのアイコンをレンダリングする関数
  const renderPlayersAtSquare = (squareId) => {
    const playersAtSquare = players.filter(
      (player) => player.position === squareId
    );
    playersAtSquare.forEach((player) => onPlayerLanding(player.id));
    return playersAtSquare.map((player, index) => (
      <div key={player.id} className={`player player-${index + 1}`}>
        <span>{player.name}</span>
      </div>
    ));
  };

  // // プレイヤーの位置情報を更新するための useEffect
  // useEffect(() => {
  //   // プレイヤーの位置情報を更新するロジックがここに必要
  //   // 例: 親コンポーネントから受け取った最新のプレイヤー情報に基づいて表示を更新
  // }, [players]);

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
      <div className="board">
        <div className="column">
          <div
            className="h-screen grid grid-cols-16 grid-rows-10 gap-1"
            id="game-board"
          >
            {/* １行目  */}
            <div className="bg-blue-200" id="47">
              {renderPlayersAtSquare(47)}
            </div>
            <div className="bg-pink-200" id="46">
              {renderPlayersAtSquare(46)}
            </div>
            <div className="bg-blue-200" id="45">
              {renderPlayersAtSquare(45)}
            </div>
            <div className="bg-blue-200" id="44">
              {renderPlayersAtSquare(44)}
            </div>
            {/* このマス目には何も表示しないため、関数を呼び出しません */}
            <div className=""></div>
            <div className="bg-blue-200" id="40">
              {renderPlayersAtSquare(40)}
            </div>
            <div className="bg-pink-200" id="39">
              {renderPlayersAtSquare(39)}
            </div>
            <div className="bg-blue-200" id="38">
              {renderPlayersAtSquare(38)}
            </div>
            {/* このマス目には何も表示しないため、関数を呼び出しません */}
            <div className=""></div>
            <div className="bg-blue-200" id="34">
              {renderPlayersAtSquare(34)}
            </div>
            <div className="bg-pink-200" id="33">
              {renderPlayersAtSquare(33)}
            </div>
            <div className="bg-blue-200" id="32">
              {renderPlayersAtSquare(32)}
            </div>
            <div className="bg-blue-200" id="31">
              {renderPlayersAtSquare(31)}
            </div>
            <div className="bg-yellow-200" id="30">
              {renderPlayersAtSquare(30)}
              <span>結婚式</span>
            </div>
            <div className="bg-blue-200" id="29">
              {renderPlayersAtSquare(29)}
            </div>
            <div className="bg-blue-200" id="28">
              {renderPlayersAtSquare(28)}
            </div>

            {/* 2行目 */}
            <div className="bg-blue-200" id="48">
              {renderPlayersAtSquare(48)}
            </div>
            <div className=""></div>
            <div className=""></div>
            <div className="bg-pink-200" id="43">
              {" "}
              {renderPlayersAtSquare(43)}
            </div>
            <div className="bg-yellow-200" id="42">
              {renderPlayersAtSquare(42)}
              <span>結婚2</span>
            </div>
            <div className="bg-blue-200" id="41">
              {" "}
              {renderPlayersAtSquare(41)}
            </div>
            <div className=""></div>
            <div className="bg-blue-200" id="37">
              {renderPlayersAtSquare(37)}
            </div>
            <div className="bg-pink-200" id="36">
              {renderPlayersAtSquare(36)}
            </div>
            <div className="bg-blue-200" id="35">
              {renderPlayersAtSquare(35)}
            </div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className="bg-blue-200" id="21">
              {renderPlayersAtSquare(21)}
            </div>
            <div className=""></div>
            <div className="bg-pink-200" id="27">
              {renderPlayersAtSquare(27)}
            </div>
            {/* 3行目 */}
            <div className="bg-pink-200" id="49">
              {renderPlayersAtSquare(49)}
            </div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className="bg-blue-200" id="52">
              {renderPlayersAtSquare(52)}
            </div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className="bg-pink-200" id="18">
              {renderPlayersAtSquare(18)}
            </div>
            <div className="bg-pink-200" id="19">
              {renderPlayersAtSquare(19)}
            </div>
            <div className="bg-blue-200" id="20">
              {renderPlayersAtSquare(20)}
            </div>
            <div className=""></div>
            <div className="bg-blue-200" id="26">
              {renderPlayersAtSquare(26)}
            </div>

            {/* 4行目 */}
            <div className="bg-blue-200" id="50">
              {renderPlayersAtSquare(50)}
            </div>
            <div className="bg-pink-200" id="51">
              {renderPlayersAtSquare(51)}
            </div>
            <div className="bg-yellow-200" id="55">
              {renderPlayersAtSquare(55)}
              <span>出産</span>
            </div>
            <div className="bg-blue-200" id="54">
              {renderPlayersAtSquare(54)}
            </div>
            <div className="bg-pink-200" id="53">
              {renderPlayersAtSquare(53)}
            </div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className="bg-blue-200" id="17">
              {renderPlayersAtSquare(17)}
            </div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className="bg-blue-200" id="25">
              {renderPlayersAtSquare(25)}
            </div>

            {/* 5行目 */}
            <div className=""></div>
            <div className=""></div>
            <div className="bg-pink-200" id="56">
              {renderPlayersAtSquare(56)}
            </div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className="bg-blue-200" id="16">
              {renderPlayersAtSquare(16)}
            </div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className="bg-pink-200" id="24">
              {renderPlayersAtSquare(24)}
            </div>

            {/* 6行目 */}
            <div className="bg-blue-200" id="59">
              {renderPlayersAtSquare(59)}
            </div>
            <div className="bg-blue-200" id="58">
              {renderPlayersAtSquare(58)}
            </div>
            <div className="bg-yellow-200" id="57">
              {renderPlayersAtSquare(57)}
              <span>転職</span>
            </div>
            <div className="bg-blue-200" id="67">
              {renderPlayersAtSquare(67)}
            </div>
            <div className="bg-blue-200" id="68">
              {renderPlayersAtSquare(68)}
            </div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className="bg-pink-200" id="15">
              {renderPlayersAtSquare(15)}
            </div>
            <div className="bg-blue-200" id="14">
              {renderPlayersAtSquare(14)}
            </div>
            <div className="bg-yellow-200" id="13">
              {renderPlayersAtSquare(13)}
              <span>結婚1</span>
            </div>
            <div className="bg-blue-200" id="22">
              {renderPlayersAtSquare(22)}
            </div>
            <div className="bg-blue-200" id="23">
              {renderPlayersAtSquare(23)}
            </div>
            {/* 7行目 */}
            <div className="bg-blue-200" id="60">
              {renderPlayersAtSquare(60)}
            </div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className="bg-pink-200" id="69">
              {renderPlayersAtSquare(69)}
            </div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className="bg-blue-200" id="12">
              {renderPlayersAtSquare(12)}
            </div>
            <div className=""></div>
            <div className=""></div>

            {/* 8行目 */}
            <div className="bg-blue-200" id="61">
              {renderPlayersAtSquare(61)}
            </div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className="bg-blue-200" id="70">
              id
              {renderPlayersAtSquare(70)}
            </div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className="bg-pink-200" id="11">
              {renderPlayersAtSquare(11)}
            </div>
            <div className="bg-blue-200" id="10">
              {renderPlayersAtSquare(10)}
            </div>
            <div className="bg-blue-200" id="9">
              {renderPlayersAtSquare(9)}
            </div>

            {/* 9行目 */}
            <div className="bg-pink-200" id="62">
              {renderPlayersAtSquare(62)}
            </div>
            <div className=""></div>
            <div className="bg-blue-200" id="65">
              {renderPlayersAtSquare(65)}
            </div>
            <div className="bg-pink-200" id="66">
              {renderPlayersAtSquare(66)}
            </div>
            <div className="bg-yellow-200" id="71">
              {renderPlayersAtSquare(71)}
              <span>家買う</span>
            </div>
            <div className=""></div>
            <div className="bg-green-200" id="75">
              {renderPlayersAtSquare(75)}
              <span>ゴール</span>
            </div>
            <div className=""></div>
            <div className=""></div>
            <div className="bg-green-200" id="0">
              {renderPlayersAtSquare(0)}
              <span>スタート</span>
            </div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className="bg-pink-200" id="8">
              {renderPlayersAtSquare(8)}
            </div>

            {/* 10行目 */}
            <div className="bg-blue-200" id="63">
              {renderPlayersAtSquare(63)}
            </div>
            <div className="bg-pink-200" id="53">
              {renderPlayersAtSquare(53)}
            </div>
            <div className="bg-blue-200" id="64">
              {renderPlayersAtSquare(64)}
            </div>
            <div className=""></div>
            <div className="bg-blue-200" id="72">
              {renderPlayersAtSquare(72)}
            </div>
            <div className="bg-pink-200" id="73">
              {renderPlayersAtSquare(73)}
            </div>
            <div className="bg-blue-200" id="74">
              {renderPlayersAtSquare(74)}
            </div>
            <div className=""></div>
            <div className=""></div>
            <div className="bg-blue-200" id="1">
              {renderPlayersAtSquare(1)}
            </div>
            <div className="bg-blue-200" id="2">
              {renderPlayersAtSquare(2)}
            </div>
            <div className="bg-pink-200" id="3">
              {renderPlayersAtSquare(3)}
            </div>
            <div className="bg-blue-200" id="4">
              {renderPlayersAtSquare(4)}
            </div>
            <div className="bg-pink-200" id="5">
              {renderPlayersAtSquare(5)}
            </div>
            <div className="bg-blue-200" id="6">
              {renderPlayersAtSquare(6)}
            </div>
            <div className="bg-blue-200" id="7">
              {renderPlayersAtSquare(7)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OshiTable;
