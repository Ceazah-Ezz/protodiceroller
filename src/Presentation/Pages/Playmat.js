import { useContext, useRef, useState } from "react";
import { DieContext } from "../Context/DieContext";
import { DieSkinContext } from "../Context/DieSkinContext";
import DieComponent from "../Components/DieComponent";
import cycle from "../../Assets/cycle-svgrepo-com.svg";
import "./Revamped.css";
import playmat from "../../Assets/SpiritTray.png";
import playmatrotated from "../../Assets/SpiritTrayRotated.png";
import d20 from "../../Assets/d20.svg";
import SkinSelection from "./SkinSelection";

function Playmat() {
  const [showSkins, setShowSkins] = useState(false);
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

  const toggleSkins = () => {
    setShowSkins((prev) => !prev);
  };

  return (
    <>
      <div className="flex flex-row w-full h-fit justify-center items-center">
        {/* Playmat Image */}
        <div
          className="hidden md:grid grid-cols-9 bg-contain bg-center w-full h-[725px] bg-no-repeat "
          style={{ backgroundImage: `url(${playmat})` }}
        >
          <div className="flex-col col-span-2 p-3">
            <div className="rounded-md bg-[#c23838] w-full h-full text-white p-2">
              HISTORY
            </div>
          </div>
          <div className="flex flex-col col-span-1 p-5 items-center place-content-center place-items-center">
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
          <div className="flex-col col-span-3 break-all overflow-hidden  py-32 px-20">
            <div className="flex flex-wrap w-auto h-auto">
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
          <div className="flex-col col-span-1 "></div>

          {/* <img src={playmat} alt="PlayMat" className="w-full h-full" /> */}
        </div>

        <div className="flex flex-row md:hidden">
          <img
            src={playmatrotated}
            alt="PlayMat Rotated"
            className="w-[400px] h-auto p-3"
          />
        </div>
      </div>
      <div className="hidden md:flex flex-row w-full justify-end py-2 px-4 items-center">
        {showSkins && <SkinSelection />}
        <button
          className="bg-[#c23838] p-2 m-2 rounded-md h-fit"
          onClick={toggleSkins}
        >
          <img width={25} height={25} src={cycle} alt="Change Skin" />
        </button>
        <button
          className="bg-[#c23838] p-7 rounded-md text-white"
          onClick={rollAllDice}
        >
          <img width={40} height={40} src={d20} alt="Roll Dice" />
        </button>
      </div>
    </>
  );
}

export default Playmat;
