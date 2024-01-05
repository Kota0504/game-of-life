import React, { useEffect } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const RankingModal = ({ players, isOpen, setShowRankingModal }) => {
  const navigate = useNavigate();
  const sortedPlayers = players.slice().sort((a, b) => b.money - a.money); // 金額順にソート

  useEffect(() => {
    if (isOpen) {
      // 3秒後に結果発表モーダルを表示し、さらに10秒後に初期画面にリダイレクト
      setTimeout(() => {
        setShowRankingModal(false); // 結果発表モーダルを閉じる
        navigate("/"); // 初期画面にリダイレクト
      }, 10000); // 10秒後
    }
  }, [isOpen, navigate, setShowRankingModal]);

  return (
    <Modal isOpen={isOpen}>
      <h2>結果発表</h2>
      <ol>
        {sortedPlayers.map((player, index) => (
          <li key={player.id}>
            {index + 1}位: {player.name} {player.money}円
          </li>
        ))}
      </ol>
    </Modal>
  );
};

export default RankingModal;
