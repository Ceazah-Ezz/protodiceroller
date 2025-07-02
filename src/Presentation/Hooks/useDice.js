import { useContext, useRef, useState } from "react";
import { DieContext } from "../Context/DieContext";
import { DieSkinContext } from "../Context/DieSkinContext";

function useDice() {
  const { dice, handleAddDie, handleRemoveDie, handleRollDice } =
    useContext(DieContext);
  const { dieSkin, setDieSkin, getDieAssets } = useContext(DieSkinContext);
  const dieRollRef = useRef([]);
  const [isRolling, setIsRolling] = useState(false);

  const rollAllDice = () => {
    dieRollRef.current.forEach((ref) => {
      ref?.rollDie();
    });
    handleRollDice();
  };

  return {
    dice,
    handleAddDie,
    handleRemoveDie,
    dieRollRef,
    rollAllDice,
  };
}
