import {
  useState,
  useEffect,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useContext,
} from "react";
import { DieSkinContext } from "../Context/DieSkinContext";

const DieComponent = forwardRef(function DieComponent(
  { die, dieType, onRemove = () => {}, onAdd = () => {} },
  ref
) {
  const { getDieAssets } = useContext(DieSkinContext);

  const isStatic = dieType !== undefined;
  let renderDieType = die ? die.getFaceCount() : dieType;

  const dieAssets = useMemo(() => {
    return getDieAssets(dieType);
  }, [dieType, getDieAssets]);

  const [currentDieFace, setCurrentDieFace] = useState(() => dieAssets?.[0]);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    if (dieAssets?.length) {
      setCurrentDieFace(dieAssets[0]);
    }
  }, [dieAssets]);

  const rollDie = () => {
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

  const handleClick = () => {
    isStatic ? onAdd() : onRemove();
  };

  useImperativeHandle(ref, () => ({
    rollDie,
  }));

  return (
    <img
      className="relative w-12 h-12 cursor-pointer"
      src={currentDieFace}
      alt={`D${renderDieType}`}
      onClick={() => {
        handleClick();
      }}
    />
  );
});

export default DieComponent;
