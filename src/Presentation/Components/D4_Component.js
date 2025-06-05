import { useState } from "react";
import Base_D4 from "../../Assets/DiceImg/Base_d4";

export default function D4Component() {
  const [skins, setSkin] = useState();
  const [d4Obj, setD4Obj] = useState(new Base_D4(skins));
  const handleRoll = () => {
    let counter = 0;

    const rollInterval = setInterval(() => {
      console.log("Counter = " + counter);
      d4Obj.roll();
      if (counter % 2 === 0) {
        d4Obj.setCurrentFaceImg(d4Obj.getDieCornerImg());
      } else {
        d4Obj.setCurrentFaceImg(d4Obj.getDieFacesImgs()[d4Obj.getDieValue()]);
      }
      counter++;
      const clonedDie = Object.assign(
        Object.create(Object.getPrototypeOf(d4Obj)),
        d4Obj
      );
      setD4Obj(clonedDie);
      if (counter >= 8) {
        clearInterval(rollInterval);
      }
    }, 100);
  };
  return (
    <>
      <img src={d4Obj.getCurrentFaceImg()} alt="D4_Face"></img>
      <h1 className="text-white">
        {" "}
        Current Die Value: {d4Obj.getDieValue() + 1}{" "}
      </h1>
      <button className="bg-white border-1 border-black" onClick={handleRoll}>
        Roll Die
      </button>
    </>
  );
}
