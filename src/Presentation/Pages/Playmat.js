import { useContext } from "react";

import playmat from "./SpiritTray.png";
import playmatrotated from "./SpiritTrayRotated.png";
import { DieContext } from "../Context/DieContext";
import { DieSkinContext } from "../Context/DieSkinContext";
import DieComponent from "../Components/DieComponent";

import "./Revamped.css";

function Playmat() {
  const { dice, handleAddDie, handleRemoveDie, handleRollDice } =
    useContext(DieContext);
  const { dieSkin } = useContext(DieSkinContext);

  return (
    <>
    <div className="hidden md:flex flex-row w-full h-24 border-2 border-green-500 justify-center items-center">
        <div className="flex flex-row">
          {dice.map((die, index) => {
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
    <div className="flex flex-row w-full h-auto border-2 border-blue-500 justify-center items-center">
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
      <div className="hidden md:flex border-2 border-blue-500">
        <div className="flex flex-row rotate-90">
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
        <div>
          <img src={playmat} alt="PlayMat" className="w-full h-full object-cover" />
          
          <button
          className="absolute right-20 bg-[#05a895] p-4 rounded-md"
          onClick={() => {
            handleRollDice();
          }}
        >
          Roll Dice
        </button>
        </div>
      </div>

      <div className="flex flex-row md:hidden">
        <img src={playmatrotated} alt="PlayMat Rotated" className="w-[400px] h-auto p-3" />
      </div>

      {/* <button className='absolute bottom-4 right-4 bg-[#05a895] hover:bg-[#048579] text-white font-bold py-2 px-6 rounded-[25px] shadow-lg transition duration-200"'>
                <img width={100} height={100} src={roll} alt='ROLL!'/>
            </button> */}
    </div>
    </>
  );
}

export default Playmat;
