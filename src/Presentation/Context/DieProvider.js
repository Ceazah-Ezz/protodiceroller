import { useState } from "react";
import { DieContext } from "./DieContext";
import Die from "../../Application/Objects/Die";
import "../Pages/Revamped.css";

export default function DieProvider({ children }) {
  const [dice, setDice] = useState([new Die(20)]);

  const handleAddDie = (dieType) => {
    const newDie = new Die(dieType);
    setDice([...dice, newDie]);
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

  return (
    <DieContext.Provider
      value={{
        dice,
        setDice,
        handleAddDie,
        handleRemoveDie,
        handleRollDice,
      }}
    >
      {children}
    </DieContext.Provider>
  );
}
