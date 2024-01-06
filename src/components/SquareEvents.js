import Dialog_AllGoal from "./Dialog_AllGoal";
import Dialog_EachGoal from "./Dialog_EachGoal";

export const handleSquareEvent = (
  players,
  player,
  color,
  setPlayers,
  modalManagerRef,
  advanceTurn,
  allFinished,
  handleMarriageEvent
) => {
  let message = "";
  let updatedPlayers = players.map((p) => {
    if (p.id === player.id) {
      // プレイヤーの所持金を一時変数に格納
      let updatedMoney = p.money;

      // マスの色に応じたイベント処理
      switch (color) {
        case "blue":
          updatedMoney += 10000; // 青マス: 10000円獲得
          message = "10000円獲得しました";
          break;
        case "pink":
          updatedMoney -= 5000; // ピンクマス: 5000円失う
          message = "5000円失いました";
          break;
        case "yellow":
          handleMarriageEvent();
          // message = "幼馴染が現れた！！！結婚する？";
          break;
        case "green":
          // グリーンマス: ゴール
          message = "testです";
          break;
        default:
          // その他の色（または色なし）のマス
          message = "なにもありません";
      }

      // 新しいプレイヤーオブジェクトを返す
      return { ...p, money: updatedMoney };
    } else {
      // 他のプレイヤーはそのまま返す
      return p;
    }
  });

  // プレイヤーのステータスを更新する関数
  setPlayers(updatedPlayers);
  const rankedPlayers = updatePlayerRanks(updatedPlayers); // ランク付けされたプレイヤーを取得
  setPlayers(rankedPlayers); // ステートを一回で更新
  if (allFinished) {
    console.log("全員ゴール!");
    // 全員がゴールした場合はDialog_AllGoalを表示
    modalManagerRef.current.queueModal(<Dialog_AllGoal />, 3000);
  } else {
    console.log("一人ゴール/ゴール者0人!");
    modalManagerRef.current.queueModal(`${player.name}: ${message}`, 3000);
    // 全員がゴールしていない場合のみ次のターンに進む\
    setTimeout(() => advanceTurn(), 3000); // 次のターンに進む
    if (players.isFinished === true) {
      modalManagerRef.current.queueModal(<Dialog_EachGoal />, 3000);
    }
  }
};

const updatePlayerRanks = (updatedPlayers) => {
  if (!Array.isArray(updatedPlayers)) {
    console.error("updatedPlayers is not an array:", updatedPlayers);
    return []; // エラーの場合は空の配列を返す
  }

  const sortedPlayers = [...updatedPlayers].sort((a, b) => b.money - a.money);
  return sortedPlayers.map((player, index) => ({
    ...player,
    rank: index + 1,
  }));
};

export const handleSquareLanding = (
  players,
  playerId,
  setPlayers,
  modalManagerRef
) => {
  // playersが配列であることを確認する。
  if (!Array.isArray(players)) {
    console.error("Error: players should be an array", players);
    return; // playersが配列でなければ、エラーメッセージを出力して早期に関数から抜ける。
  }
  const player = players.find((p) => p.id === playerId);
  if (!player) return; // プレイヤーが見つからなければ何もしない

  const squareElement = document.getElementById(player.position.toString());
  if (!squareElement) return; // マス目が存在しなければ何もしない

  // classNameから色を抽出する
  const colorClass = squareElement.className.match(/bg-[a-z]+-200/);
  if (!colorClass) return; // 色のクラスが見つからなければ何もしない
  const color = colorClass[0].split("-")[1]; // "bg-blue-200" -> "blue"
  handleSquareEvent(players, player, color, setPlayers, modalManagerRef); // 親コンポーネントのイベントハンドラを呼び出し
};
