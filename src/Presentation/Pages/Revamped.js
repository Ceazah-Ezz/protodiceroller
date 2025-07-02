import { useState, useContext } from "react";
import HowTo from "../Components/HowTo";
import Buttons from "../Components/Buttons";
import Playmat from "../Components/Playmat";
import { ThemeContext } from "../Context/ThemeContext";
import "./Revamped.css";

function Revamped() {
  const [showModal, setShowModal] = useState(false);
  const { themeName } = useContext(ThemeContext);

  return (
    <div className={`screen-container theme-${themeName}`}>
      <div className="page-container">
        {/* Title */}
        <div className="header-container">
          <div></div>
          <div className="title">
            <h1 className={`title-text theme-${themeName}`}>DICE ROLLER</h1>
          </div>
          <div className="button-container">
            <Buttons onInfoClick={() => setShowModal(true)} />
          </div>
        </div>

        <Playmat />

        {showModal && <HowTo onExit={() => setShowModal(false)} />}
      </div>
    </div>
  );
}

export default Revamped;
