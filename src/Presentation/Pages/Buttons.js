import console from "./console-controller.svg";
import histogram from "./histogram.svg";

function Buttons() {
  return (
    <div className="flex flex-row items-center justify-center">
      <button className="h-auto w-fit bg-[#05a895] rounded-[20px] p-3 m-2">
        <img width={100} height={100} className="" src={console} alt="Console Icon" />
      </button>
      <button className="h-auto w-fit bg-[#05a895] rounded-[20px] p-3 m-2">
        <img width={100} height={100} className="" src={histogram} alt="Histogram Icon" />
      </button>
    </div>
  );
}

export default Buttons;
