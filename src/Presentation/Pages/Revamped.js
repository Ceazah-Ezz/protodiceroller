import "./Revamped.css";
import DieComponent from "../Components/DieComponent";
import HowTo from './HowTo';
import Buttons from './Buttons';
import History from './History';
import Playmat from "./Playmat";

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
      
      <div className="hidden md:flex flex-col w-2/5 h-screen border-2 border-blue-500 px-3 py-5">
        <HowTo />
        <Buttons />
        <History /> 
      </div>

      <div className="flex-col w-full h-screen border-2 border-blue-500">
        {/* Title */}
        <div className="hidden md:flex flex-row h-1/6 border-2 border-red-500 justify-center items-center">
          <h1 className="text-white text-8xl font-bold">DICE ROLLER</h1>
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
          {/* <D4Component/> */}
          <DieComponent />
          {/* Playmat Image */}
          <img
            width={1920}
            height={1080}
            src={playmat}
            alt="PlayMat"
            className="z-0"
          />

          {/* Roll Button (positioned at bottom-right) */}
          <button className='absolute bottom-4 right-4 bg-[#05a895] hover:bg-[#048579] text-white font-bold py-2 px-6 rounded-[25px] shadow-lg transition duration-200"'>
            <img width={100} height={100} src={roll} alt="ROLL!" />
          </button>
        </div>
      </div>
      </div>
    
  );
}

export default Revamped;
