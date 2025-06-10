import roll from './rolldice.png'
import scrollUp from './arrowUp.png'
import scrollDown from './arrowDown.png'
import playmat from "./SpiritTray.png";

function Playmat() {
    return(
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
                <img width={1920} height={1080} src={playmat} alt='PlayMat' className=''/>
            {/* <button className='absolute bottom-4 right-4 bg-[#05a895] hover:bg-[#048579] text-white font-bold py-2 px-6 rounded-[25px] shadow-lg transition duration-200"'>
                <img width={100} height={100} src={roll} alt='ROLL!'/>
            </button> */}
        </div>
    )
}

export default Playmat;