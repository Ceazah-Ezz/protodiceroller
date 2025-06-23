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

        <Playmat />

        {showModal && <HowTo onExit={() => setShowModal(false)} />}
      </div>
    </div>
  );
}

export default Revamped;
