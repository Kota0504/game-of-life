import React, { useEffect } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const RankingModal = ({ players, isOpen }) => {
  const navigate = useNavigate();
  const sortedPlayers = players.slice().sort((a, b) => b.money - a.money); // 金額順にソート

  // 30秒後に初期画面にリダイレクト
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, navigate]);

  return (
    <Modal isOpen={isOpen}>
      <h2>順位発表</h2>
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
