import './App.css';
import { useState, useEffect } from 'react';

//Rollers
import BakunawaRoller from "./DiceImg/BakunawaRoller.png";
import BakunawaRollerG from "./DiceImg/BakunawaRollerG.png";
import BakunawaRollerR from "./DiceImg/BakunawaRollerR.png";
import CastleRoller from "./DiceImg/CastleRoller.png";
import BakunawiJr from "./DiceImg/BakunawiJr.png";

//Button Designs
import Button_Y from "./DiceImg/Button_Y.png";
import Button_B from "./DiceImg/Button_B.png";
import Button_R from "./DiceImg/Button_R.png";
import DiceButton from "./DiceImg/DiceButton.png";

//DiceSFX
import DiceSFX from "./DiceImg/dicesfx.mp3";
import takeDice from "./DiceImg/takeDice.MP3";
import putDice from "./DiceImg/putDice.MP3";

//D6 Images
import D6_one from "./DiceImg/D6_one.png";
import D6_two from "./DiceImg/D6_two.png";
import D6_three from "./DiceImg/D6_three.png";
import D6_four from "./DiceImg/D6_four.png";
import D6_five from "./DiceImg/D6_five.png";
import D6_six from "./DiceImg/D6_six.png";

//D20 Images
import D20_1 from "./DiceImg/d20_1.png";
import D20_2 from "./DiceImg/d20_2.png";
import D20_3 from "./DiceImg/d20_3.png";
import D20_4 from "./DiceImg/d20_4.png";
import D20_5 from "./DiceImg/d20_5.png";
import D20_6 from "./DiceImg/d20_6.png";
import D20_7 from "./DiceImg/d20_7.png";
import D20_8 from "./DiceImg/d20_8.png";
import D20_9 from "./DiceImg/d20_9.png";
import D20_10 from "./DiceImg/d20_10.png";
import D20_11 from "./DiceImg/d20_11.png";
import D20_12 from "./DiceImg/d20_12.png";
import D20_13 from "./DiceImg/d20_13.png";
import D20_14 from "./DiceImg/d20_14.png";
import D20_15 from "./DiceImg/d20_15.png";
import D20_16 from "./DiceImg/d20_16.png";
import D20_17 from "./DiceImg/d20_17.png";
import D20_18 from "./DiceImg/d20_18.png";
import D20_19 from "./DiceImg/d20_19.png";
import D20_20 from "./DiceImg/d20_20.png";

//Coin Assets
import Coin1 from "./DiceImg/Coin1.png";
import Coin2 from "./DiceImg/Coin2.png";
import coinSFX from "./DiceImg/coinSFX.wav";
import takeCoin from "./DiceImg/takeCoin.MP3";
import putCoin from "./DiceImg/putCoin.MP3";

