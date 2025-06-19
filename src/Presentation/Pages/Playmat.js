import { useContext, useRef } from "react";

import playmat from "./SpiritTray.png";
import playmatrotated from "./SpiritTrayRotated.png";
import { DieContext } from "../Context/DieContext";
import { DieSkinContext } from "../Context/DieSkinContext";
import DieComponent from "../Components/DieComponent";
import cycle from "./cycle-svgrepo-com.svg";

import "./Revamped.css";

function Playmat() {
  const { dice, handleAddDie, handleRemoveDie, handleRollDice } =
    useContext(DieContext);
  const { dieSkin } = useContext(DieSkinContext);
  const dieRollRef = useRef([]);

  const rollAllDice = () => {
    dieRollRef.current.forEach((ref) => {
      ref?.rollDie();
    });
    handleRollDice();
  };

  return (
    <>
      <div className="flex flex-row w-full h-auto justify-center items-center">
        {/* Playmat Image */}
        <div className="hidden md:flex">
          <div className="absolute flex-row left-[775px] bottom-1/3">
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
          <div className="absolute left-1/2 top-[225px] break-all overflow-hidden">
            <div className="flex flex-wrap w-[600px] h-auto">
              {dice.map((die, index) => {
                return (
                  <DieComponent
                    ref={(ref) => {
                      dieRollRef.current[index] = ref;
                    }}
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
          <img src={playmat} alt="PlayMat" className="w-full h-full" />
        </div>

        <div className="flex flex-row md:hidden">
          <img
            src={playmatrotated}
            alt="PlayMat Rotated"
            className="w-[400px] h-auto p-3"
          />
        </div>
      </div>
      <div className="hidden md:flex flex-row w-full justify-end py-2 px-20">
        <div className=" bg-[#05a895] p-3 rounded-md w-[100px] h-auto "></div>
        <button className="bg-[#05a895] p-2 m-2 rounded-md">
          <img width={25} height={25} src={cycle} />
        </button>
        <button
          className="bg-[#05a895] p-4 rounded-md text-white"
          onClick={rollAllDice}
        >
          ROLL!
        </button>
      </div>
    </>
  );
}

export default Playmat;
