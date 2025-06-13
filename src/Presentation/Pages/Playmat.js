import { useContext } from "react";

import playmat from "./SpiritTray.png";
import { DieContext } from "../Context/DieContext";
import { DieSkinContext } from "../Context/DieSkinContext";
import Die from "../../Application/Objects/Die";
import DieComponent from "../Components/DieComponent";

import "./Revamped.css";

function Playmat() {
  const { die, setDie } = useContext(DieContext);
  const { dieSkin } = useContext(DieSkinContext);

  const handleAddDie = (dieType) => {
    const newDie = new Die(dieType);
    setDie([...die, newDie]);
  };

  const handleRemoveDie = (dieIndex) => {
    const newDieArray = [...die];
    newDieArray.splice(dieIndex, 1);
    setDie(newDieArray);
  };

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
      <div>
        <div className="flex flex-row">
          <DieComponent
            dieSkin={dieSkin}
            dieType={4}
            onAdd={() => {
              handleAddDie(4);
            }}
          />
          <DieComponent
            dieSkin={dieSkin}
            dieType={6}
            onAdd={() => {
              handleAddDie(6);
            }}
          />
          <DieComponent
            dieSkin={dieSkin}
            dieType={8}
            onAdd={() => {
              handleAddDie(8);
            }}
          />
          <DieComponent
            dieSkin={dieSkin}
            dieType={12}
            onAdd={() => {
              handleAddDie(12);
            }}
          />
          <DieComponent
            dieSkin={dieSkin}
            dieType={20}
            onAdd={() => {
              handleAddDie(20);
            }}
          />
          <DieComponent
            dieSkin={dieSkin}
            dieType={100}
            onAdd={() => {
              handleAddDie(100);
            }}
          />
        </div>

        <img src={playmat} alt="PlayMat" className="w-full" />
        <div className="flex flex-row">
          {die.map((die, index) => {
            return (
              <DieComponent
                key={index}
                die={die}
                dieSkin={dieSkin}
                onRemove={() => {
                  handleRemoveDie(index);
                }}
              />
            );
          })}
        </div>
      </div>

      {/* <button className='absolute bottom-4 right-4 bg-[#05a895] hover:bg-[#048579] text-white font-bold py-2 px-6 rounded-[25px] shadow-lg transition duration-200"'>
                <img width={100} height={100} src={roll} alt='ROLL!'/>
            </button> */}
    </div>
  );
}

export default Playmat;
