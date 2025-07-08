import { useContext, useMemo, useState, useEffect } from "react";
import { DieSkinContext } from "../Context/DieSkinContext";

export function useDiceRenderer(die, dieType) {
  const { getDieAssets } = useContext(DieSkinContext);

  let renderDieType = die !== undefined ? die.getFaceCount() : dieType;

  const dieAssets = useMemo(() => {
    return getDieAssets(renderDieType);
  }, [renderDieType, getDieAssets]);

  const [currentDieFace, setCurrentDieFace] = useState(() => dieAssets?.[0]);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    if (dieAssets?.length) {
      setCurrentDieFace(dieAssets[0]);
    }
  }, [dieAssets]);

  const rollAnimation = () => {
    if (isRolling || !dieAssets?.length) return;
    setIsRolling(true);
    let faceImgs = dieAssets.slice(0, -3);
    let cornerImgs = dieAssets.slice(-3);
    let counter = 0;

    const rollInterval = setInterval(() => {
      const randomCorner = () =>
        cornerImgs[Math.floor(Math.random() * cornerImgs.length)];
      const randomFace = () => {
        const rollIndex = Math.floor(Math.random() * renderDieType);
        return renderDieType === 100
          ? faceImgs[rollIndex % 10]
          : faceImgs[rollIndex];
      };

      setCurrentDieFace(counter % 2 === 0 ? randomCorner() : randomFace());
      counter++;

      if (counter >= 16) {
        clearInterval(rollInterval);
        setIsRolling(false);
        setCurrentDieFace(faceImgs[die.getDieValue()]);
      }
    }, 200);
  };
}
