import { useState } from "react";
import HowTo from "./HowTo";
import Buttons from "./Buttons";
import History from "./History";
import Playmat from "./Playmat";
import "./Revamped.css";

function Revamped() {
  // Temporary file to not interfere with the current app
  // Will turn some into components once they're okay
  // Will re-organize assets into separate folder
  // To-Do:
  // Not yet responsive
  // Dice options
  // Dice options functionality - Rikku?
  // Roll button and Arrow button - DONE
  // Roll and Arrow button Sizing
  // Have yet to get assets - in Gdrive
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex bg-[#0e102c] h-screen">
      {/* <div className="hidden md:flex flex-col w-2/5 h-screen px-6 py-8 border-2 border-red-500">
        <HowTo />
        
        <History />
      </div> */}

      <div className="flex-col w-full h-full ">
        {/* Title */}
        <div className="hidden md:grid grid-cols-3 h-auto items-center justify-between p-2">
          <div></div>
          <div className="flex justify-center">
          <h1 className="text-white text-8xl font-bold ">DICE ROLLER</h1>
          </div>
          <div className="flex justify-end items-center">
            <Buttons onInfoClick={() => setShowModal(true)} />
          </div>
        </div>

        {/* Playmat */}
        <div className="flex flex-row w-full h-auto border-2 border-green-500 md:hidden">
          <div className="flex-col w-1/2 h-auto border-2 border-green-500 md:hidden">
            <p className="text-white"> Title </p>
          </div>
          <div className="flex-col w-1/2 h-auto border-2 border-green-500 md:hidden">
            <p className="text-white"> Buttons </p>
          </div>
        </div>
        <div className="flex-row w-full h-auto border-2 border-green-500 md:hidden">
            <p className="text-white"> History </p>
          </div>
        <Playmat />

        {showModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-500 rounded-xl p-6 max-w-lg w-full relative text-white">
              <h2 className="text-white text-4xl font-bold">HOW TO PLAY</h2>
              <hr></hr>
              <li>Click a dice to add in the PlayMat</li>
              <li>Click the “Roll” button to roll</li>
              <li>Navigate dice options with the arrows</li>
              <li>Click on a dice on the PlayMat to remove them</li>
              <button
                className="absolute top-2 right-4 text-black font-bold"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Revamped;
