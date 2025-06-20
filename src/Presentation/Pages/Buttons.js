import console from "./console-controller.svg";
import histogram from "./histogram.svg";
import information from "./information.svg"

function Buttons({onInfoClick}) {
  return (
    <div className="flex flex-row items-center justify-center ">
      <button className="h-auto w-fit bg-[#c23838] rounded-[20px] p-3 m-2" onClick={onInfoClick}>
        <img width={50} height={50} className="" src={information} alt="Information Icon" />
      </button>
      <button className="h-auto w-fit bg-[#c23838] rounded-[20px] p-3 m-2">
        <img width={50} height={50} className="" src={console} alt="Console Icon" />
      </button>
      <button className="h-auto w-fit bg-[#c23838] rounded-[20px] p-3 m-2">
        <img width={50} height={50} className="" src={histogram} alt="Histogram Icon" />
      </button>
    </div>
  );
}

export default Buttons;
