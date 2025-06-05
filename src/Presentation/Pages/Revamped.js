import roll from './rolldice.png'
import scrollUp from './arrowUp.png'
import scrollDown from './arrowDown.png'
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
    // Dice options functionality - Rikku?
    // Roll button and Arrow button - DONE
    // Roll and Arrow button Sizing 
    // Have yet to get assets - in Gdrive
  return (
    <div className="flex bg-[#011f3f]">
      <div className="flex-col w-2/5 h-screen border-2 border-blue-500 px-3 py-5">
        {/* How To Play */}

        <div className="flex-row border-2 border-red-500">
          <div className="p-3 bg-gray-500 rounded-[20px] text-white">
            <h2 className="text-white text-4xl font-bold">HOW TO PLAY</h2>
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
                <div className="relative flex flex-row h-5/6 border-2 border-red-500 justify-center items-center">
                    {/* Scroll Arrows Container */}
                    <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col justify-between items-center h-[680px] w-[408px] z-10">
                        <button>
                            <img src={scrollUp} alt="Scroll Up" className="w-6 h-6" />
                            </button>
                            
                            <button>
                                <img src={scrollDown} alt="Scroll Down" className="w-6 h-6" />
                                </button>
                        </div>
                    {/* <D4Component/> */}
                    {/* Playmat Image */}
                    <img width={1920} height={1080} src={playmat} alt='PlayMat' className='z-0'/>

                {/* Roll Button (positioned at bottom-right) */}
                    <button className='absolute bottom-4 right-4 bg-[#05a895] hover:bg-[#048579] text-white font-bold py-2 px-6 rounded-[25px] shadow-lg transition duration-200"'>
                        <img width={100} height={100} src={roll} alt='ROLL!'/>
                    </button>
                </div>
            </div>
        </div>
  );
}

export default Revamped;
