import { useContext, useState } from "react";
import Die from "../../Application/Objects/Die";
import DieSkin from "../../Application/Objects/DieSkin";
import { DieSkinContext } from "../Context/DieSkinContext";

export default function DieComponent(dieType = 20) {
  const skin = useContext(DieSkinContext).skin;
  const [dieObj, setDieObj] = useState(
    () => new Die(skin != null ? skin : new DieSkin(), dieType)
  );

  const handleRoll = () => {
    let counter = 0;

    const rollInterval = setInterval(() => {
      dieObj.roll();
      if (counter % 2 === 0) {
        dieObj.setCurrentFaceImg(
          dieObj.getDieCornerImgs()[dieObj.getDieValue() % 3]
        );
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
