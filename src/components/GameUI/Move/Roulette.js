import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

const RouletteApp = ({ onStopSpinning }) => {
  const data = [
    { option: "1" },
    { option: "2" },
    { option: "3" },
    { option: "4" },
    { option: "5" },
    { option: "6" },
    { option: "7" },
    { option: "8" },
    { option: "9" },
    { option: "10" },
  ];

  const [prizeNumber, setPrizeNumber] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setSpinning(true);
  };

  const handleSpinStop = () => {
    setSpinning(false);
    onStopSpinning(data[prizeNumber].option);
    setModalIsOpen(true);
  };

  return (
    <div>
      <Wheel
        mustStartSpinning={spinning}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={["#FF90BC", "#95DCE7"]}
        textColors={["#ffffff"]}
        onStopSpinning={handleSpinStop}
      />
      <button className="kaiten" onClick={handleSpinClick}>
        ルーレットを回す
      </button>
    </div>
  );
};

export default RouletteApp;
