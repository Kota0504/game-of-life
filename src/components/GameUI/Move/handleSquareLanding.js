// 必要に応じて他のインポートを追加
import { handleSquareEvent } from "./handleSquareEvents";

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
  handleSquareEvent(players, player, color, setPlayers, modalManagerRef);
};