function App() {
  const SkinImgs = [BakunawaRoller, BakunawaRollerG, BakunawaRollerR, CastleRoller, BakunawiJr];
  const D6Imgs = [D6_six, D6_five, D6_four, D6_three, D6_two, D6_one];
  const D20Imgs = [D20_1, D20_2, D20_3, D20_4, D20_5, D20_6, D20_7, D20_8, D20_9, D20_10, D20_11, D20_12, D20_13, D20_14, D20_15, D20_16, D20_17, D20_18, D20_19, D20_20];
  const CoinImgs = [Coin1, Coin2];

  const [d6Images, setD6Images] = useState([]);
  const [d20Images, setD20Images] = useState([]);
  const [coinImages, setCoinImages] = useState([]);
  const [isRolling, setIsRolling] = useState(false);
  const [isDiceVisible, setIsDiceVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [currentSkinIndex, setCurrentSkinIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [showDiceSettings, setShowDiceSettings] = useState(false);
  const [d6Count, setD6Count] = useState(1);
  const [d20Count, setD20Count] = useState(0);
  const [coinCount, setCoinCount] = useState(0);
  const [showSkin, setShowSkin] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [shakeEnabled, setShakeEnabled] = useState(true); // State to manage shake functionality

  

  const [stats, setStats] = useState({
    nat20: 0,
    nat1: 0,
    d6nat6: 0,
    d6nat1: 0,
    heads: 0,
    tails: 0,
  });

  const [unlockedSkins, setUnlockedSkins] = useState([true, true, true, false, false]); // Only first 3 are unlocked initially

  useEffect(() => {
    let lastX = 0, lastY = 0, lastZ = 0, lastTime = 0;
    const SHAKE_THRESHOLD = 40; // Adjust this value to change sensitivity
  
    const handleMotion = (event) => {
      if (!event.accelerationIncludingGravity) return;
  
      const { x, y, z } = event.accelerationIncludingGravity;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastTime;
  
      // Prevent multiple rolls while one is already in progress
      if (isRolling || timeDiff < 200) return;
      if (!shakeEnabled) return; // Check if shake is enabled
  
      if (timeDiff > 200) {
        const speed = Math.abs(x - lastX) + Math.abs(y - lastY) + Math.abs(z - lastZ);
        if (speed > SHAKE_THRESHOLD) {
          rollDice();
        }
        lastX = x;
        lastY = y;
        lastZ = z;
        lastTime = currentTime;
      }
    };
  
    window.addEventListener("devicemotion", handleMotion);
    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, [isRolling, d6Count, d20Count, shakeEnabled]);

   // Play sound when dice or coin count changes
   const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.playbackRate = 0.9 + Math.random() * 0.1;
    audio.play();
  };

  const handleD6CountChange = (change) => {
    if (change < 0 && d6Count > 0) {
      playSound(takeDice); // Play takeDice sound when D6 count is decreased
    } else if (change > 0 && totalDice < 10) {
      playSound(putDice); // Play putDice sound when D6 count is increased
    }
    setD6Count((prev) => Math.max(prev + change, 0)); // Ensure count does not go below 0
  };

  const handleD20CountChange = (change) => {
    if (change < 0 && d20Count > 0) {
      playSound(takeDice); // Play takeDice sound when D20 count is decreased
    } else if (change > 0 && totalDice < 10) {
      playSound(putDice); // Play putDice sound when D20 count is increased
    }
    setD20Count((prev) => Math.max(prev + change, 0)); // Ensure count does not go below 0
  };

  const handleCoinCountChange = (change) => {
    if (change < 0 && coinCount > 0) {
      playSound(takeCoin); // Play takeCoin sound when coin count is decreased
    } else if (change > 0 && totalDice < 10) {
      playSound(putCoin); // Play putCoin sound when coin count is increased
    }
    setCoinCount((prev) => Math.max(prev + change, 0)); // Ensure count does not go below 0
  };
  
   // Effect to update dice images immediately when their counts change
   useEffect(() => {
    const spawnDice = () => {
      const d6Results = Array.from({ length: d6Count }, () => Math.floor(Math.random() * 6));
      const d20Results = Array.from({ length: d20Count }, () => Math.floor(Math.random() * 20));
      const coinResults = Array.from({ length: coinCount }, () => Math.floor(Math.random() * 2));

      setD6Images(d6Results.map(i => D6Imgs[i]));
      setD20Images(d20Results.map(i => D20Imgs[i]));
      setCoinImages(coinResults.map(i => CoinImgs[i]));
    };

    spawnDice();
  }, [d6Count, d20Count, coinCount]);

  const rollDice = () => {
    setIsRolling(true);
    setIsDiceVisible(true);
    setAnimationKey(prevKey => prevKey + 1);
  
    // Play dice SFX only if there are dice
    if (d6Count > 0 || d20Count > 0) {
      const diceAudio = new Audio(DiceSFX);
      diceAudio.playbackRate = 0.7 + Math.random() * 0.3;
      diceAudio.play();
    }
  
    // Play coin SFX only if there are coins
    if (coinCount > 0) {
      const coinAudio = new Audio(coinSFX);
      coinAudio.playbackRate = 0.7 + Math.random() * 0.3;
      coinAudio.play();
    }
  
    let counter = 0;
    let finalCoinResults = [];
  
    const rollInterval = setInterval(() => {
      const d6Results = Array.from({ length: d6Count }, () => Math.floor(Math.random() * 6));
      const d20Results = Array.from({ length: d20Count }, () => Math.floor(Math.random() * 20));
      const coinResults = Array.from({ length: coinCount }, () => Math.floor(Math.random() * 2));
  
      setD6Images(d6Results.map(i => D6Imgs[i]));
      setD20Images(d20Results.map(i => D20Imgs[i]));
      setCoinImages(coinResults.map(i => CoinImgs[i]));
      finalCoinResults = coinResults;
  
      // Track results and unlocks
      if (counter === 9) { //1 below the real number, as arrays start from 0
        let newStats = { ...stats };
        let newUnlocked = [...unlockedSkins];
  
        d20Results.forEach((val) => {
          if (val === 19) {
            newStats.nat20 += 1;
            if (newUnlocked[3] === false) {
              alert("Woah, you rolled a 20!. You are now the king of the Castle! Castle Roller added to Skins.")
            }
            newUnlocked[3] = true;
          }
          if (val === 0) {
            newStats.nat1 += 1;
            if (newUnlocked[4] === false) {
              alert("Aww, you rolled a 1. Have Bakunawi Jr as a consolation. Added to Skins.")
            }
            newUnlocked[4] = true;
          }
        });
  
        d6Results.forEach((val) => {
          if (val === 0) newStats.d6nat6 += 1;
          if (val === 5) newStats.d6nat1 += 1;
        });
  
        finalCoinResults.forEach((res) => {
          if (res === 0) newStats.heads += 1;
          if (res === 1) newStats.tails += 1;
        });
  
        setStats(newStats);
        setUnlockedSkins(newUnlocked);
      }
  
      counter++;
      if (counter >= 10) {
        clearInterval(rollInterval);
        setIsRolling(false);
      }
    }, 100);
  };

  const totalDice = d6Count + d20Count + coinCount; //Limits max rollable dice to 10  

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
          <br />
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
              {d6Images.map((img, index) => (
                <img key={`d6-${animationKey}-${index}`} src={img} alt="D6 Result" className="dice d6-dice" />
              ))}
            </div>
            <div className="dice-container">
              {d20Images.map((img, index) => (
                <img key={`d20-${animationKey}-${index}`} src={img} alt="D20 Result" className="dice d20-dice" />
              ))}
            </div>
            <div className="dice-container">
              {coinImages.map((img, index) => (
                <img key={`coin-${animationKey}-${index}`} src={img} alt="Coin Flip Result" className="dice coin" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;