import { useState } from "react";
import { DieContext } from "./DieContext";
import Die from "../../Application/Objects/Die";
import "../Pages/Revamped.css";

export default function DieProvider({ children }) {
  const [dice, setDice] = useState([new Die(20)]);
  const [isRolling, setIsRolling] = useState(false);

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
    setIsRolling(true);
    let counter = 0;

    const rollInterval = setInterval(() => {
      const updatedDice = dice.map((die) => {
        die.roll();
        // if (counter % 2 === 0) {
        //   die.setCurrentFaceImg(die.getDieCornerImgs()[die.getDieValue() % 3]);
        // } else {
        //   die.setCurrentFaceImg(die.getDieFacesImgs()[die.getDieValue()]);
        // }
        const clonedDie = Object.assign(
          Object.create(Object.getPrototypeOf(die)),
          die
        );
        return clonedDie;
      });
      counter++;
      setDice(updatedDice);
      if (counter >= 8) {
        clearInterval(rollInterval);
      }
    }, 100);
    setIsRolling(false);
  };
  if (!isRolling) {
    console.log(
      dice.map((die) => {
        return die.getDieValue();
      })
    );
  }
  return (
    <DieContext.Provider
      value={{
        dice,
        isRolling,
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
