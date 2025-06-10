import console from "./console-controller.svg";
import histogram from "./histogram.svg";

function Buttons() {
  return (
    <div className="flex flex-row border-2 border-red-500 space-x-10 p-12">
      <button className="flex-col w-75 h-75 bg-[#05a895] m-3 rounded-[20px]">
        <img
          className="h-fit w-max aspect-square"
          src={console}
          alt="Console Icon"
        />
      </button>
      <button className="flex-col w-75 h-75 bg-[#05a895] m-3 rounded-[20px]">
        <img
          className="h-fit w-max aspect-square"
          src={histogram}
          alt="Histogram Icon"
        />
      </button>
    </div>
  );
}

export default Buttons;
