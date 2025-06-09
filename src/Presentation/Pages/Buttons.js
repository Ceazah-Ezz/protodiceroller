import console from "./console-controller.svg";
import histogram from "./histogram.svg";

function Buttons() {
    return(
        <div className="flex flex-row border-2 border-red-500 space-x-10 p-12">
          <button className="flex-col w-fit h-auto bg-[#05a895] p-3 rounded-[20px]">
            <img width={200} height={200} src={console} alt="Console Icon" />
          </button>
          <button className="flex-col w-fit h-auto bg-[#05a895] p-3 rounded-[20px]">
            <img width={200} height={200} src={histogram} alt="Histogram Icon" />
          </button>
        </div>
    )
}

export default Buttons;