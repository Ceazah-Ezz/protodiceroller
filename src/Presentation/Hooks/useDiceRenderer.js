import { useMemo, useState } from "react";
import { useDiceHandler } from "./useDiceHandler";
import { useDieSkinHandler } from "./useDieSkinHandler";

export function useDiceRenderer() {
  const { getDieAssets } = useDieSkinHandler();
  const { dice, handleRollDice } = useDiceHandler();

  const [currentDieFaces, setCurrentDieFaces] = useState(
    useMemo(() => {
      return dice.map((die) => {
        let dieType = die.getDieType();
        let dieAssets = getDieAssets(die.getDieType());
        let faceImgs = dieAssets.slice(0, -3);
        let face = faceImgs[die.getDieValue()];
        return [face, dieType];
      });
    }, [dice, getDieAssets])
  );

  const updateDieFaces = () => {
    const collectDieFaces = () => {
      dice.map((die) => {
        let dieType = die.getDieType();
        let dieAssets = getDieAssets(die.getDieType());
        let faceImgs = dieAssets.slice(0, -3);
        let face = faceImgs[die.getDieValue()];
        return [face, dieType];
      });
    };
    setCurrentDieFaces(collectDieFaces);
  };

  const triggerDiceRolls = () => {
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
          counter++;
          return [rolledDieFrame, dieType];
        }
      );
      setCurrentDieFaces(rollingDieFrames);
      if (counter >= 16) {
        clearInterval(rollInterval);
        handleRollDice();
        updateDieFaces();
      }
    }, 200);
  };

  return {
    currentDieFaces,
    updateDieFaces,
    triggerDiceRolls,
  };
}
