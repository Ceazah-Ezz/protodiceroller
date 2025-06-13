import console from "./console-controller.svg";
import histogram from "./histogram.svg";

function Buttons() {
  return (
    <div className="flex flex-row border-2 border-red-500 space-x-10 p-12">
      <button className="h-[300px] w-[300px] bg-[#05a895] m-3 rounded-[20px]">
        <img className="h-[200px] w-[200px]" src={console} alt="Console Icon" />
      </button>
      <button className="h-[200px] w-[200px]bg-[#05a895] m-3 rounded-[20px]">
        <img
          className="h-[200px] w-[200px]"
          src={histogram}
          alt="Histogram Icon"
        />
      </button>
    </div>
  );
}

export default Buttons;
