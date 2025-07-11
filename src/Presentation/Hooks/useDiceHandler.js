import { useState } from "react";
import Die from "../../Domain/Objects/Die";

export function useDiceHandler() {
  const [dice, setDice] = useState([new Die(20)]);
  const [isRolling, setIsRolling] = useState(false);

  const handleAddDie = (dieType) => {
    const newDie = new Die(dieType);
    console.log("Adding d" + dieType);
    setDice([...dice, newDie]);
  };
  const handleRemoveDie = (index) => {
    const newDieArray = [...dice];
    newDieArray.splice(index, 1);
    setDice(newDieArray);
  };

  const handleRollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    const updatedDice = dice.map((die) => {
      const clonedDie = Object.assign(
        Object.create(Object.getPrototypeOf(die)),
        die
      );
      clonedDie.roll();
      return clonedDie;
    });
    setDice(updatedDice);
    setIsRolling(false);
  };

  const handleResetDice = () => {
    setDice([]);
  };

  return {
    dice,
    isRolling,
    setIsRolling,
    handleAddDie,
    handleRemoveDie,
    handleRollDice,
    handleResetDice,
  };
}
