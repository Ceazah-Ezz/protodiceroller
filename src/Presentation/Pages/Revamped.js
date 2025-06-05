import "./Revamped.css";
import console from "./console-controller.svg";
import histogram from "./histogram.svg";
import playmat from "./SpiritTray.png";
import D4Component from "../Components/D4_Component";

function Revamped() {
  // Temporary file to not interfere with the current app
  // Will turn some into components once they're okay
  // Will re-organize assets into separate folder
  // To-Do:
  // Not yet responsive
  // Dice options
  // Roll button
  // Have yet to get assets

  return (
    <div className="flex bg-[#011f3f]">
      <div className="flex-col w-2/5 h-screen border-2 border-blue-500 px-3 py-5">
        {/* How To Play */}

        <div className="flex-row border-2 border-red-500">
          <div className="p-3 bg-gray-500 rounded-[20px] text-white">
            <h2>HOW TO PLAY</h2>
            <hr></hr>
            <li>Click a dice to add in the PlayMat</li>
            <li>Click the “Roll” button to roll</li>
            <li>Navigate dice options with the arrows</li>
            <li>Click on a dice on the PlayMat to remove them</li>
          </div>
        </div>
        {/* Buttons */}

        <div className="flex flex-row border-2 border-red-500 space-x-10 p-16">
          <button className="flex-col w-fit h-auto bg-[#05a895] p-3 rounded-[25px]">
            <img width={200} height={200} src={console} alt="Console Icon" />
          </button>
          <button className="flex-col w-fit h-auto bg-[#05a895] p-3 rounded-[25px]">
            <img
              width={200}
              height={200}
              src={histogram}
              alt="Histogram Icon"
            />
          </button>
        </div>
        {/* Games/History */}

        <div className="flex-row border-2 border-red-500">
          <div className="flex p-2 w-full h-80 bg-[#05a895] rounded-[25px] justify-center items-center">
            <p className="text-white">GAMES/HISTORY</p>
          </div>
        </div>
      </div>

      <div className="flex-col w-full h-screen border-2 border-blue-500">
        {/* Title */}
        <div className="flex flex-row h-1/6 border-2 border-red-500 justify-center items-center">
          <h1 className="text-white text-8xl font-bold">DICE ROLLER</h1>
        </div>

        {/* Playmat */}
        <div className="flex flex-row h-5/6 border-2 border-red-500 justify-center items-center">
          {/* <div className='flex-col border-2 border-green-500'>
                            <p>DICES</p>
                        </div>
                        <div className='flex-col border-2 border-green-500'>
                            <p>ROLL</p>
                        </div> */}
          <D4Component />
          <img width={1920} height={1080} src={playmat} alt="PlayMat" />
        </div>
      </div>
    </div>
  );
}

export default Revamped;
