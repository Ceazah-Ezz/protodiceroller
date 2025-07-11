import { useState, useContext, useEffect } from "react";
import { DieContext } from "../Context/DieContext";
import { DieSkinContext } from "../Context/DieSkinContext";

export function useDiceRenderer() {
  const { getDieAssets } = useContext(DieSkinContext);
  const { dice, handleRollDice, isRolling, setIsRolling } =
    useContext(DieContext);

  const [currentDieFaces, setCurrentDieFaces] = useState([]);

  useEffect(() => {
    const updatedFaces = dice.map((die) => {
      const dieType = die.getDieType();
      const dieAssets = getDieAssets(dieType);
      const faceImgs = dieAssets.slice(0, -3);
      const face = faceImgs[die.getDieValue()];
      return [face, dieType];
    });
    setCurrentDieFaces(updatedFaces);
  }, [dice, getDieAssets]);

  const updateDieFaces = () => {
    const collectDieFaces = dice.map((die) => {
      let dieType = die.getDieType();
      let dieAssets = getDieAssets(die.getDieType());
      let faceImgs = dieAssets.slice(0, -3);
      let face = faceImgs[die.getDieValue()];
      return [face, dieType];
    });
    setCurrentDieFaces(collectDieFaces);
    console.log(dice);
  };

  const triggerDiceRolls = () => {
    if (isRolling) return;
    setIsRolling(true);
    const diceWithSkins = dice.map((die) => {
      let dieType = die.getDieType();
      let dieAssets = getDieAssets(dieType);
      let faceImgs = dieAssets.slice(0, -3);
      let cornerImgs = dieAssets.slice(-3);
      return [dieType, faceImgs, cornerImgs];
    });

    let counter = 0;
    const rollInterval = setInterval(() => {
      const rollingDieFrames = diceWithSkins.map(
        ([dieType, faceImgs, cornerImgs]) => {
          const randomCorner = () =>
            cornerImgs[Math.floor(Math.random() * cornerImgs.length)];
          const randomFace = () => {
            const rollIndex = Math.floor(Math.random() * dieType);
            return dieType === 100
              ? faceImgs[rollIndex % 10]
              : faceImgs[rollIndex];
          };
          let rolledDieFrame =
            counter % 2 === 0 ? randomCorner() : randomFace();
          return [rolledDieFrame, dieType];
        }
      );
      setCurrentDieFaces([...rollingDieFrames]);
      counter++;
      console.log(counter);
      console.log(rollingDieFrames);
      if (counter >= 16) {
        clearInterval(rollInterval);
        handleRollDice();
        updateDieFaces();
        setIsRolling(false);
      }
    }, 200);
  };

  return {
    currentDieFaces,
    updateDieFaces,
    triggerDiceRolls,
  };
}
