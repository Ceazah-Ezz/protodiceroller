import {
  useState,
  useEffect,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";

const DieComponent = forwardRef(function DieComponent(
  { die, dieSkin, onRemove = () => {}, dieType, onAdd = () => {} },
  ref
) {
  const [currentDieFace, setDieFace] = useState(null);
  const [isRolling, setIsRolling] = useState(false);

  let renderDieType = dieType !== undefined ? dieType : die.getFaceCount();

  const dieAssets = useMemo(() => {
    switch (renderDieType) {
      case 4:
        return dieSkin.getD4Assets();
      case 6:
        return dieSkin.getD6Assets();
      case 8:
        return dieSkin.getD8Assets();
      case 12:
        return dieSkin.getD12Assets();
      case 20:
        return dieSkin.getD20Assets();
      case 100:
        return dieSkin.getD100Assets();
      default:
        return dieSkin.getD20Assets();
    }
  }, [renderDieType, dieSkin]);

  useEffect(() => {
    setDieFace(dieAssets[0]);
  }, [dieAssets, renderDieType]);

  const rollDie = () => {
    if (isRolling) return;
    setIsRolling(true);
    let faceImgs = dieAssets.slice(0, -3);
    let cornerImgs = dieAssets.slice(-3);
    let counter = 0;

    const rollInterval = setInterval(() => {
      if (counter % 2 === 0) {
        setDieFace(cornerImgs[Math.floor(Math.random() * 3)]);
      } else {
        if (renderDieType === 100) {
          setDieFace(faceImgs[Math.floor(Math.random() * renderDieType) % 10]);
        } else {
          setDieFace(faceImgs[Math.floor(Math.random() * renderDieType)]);
        }
      }
      counter++;
      if (counter >= 16) {
        clearInterval(rollInterval);
        setIsRolling(false);
        setDieFace(faceImgs[die.getDieValue()]);
      }
    }, 200);
  };

  const handleClick = () => {
    if (dieType !== undefined) {
      onAdd();
    } else {
      onRemove();
    }
  };

  useImperativeHandle(ref, () => ({
    rollDie,
  }));

  return (
    <img
      className="relative w-12 h-12 cursor-pointer"
      src={currentDieFace}
      alt={`D${dieType}`}
      onClick={() => {
        handleClick();
      }}
    />
  );
});

export default DieComponent;
