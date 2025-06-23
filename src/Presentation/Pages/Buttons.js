import console from "./console-controller.svg";
import histogram from "./histogram.svg";
import information from "./information.svg";
import "./Buttons.css";

function Buttons({ onInfoClick }) {
  return (
    <div className="button-container">
      <button onClick={onInfoClick}>
        <img
          width={50}
          height={50}
          className=""
          src={information}
          alt="Information Icon"
        />
      </button>
      <button>
        <img
          width={50}
          height={50}
          className=""
          src={console}
          alt="Console Icon"
        />
      </button>
      <button>
        <img
          width={50}
          height={50}
          className=""
          src={histogram}
          alt="Histogram Icon"
        />
      </button>
    </div>
  );
}

export default Buttons;
