import { useState } from "react";
import Die from "../../Domain/Objects/Die";
export function useDiceHandler() {
  const [dice, setDice] = useState([new Die(20)]);

  const handleAddDie = (dieType) => {
    const newDie = new Die(dieType);
    console.log("Adding d" + dieType);
    setDice([...dice, newDie]);
    console.log(dice);
  };
  const handleRemoveDie = (index) => {
    const newDieArray = [...dice];
    newDieArray.splice(index, 1);
    setDice(newDieArray);
  };

  const handleRollDice = () => {
    const updatedDice = dice.map((die) => {
      die.roll();

      const clonedDie = Object.assign(
        Object.create(Object.getPrototypeOf(die)),
        die
      );
      return clonedDie;
    });
    setDice(updatedDice);
  };

  const handleResetDice = () => {
    setDice();
  };

  return {
    dice,
    handleAddDie,
    handleRemoveDie,
    handleRollDice,
    handleResetDice,
  };
}
