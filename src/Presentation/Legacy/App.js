// Hello! Welcome to the source code! Each function displayed on the website is seperated by their own files respectively.
// This is for organization purposes as all dices and gamemodes contain a lot of lines of code.
import "./App.css";
import { useState } from "react";
import { useDices } from "../../Application/Dices";
import { useGamemodes } from "../../Application/Gamemodes";
import AlertBox from "../../Components/AlertBox";

//Button Designs
import Button_Y from "../../Assets/DiceImg/Button_Y.png";
import Button_B from "../../Assets/DiceImg/Button_B.png";
import Button_R from "../../Assets/DiceImg/Button_R.png";
import DiceButton from "../../Assets/DiceImg/DiceButton.png";
import DiceTray from "../../Assets/DiceImg/DiceTray.png";
import Arrow from "../../Assets/DiceImg/arrow.png";

// Dice Assets
import D4_4 from "../../Assets/DiceImg/d4_4.png";
import D6_six from "../../Assets/DiceImg/D6_six.png";
import D8_8 from "../../Assets/DiceImg/d8_8.png";
import D10_10 from "../../Assets/DiceImg/d10_10.png";
import D20_20 from "../../Assets/DiceImg/d20_20.png";
import Coin1 from "../../Assets/DiceImg/Coin1.png";
import takeDice from "../../Assets/DiceImg/takeDice.MP3";

//Containers
import ContainerSelector from "../../Assets/DiceImg/Dice_Container_top.png";
import DiceContainer from "../../Assets/DiceImg/Dice_Container_body.png";

