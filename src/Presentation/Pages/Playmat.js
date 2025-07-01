import { useContext, useRef } from "react";
import { DieContext } from "../Context/DieContext";
import { DieSkinContext } from "../Context/DieSkinContext";
import { ThemeContext } from "../Context/ThemeContext";
import DieComponent from "../Components/DieComponent";
import "./Revamped.css";
import playmat from "../../Assets/SpiritTray.png";
import playmatrotated from "../../Assets/SpiritTrayRotated.png";
import d20 from "../../Assets/d20.svg";
import themes from "../Context/themes";

function Playmat() {
  const { dice, handleAddDie, handleRemoveDie, handleRollDice } =
    useContext(DieContext);
  const { dieSkin } = useContext(DieSkinContext);
  const dieRollRef = useRef([]);
  
  const { themeName, setThemeName } = useContext(ThemeContext);
  const theme = themes[themeName];

  const rollAllDice = () => {
    dieRollRef.current.forEach((ref) => {
      ref?.rollDie();
    });
    handleRollDice();
  };

  return (
    <>
      <div className="playmat-container">
        {/* Playmat Image */}
        <div
          className="playmat-background-container"
          style={{ backgroundImage: `url(${theme.backgroundImage})` }}
        >
          <div className="column-one">
            <div className="themes-container">
              <div className="themes-title">THEMES</div>
              <div className="themes-select">
                <button className="bg-gray-200 theme-button" onClick={() => setThemeName("default")}>theme 1</button>
                <button className="bg-blue-200 theme-button" onClick={() => setThemeName("ocean")}>theme 2</button>
                <button className="bg-yellow-200 theme-button" onClick={() => setThemeName("sand")}>theme 3</button>
              </div>
            </div>
            <button
              className="roll-button"
              onClick={rollAllDice}
            >
              <img width={40} height={40} src={d20} alt="Roll Dice" />
              ROLL
            </button>
          </div>
          <div className="dice-container">
            <DieComponent
              dieSkin={dieSkin}
              dieType={4}
              onAdd={() => {
                handleAddDie(4);
              }}
            />
            <DieComponent
              dieSkin={dieSkin}
              dieType={6}
              onAdd={() => {
                handleAddDie(6);
              }}
            />
            <DieComponent
              dieSkin={dieSkin}
              dieType={8}
              onAdd={() => {
                handleAddDie(8);
              }}
            />
            <DieComponent
              dieSkin={dieSkin}
              dieType={12}
              onAdd={() => {
                handleAddDie(12);
              }}
            />
            <DieComponent
              dieSkin={dieSkin}
              dieType={20}
              onAdd={() => {
                handleAddDie(20);
              }}
            />
            <DieComponent
              dieSkin={dieSkin}
              dieType={100}
              onAdd={() => {
                handleAddDie(100);
              }}
            />
          </div>
          <div className="column-two">
            <div className="display-dice-container">
              {dice.map((die, index) => {
                return (
                  <DieComponent
                    ref={(ref) => {
                      dieRollRef.current[index] = ref;
                    }}
                    key={index}
                    die={die}
                    dieSkin={dieSkin}
                    onRemove={() => {
                      handleRemoveDie(index);
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div className="col-span-1"></div>
          <div className="column-three">
            <div className="history-container">
              <div className="history-title">HISTORY</div>
              <div className="history-details"></div>
            </div>
          </div>
        </div>

        {/* Responsive Code

        <div className="flex flex-row md:hidden">
          <img
            src={playmatrotated}
            alt="PlayMat Rotated"
            className="w-[400px] h-auto p-3"
          />
        </div> */}
      </div>
    </>
  );
}

export default Playmat;
