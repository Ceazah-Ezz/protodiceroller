import { useState } from "react";
import Die from "../../Application/Objects/Die";

export default function DieComponent() {
  const [skin, setSkin] = useState();
  const [dieObj, setDieObj] = useState(new Die(skin, 4));

  const handleRoll = () => {
    let counter = 0;

    const rollInterval = setInterval(() => {
      dieObj.roll();
      if (counter % 2 === 0) {
        dieObj.setCurrentFaceImg(dieObj.getDieCornerImg());
      } else {
        dieObj.setCurrentFaceImg(
          dieObj.getDieFacesImgs()[dieObj.getDieValue()]
        );
      }
      counter++;
      const clonedDie = Object.assign(
        Object.create(Object.getPrototypeOf(dieObj)),
        dieObj
      );
      setDieObj(clonedDie);
      if (counter >= 8) {
        clearInterval(rollInterval);
      }
    }, 100);
  };
  return (
    <>
      <img
        src={dieObj.getCurrentFaceImg()}
        onClick={handleRoll}
        alt="D4_Face"
      ></img>
    </>
  );
}