function App() {
  const {
    //imported variables and functions from Dices.js
    SkinImgs,
    D4Imgs,
    D6Imgs,
    D8Imgs,
    D10Imgs,
    D20Imgs,
    CoinImgs,
    d4Images,
    d6Images,
    d8Images,
    d10Images,
    d20Images,
    coinImages,
    isRolling,
    isDiceVisible,
    animationKey,
    currentSkinIndex,
    showMenu,
    showDiceSettings,
    d4Count,
    d6Count,
    d8Count,
    d10Count,
    d20Count,
    coinCount,
    showSkin,
    statsVisible,
    showGameSettings,
    shakeEnabled,
    stats,
    unlockedSkins,
    alertMsg,
    setShowMenu,
    setShowDiceSettings,
    setD4Count,
    setD6Count,
    setD8Count,
    setD10Count,
    setD20Count,
    setCoinCount,
    setShowSkin,
    setStatsVisible,
    setShowGameSettings,
    setShakeEnabled,
    setCurrentSkinIndex,
    setAlertMsg,
    handleD4CountChange,
    handleD6CountChange,
    handleD8CountChange,
    handleD10CountChange,
    handleD20CountChange,
    handleCoinCountChange,
    rollDice,
  } = useDices();

  //logic for the visual dice
  const [selectorPage, setSelectorPage] = useState(0);
  const takeDiceAudio = new Audio(takeDice);
  const allDiceIcons = [D6_six, D20_20, Coin1, D4_4, D8_8, D10_10];
  const diceGroups = [];

  for (let i = 0; i < allDiceIcons.length; i += 3) {
    diceGroups.push(allDiceIcons.slice(i, i + 3));
  }

  const nextSelector = () => {
    takeDiceAudio.play();
    setSelectorPage((prev) => (prev + 1) % diceGroups.length);
  };

  //activates Fives
  const { activateFivesMode, fivesMode } = useGamemodes({
    d4Count,
    d6Count,
    d8Count,
    d10Count,
    d20Count,
    coinCount,
    setD4Count,
    setD6Count,
    setD8Count,
    setD10Count,
    setD20Count,
    setCoinCount,
    setAlertMsg,
  });

  //Removes Current Dice
  const handleRemoveDice = (index) => {
    if (isRolling) return;
    if (index < d4Count) {
      handleD4CountChange(-1);
    } else if (index < d4Count + d6Count) {
      handleD6CountChange(-1);
    } else if (index < d4Count + d6Count + d8Count) {
      handleD8CountChange(-1);
    } else if (index < d4Count + d6Count + d8Count + d10Count) {
      handleD10CountChange(-1);
    } else if (index < d4Count + d6Count + d8Count + d10Count + d20Count) {
      handleD20CountChange(-1);
    } else {
      handleCoinCountChange(-1);
    }
  };

  //dice pages for the visual dice
  const [dicePage, setDicePage] = useState(0);
  const dicePages = [
    [
      <img
        key="d6"
        src={D6_six}
        alt="D6"
        onClick={() => handleD6CountChange(1)}
      />,
      <img
        key="d20"
        src={D20_20}
        alt="D20"
        onClick={() => handleD20CountChange(1)}
      />,
      <img
        key="coin"
        src={Coin1}
        alt="Coin"
        onClick={() => handleCoinCountChange(1)}
      />,
    ],
    [
      <img
        key="d4"
        src={D4_4}
        alt="D4"
        onClick={() => handleD4CountChange(1)}
      />,
      <img
        key="d8"
        src={D8_8}
        alt="D8"
        onClick={() => handleD8CountChange(1)}
      />,
      <img
        key="d10"
        src={D10_10}
        alt="D10"
        onClick={() => handleD10CountChange(1)}
      />,
    ],
  ];
  //switches visible dice
  const handleNextPage = () => {
    setDicePage((prev) => (prev + 1) % dicePages.length);
  };

  return (
    <div className="App">
      {/* Skins Menu */}
      <button className="menu-button" onClick={() => setShowMenu(true)}>
        <img src={Button_Y} alt="Menu" />
        <span>Skins</span>
      </button>

      {/* Dice Settings */}
      <button
        className="dice-settings"
        onClick={() => setShowDiceSettings(true)}
      >
        <img src={Button_B} alt="Settings" />
        <span>Dices & Etc.</span>
      </button>

      {/* Game Settings */}
      <button
        className="game-settings"
        onClick={() => setShowGameSettings(true)}
      >
        <img src={Button_B} alt="Settings" />
        <span>Game Modes</span>
      </button>

      {/* Stats Button */}
      <button
        className="stats-button"
        onClick={() => setStatsVisible(!statsVisible)}
      >
        Statistics
      </button>

      <div className={`menu-overlay stats ${statsVisible ? "show" : ""}`}>
        <h2>Statistics</h2>
        <p>D20 Nat20s: {stats.nat20}</p>
        <p>D20 Nat1s: {stats.nat1}</p>
        <p>D10 Nat10s: {stats.d10nat10}</p>
        <p>D10 Nat1s: {stats.d10nat1}</p>
        <p>D8 Nat8s: {stats.d8nat8}</p>
        <p>D8 Nat1s: {stats.d8nat1}</p>
        <p>D6 Nat6s: {stats.d6nat6}</p>
        <p>D6 Nat1s: {stats.d6nat1}</p>
        <p>D4 Nat4s: {stats.d4nat4}</p>
        <p>Coin Heads: {stats.heads}</p>
        <p>Coin Tails: {stats.tails}</p>

        <p>Fives: {stats.fives}</p>
      </div>

      {/* Skin Selection */}
      <div className={`menu-overlay ${showMenu ? "show" : ""}`}>
        <button className="close-btn" onClick={() => setShowMenu(false)}>
          <img src={Button_R} alt="Close" />
          <span>Close</span>
        </button>
        <button className="hide-btn" onClick={() => setShowSkin(!showSkin)}>
          <span>{showSkin ? "Hide Skin" : "Show Skin"}</span>
        </button>
        <h2>Select a Roller Skin</h2>
        <div className="skin-options">
          {SkinImgs.map((skin, index) =>
            unlockedSkins[index] ? (
              <img
                key={index}
                src={skin}
                alt={`Skin ${index + 1}`}
                onClick={() => {
                  setCurrentSkinIndex(index);
                  setShowSkin(true);
                }}
                style={{ width: "115px", height: "150px" }}
              />
            ) : null
          )}
        </div>
      </div>

      {/* Dice Settings Panel */}
      <div className={`menu-overlay right ${showDiceSettings ? "show" : ""}`}>
        <button
          className="close-btn"
          onClick={() => setShowDiceSettings(false)}
        >
          <img src={Button_R} alt="Close" />
          <span>Close</span>
        </button>
        <br />
        <h2>D4 Count</h2>
        <button className="adjust-btn" onClick={() => handleD4CountChange(-1)}>
          -
        </button>
        <span className="count-display">{d4Count}</span>
        <button className="adjust-btn" onClick={() => handleD4CountChange(1)}>
          +
        </button>

        <h2>D6 Count</h2>
        <button className="adjust-btn" onClick={() => handleD6CountChange(-1)}>
          -
        </button>
        <span className="count-display">{d6Count}</span>
        <button className="adjust-btn" onClick={() => handleD6CountChange(1)}>
          +
        </button>

        <h2>D8 Count</h2>
        <button className="adjust-btn" onClick={() => handleD8CountChange(-1)}>
          -
        </button>
        <span className="count-display">{d8Count}</span>
        <button className="adjust-btn" onClick={() => handleD8CountChange(1)}>
          +
        </button>

        <h2>D10 Count</h2>
        <button className="adjust-btn" onClick={() => handleD10CountChange(-1)}>
          -
        </button>
        <span className="count-display">{d10Count}</span>
        <button className="adjust-btn" onClick={() => handleD10CountChange(1)}>
          +
        </button>

        <h2>D20 Count</h2>
        <button className="adjust-btn" onClick={() => handleD20CountChange(-1)}>
          -
        </button>
        <span className="count-display">{d20Count}</span>
        <button className="adjust-btn" onClick={() => handleD20CountChange(1)}>
          +
        </button>

        <h2>Coin Flip Count</h2>
        <button
          className="adjust-btn"
          onClick={() => handleCoinCountChange(-1)}
        >
          -
        </button>
        <span className="count-display">{coinCount}</span>
        <button className="adjust-btn" onClick={() => handleCoinCountChange(1)}>
          +
        </button>

        <div style={{ marginTop: "20px" }}>
          <h2> Shake to Roll </h2>
          <button onClick={() => setShakeEnabled(!shakeEnabled)}>
            {shakeEnabled ? "Disable Shake" : "Enable Shake"}
          </button>
        </div>
      </div>

      {/* Gamemodes */}
      <div className={`menu-overlay right ${showGameSettings ? "show" : ""}`}>
        <button
          className="close-btn"
          onClick={() => setShowGameSettings(false)}
        >
          <img src={Button_R} alt="Close" />
          <span>Close</span>
        </button>
        <div style={{ marginTop: "20px" }}>
          <h2>Fives Game Mode</h2>
          <button className="adjust-btn" onClick={activateFivesMode}>
            Play Fives
          </button>
        </div>
      </div>

      {/* Instructions */}
      <h3 style={{ color: "white" }}>Click dice at the to add dice!</h3>
      <h5 style={{ color: "white" }}>
        Click on the Purple Button or Skin to roll the dice!
      </h5>
      <h5 style={{ color: "white" }}>
        If you are on Mobile you can also shake to roll the dice!
      </h5>
      <h6 style={{ color: "white" }}>
        Click the change dice button beside the selectable dice to change!
      </h6>
      <h6 style={{ color: "white" }}>
        Click on the dice in the dice tray to remove them!
      </h6>

      <div style={{ marginBottom: "20px" }}>
        <button
          className="center-roll-btn"
          onClick={rollDice}
          disabled={isRolling}
        >
          <img
            src={DiceButton}
            alt="DiceButton"
            style={{ width: "100px", height: "100px" }}
          />
        </button>
      </div>

      <div className={`image-container${isRolling ? " rolling" : ""}`}>
        {showSkin && (
          <button
            className={`bakunawa-button${isRolling ? " rolling active" : ""}`}
            onClick={rollDice}
            disabled={isRolling}
          >
            <img
              key={animationKey}
              src={SkinImgs[currentSkinIndex]}
              alt="Bakunawa Roller"
              className="bakunawa"
            />
          </button>
        )}

        <div className="dice-selector-container">
          <div className="dice-selector-wrapper">
            <div
              className={`dice-selector slide-${selectorPage}`}
              key={selectorPage}
            >
              {diceGroups[selectorPage].map((diceImg, index) => {
                const handlers = [
                  () => handleD6CountChange(1),
                  () => handleD20CountChange(1),
                  () => handleCoinCountChange(1),
                  () => handleD4CountChange(1),
                  () => handleD8CountChange(1),
                  () => handleD10CountChange(1),
                ];
                return (
                  <img
                    key={index}
                    src={diceImg}
                    alt={`Dice ${index}`}
                    onClick={handlers[selectorPage * 3 + index]}
                  />
                );
              })}
            </div>
            <button className="arrow-button" onClick={nextSelector}>
              <img src={Arrow} alt="Next" />
            </button>
          </div>
        </div>

        <div className="dice-container">
          {[
            ...d4Images,
            ...d6Images,
            ...d8Images,
            ...d10Images,
            ...d20Images,
            ...coinImages,
          ].map((img, index) => (
            <img
              key={`all-${animationKey}-${index}`}
              src={img}
              alt="Roll Result"
              className="dice"
              onClick={() => handleRemoveDice(index)}
              title="Click to remove"
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
      </div>
      {alertMsg && (
        <AlertBox message={alertMsg} onClose={() => setAlertMsg("")} />
      )}
    </div>
  );
}
export default App;
