// Hello! Welcome to the source code! Each function displayed on the website is seperated by their own files respectively. 
// This is for organization purposes as all dices and gamemodes contain a lot of lines of code.
import './App.css';
import { useDices } from './Dices';
import { useGamemodes } from './Gamemodes';
import AlertBox from './AlertBox';

//Button Designs
import Button_Y from "./DiceImg/Button_Y.png";
import Button_B from "./DiceImg/Button_B.png";
import Button_R from "./DiceImg/Button_R.png";
import DiceButton from "./DiceImg/DiceButton.png";
import DiceTray from "./DiceImg/DiceTray.png";

function App() {
  const {
    SkinImgs, D6Imgs, D20Imgs, CoinImgs,
    d6Images, d20Images, coinImages, isRolling, isDiceVisible,
    animationKey, currentSkinIndex, showMenu, showDiceSettings,
    d6Count, d20Count, coinCount, showSkin, statsVisible, showGameSettings,
    shakeEnabled, stats, unlockedSkins, alertMsg,
    setShowMenu, setShowDiceSettings, setD6Count, setD20Count, setCoinCount,
    setShowSkin, setStatsVisible, setShowGameSettings,
    setShakeEnabled, setCurrentSkinIndex, setAlertMsg,
    handleD6CountChange, handleD20CountChange, handleCoinCountChange,
    rollDice
  } = useDices();

  const {activateFivesMode, fivesMode,} = useGamemodes({
    d6Count, d20Count, coinCount,
    setD6Count, setD20Count, setCoinCount, setAlertMsg,
  });

    return (
      <div className="App">
        {/* Skins Menu */}
        <button className="menu-button" onClick={() => setShowMenu(true)}>
          <img src={Button_Y} alt="Menu" />
          <span>Skins</span>
        </button>

        {/* Dice Settings */}
        <button className="dice-settings" onClick={() => setShowDiceSettings(true)}>
          <img src={Button_B} alt="Settings" />
          <span>Dices & Etc.</span>
        </button>

        {/* Game Settings */}
        <button className="game-settings" onClick={() => setShowGameSettings(true)}>
          <img src={Button_B} alt="Settings" />
          <span>Game Modes</span>
        </button> 

        {/* Stats Button */}
        <button className="stats-button" onClick={() => setStatsVisible(!statsVisible)}>
          Statistics
        </button>

        <div className={`menu-overlay stats ${statsVisible ? 'show' : ''}`}>
          <h2>Statistics</h2>
          <p>D20 Nat20s: {stats.nat20}</p>
          <p>D20 Nat1s: {stats.nat1}</p>
          <p>D6 Nat6s: {stats.d6nat6}</p>
          <p>D6 Nat1s: {stats.d6nat1}</p>
          <p>Coin Heads: {stats.heads}</p>
          <p>Coin Tails: {stats.tails}</p>

          <p>Fives: {stats.fives}</p>
        </div>

        {/* Skin Selection */}
        <div className={`menu-overlay ${showMenu ? 'show' : ''}`}>
            <button className="close-btn" onClick={() => setShowMenu(false)}>
              <img src={Button_R} alt="Close" />
              <span>Close</span>
            </button>
            <button className="hide-btn" onClick={() => setShowSkin(!showSkin)}>
              <span>{showSkin ? 'Hide Skin' : 'Show Skin'}</span>
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
                    style={{ width: '115px', height: '150px' }}
                  />
                ) : null
              )}
            </div>
          </div>

        {/* Dice Settings Panel */}
        <div className={`menu-overlay right ${showDiceSettings ? 'show' : ''}`}>
            <button className="close-btn" onClick={() => setShowDiceSettings(false)}>
              <img src={Button_R} alt="Close" />
              <span>Close</span>
            </button>
            <br/>
            <h2>D6 Count</h2>
            <button className="adjust-btn" onClick={() => handleD6CountChange(-1)}>-</button>
            <span className="count-display">{d6Count}</span>
            <button className="adjust-btn" onClick={() => handleD6CountChange(1)}>+</button>

            <h2>D20 Count</h2>
            <button className="adjust-btn" onClick={() => handleD20CountChange(-1)}>-</button>
            <span className="count-display">{d20Count}</span>
            <button className="adjust-btn" onClick={() => handleD20CountChange(1)}>+</button>

            <h2>Coin Flip Count</h2>
            <button className="adjust-btn" onClick={() => handleCoinCountChange(-1)}>-</button>
            <span className="count-display">{coinCount}</span>
            <button className="adjust-btn" onClick={() => handleCoinCountChange(1)}>+</button>
            
            <div style ={{ marginTop: '20px' }}>
              <h2> Shake to Roll </h2>
              <button onClick={() => setShakeEnabled(!shakeEnabled)}>
                {shakeEnabled ? 'Disable Shake' : 'Enable Shake'}
              </button> 
            </div>
        </div>

        {/* Gamemodes */}
        <div className={`menu-overlay right ${showGameSettings ? 'show' : ''}`}>
          <button className="close-btn" onClick={() => setShowGameSettings(false)}>
            <img src={Button_R} alt="Close" />
            <span>Close</span>
          </button>
            <div style={{ marginTop: '20px' }}>
            <h2>Fives Game Mode</h2>
            <button className="adjust-btn" onClick={activateFivesMode}>Play Fives</button>
          </div>
        </div>

        {/* Instructions */}
        <h3 style={{ color: 'white' }}>This is a dice prototype! Test it out!</h3>
        <h5 style={{ color: 'white' }}>Click on the Button or Skin to roll the dice!</h5>
        <h5 style={{ color: 'white' }}>If you are on Mobile you can also shake to roll the dice!</h5>

        <div style={{ marginBottom: '20px' }}>
          <button className="center-roll-btn" onClick={rollDice} disabled={isRolling}>
            <img src={DiceButton} alt="DiceButton" style={{width: '100px', height: '100px'}}/>
          </button>
        </div>

        <div className={`image-container${isRolling ? ' rolling' : ''}`}>
          {showSkin && (
            <button className={`bakunawa-button${isRolling ? ' rolling active' : ''}`} onClick={rollDice} disabled={isRolling}>
              <img key={animationKey} src={SkinImgs[currentSkinIndex]} alt="Bakunawa Roller" className="bakunawa" />
            </button>
          )}

          {isDiceVisible && (
            <div>
              <div className="dice-container">
              {[...d6Images, ...d20Images, ...coinImages].map((img, index) => (
                <img key={`all-${animationKey}-${index}`} src={img} alt="Roll Result" className="dice" />
              ))}
              </div>
            </div>
          )}
        </div>
        {alertMsg && (
          <AlertBox message={alertMsg} onClose={() => setAlertMsg('')} />
        )}
      </div>
    );
}
  export default App;