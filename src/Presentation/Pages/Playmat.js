import { useContext } from "react";

import playmat from "./SpiritTray.png";
import { DieContext } from "../Context/DieContext";
import { DieSkinContext } from "../Context/DieSkinContext";
import "./Revamped.css";

function Playmat() {
  // const handleAddDie = (dieType) => {
  //   setDice(dice.push(new Die(dieType)));
  // };
  // const removeDie = (id) => {
  //   setDice(dice.splice(id));
  // };
  const { die } = useContext(DieContext);
  const { dieSkin } = useContext(DieSkinContext);

  return (
    <div className="flex flex-row w-full h-5/6 border-2 border-red-500 justify-center items-center">
      {/* Scroll Arrows Container */}
      {/* <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col justify-between items-center h-[680px] w-[408px] z-10">
                <button>
                <img src={scrollUp} alt="Scroll Up" className="w-6 h-6" />
                </button>

                <button>
                <img src={scrollDown} alt="Scroll Down" className="w-6 h-6" />
                </button>
            </div> */}

      {/* Playmat Image */}

      <img
        width={1920}
        height={1080}
        src={playmat}
        alt="PlayMat"
        className=""
      />

      {die.map((die, index) => {
        let dieAssets = [];
        let dieAssetIndex = die.getDieValue() - 1;
        switch (die.getFaceCount()) {
          case 4:
            dieAssets = dieSkin.getD4Assets();
            break;
          case 6:
            dieAssets = dieSkin.getD6Assets();
            break;
          case 8:
            dieAssets = dieSkin.getD8Assets();
            break;
          case 12:
            dieAssets = dieSkin.getD12Assets();
            break;
          case 20:
            dieAssets.push(...dieSkin.getD20Assets());
            break;
          case 100:
            dieAssets = dieSkin.getD100Assets();
            break;
          default:
            dieAssets = dieSkin.getD20Assets();
            break;
        }

        console.log(dieAssets);

        return (
          <div
            key={index}
            className="w-[200px] h-[200px] flex items-center justify-center"
          >
            <img
              className="w-[200px] h-[200px] object-contain"
              src={dieAssets[dieAssetIndex]}
              alt={`D${die.getFaceCount()}`}
            />
          </div>
        );
      })}

      {/* <button className='absolute bottom-4 right-4 bg-[#05a895] hover:bg-[#048579] text-white font-bold py-2 px-6 rounded-[25px] shadow-lg transition duration-200"'>
                <img width={100} height={100} src={roll} alt='ROLL!'/>
            </button> */}
    </div>
  );
}

export default Playmat;
