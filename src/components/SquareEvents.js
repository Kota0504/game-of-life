export const handleSquareEvent = (
  players,
  player,
  color,
  setPlayers,
  modalManagerRef
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
          // イエローマス: その他イベント発生
          message = "イベント発生！";
          break;
        default:
          // その他の色（または色なし）のマス
          message = "何も起こりませんでした";
      }

      // 新しいプレイヤーオブジェクトを返す
      return { ...p, money: updatedMoney };
    } else {
      // 他のプレイヤーはそのまま返す
      return p;
    }
  });

  setPlayers(updatedPlayers);
  modalManagerRef.current.queueModal(`${player.name}: ${message}`, 3000);
  // setTimeout(() => advanceTurn(), 3000); // 次のターンに進むためのタイマー
};

export const handleSquareLanding = (
  players,
  playerId,
  setPlayers,
  modalManagerRef
) => {
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