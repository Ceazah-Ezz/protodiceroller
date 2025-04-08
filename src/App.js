import './App.css';
import { useState, useEffect } from 'react';

import BakunawaRoller from "./DiceImg/BakunawaRoller.png";
import BakunawaRollerG from "./DiceImg/BakunawaRollerG.png";
import BakunawaRollerR from "./DiceImg/BakunawaRollerR.png";
import CastleRoller from "./DiceImg/CastleRoller.png";
import BakunawiJr from "./DiceImg/BakunawiJr.png";

import Button_Y from "./DiceImg/Button_Y.png";
import Button_B from "./DiceImg/Button_B.png";
import Button_R from "./DiceImg/Button_R.png";

import DiceSFX from "./DiceImg/dicesfx.mp3";

import D6_one from "./DiceImg/D6_one.png";
import D6_two from "./DiceImg/D6_two.png";
import D6_three from "./DiceImg/D6_three.png";
import D6_four from "./DiceImg/D6_four.png";
import D6_five from "./DiceImg/D6_five.png";
import D6_six from "./DiceImg/D6_six.png";

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

import Coin1 from "./DiceImg/Coin1.png";
import Coin2 from "./DiceImg/Coin2.png";
import coinSFX from "./DiceImg/coinSFX.wav";

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
  const [d20Count, setD20Count] = useState(1);
  const [coinCount, setCoinCount] = useState(1);
  const [showSkin, setShowSkin] = useState(false);
  const [isCoinFlipping, setIsCoinFlipping] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

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
  }, [isRolling, d6Count, d20Count]);

  const rollDice = () => {
    setIsRolling(true);
    setIsDiceVisible(true);
    setAnimationKey(prevKey => prevKey + 1);

    const diceAudio = new Audio(DiceSFX);
    diceAudio.playbackRate = 0.9 + Math.random() * 0.2;
    diceAudio.play();

    let counter = 0;
    const rollInterval = setInterval(() => {
      const d6Results = Array.from({ length: d6Count }, () => Math.floor(Math.random() * 6));
      const d20Results = Array.from({ length: d20Count }, () => Math.floor(Math.random() * 20));

      // Update images
      setD6Images(d6Results.map(i => D6Imgs[i]));
      setD20Images(d20Results.map(i => D20Imgs[i]));

      // Track results and unlocks
      if (counter === 9) {//1 below the real number, as arrays start from 0
        let newStats = { ...stats };
        let newUnlocked = [...unlockedSkins];

        d20Results.forEach((val) => {
          if (val === 19) { 
            newStats.nat20 += 1;
            if (newUnlocked[3] === false){
              alert("Woah, you rolled a 20!. You are now the king of the Castle! Castle Roller added to Skins.")
            }
            newUnlocked[3] = true; // Unlock CastleRoller
          }
          if (val === 0) {
            newStats.nat1 += 1;
            if (newUnlocked[4] === false){
              alert("Aww, you rolled a 1. Have Bakunawi Jr as a consolation. Added to Skins.")
            }
            newUnlocked[4] = true; // Unlock BakunawiJr
          }
        });

        d6Results.forEach((val) => {
          if (val === 0) newStats.d6nat6 += 1;
          if (val === 5) newStats.d6nat1 += 1;
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

  const flipCoin = () => {
    setIsCoinFlipping(true);
    setCoinImages([]); // Clear previous coin images
    const coinAudio = new Audio(coinSFX);
    coinAudio.playbackRate = 0.9 + Math.random() * 0.2;
    coinAudio.play();
  
    let counter = 0;
    let finalResults = []; // To store the final coin flip results
    const flipInterval = setInterval(() => {
      const results = Array.from({ length: coinCount }, () => Math.floor(Math.random() * 2)); // 0 = heads, 1 = tails
      finalResults = results; // Keep track of the latest results
  
      setCoinImages(results.map(i => CoinImgs[i])); // Update coin images during the flip
  
      counter++;
      if (counter >= 10) { // Stop the coin flip after 10 intervals
        clearInterval(flipInterval);
        setIsCoinFlipping(false);
        setIsDiceVisible(true);
        setAnimationKey(prev => prev + 1);
  
        // Update the statistics with the final results
        finalResults.forEach((res) => {
          if (res === 0) {
            setStats(prev => ({ ...prev, heads: prev.heads + 1 }));
          }
          if (res === 1) {
            setStats(prev => ({ ...prev, tails: prev.tails + 1 }));
          }
        });
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
      <button style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: 'white', borderRadius: '10px', padding: '10px' }} onClick={() => setStatsVisible(!statsVisible)}>
        Statistics
      </button>

      {statsVisible && (
        <div className="menu-overlay stats">
          <h2>Statistics</h2>
          <p>D20 Nat20s: {stats.nat20}</p>
          <p>D20 Nat1s: {stats.nat1}</p>
          <p>D6 Nat6s: {stats.d6nat6}</p>
          <p>D6 Nat1s: {stats.d6nat1}</p>
          <p>Coin Heads: {stats.heads}</p>
          <p>Coin Tails: {stats.tails}</p>
        </div>
      )}

      {/* Skin Selection */}
      {showMenu && (
        <div className="menu-overlay">
          <button className="close-btn" onClick={() => setShowMenu(false)}>
            <img src={Button_R} alt="Close" />
            <span>Close</span>
          </button>
          <button className="hide-btn" onClick={() => setShowSkin(!showSkin)}>
            <span>{showSkin ? 'Hide Skin' : 'Show Skin'}</span>
          </button>
          <h2>Select a Bakunawa Skin</h2>
          <div className="skin-options">
            {SkinImgs.map((skin, index) =>
              unlockedSkins[index] ? (
                <img key={index} src={skin} alt={`Skin ${index + 1}`} onClick={() => setCurrentSkinIndex(index)} style={{ width: '115px', height: '150px' }} />
              ) : null
            )}
          </div>
        </div>
      )}

      {/* Dice Settings Panel */}
      {showDiceSettings && (
        <div className="menu-overlay right">
          <button className="close-btn" onClick={() => setShowDiceSettings(false)}>
            <img src={Button_R} alt="Close" />
            <span>Close</span>
          </button>
          <br />
          <h2>D6 Count</h2>
          <button className="adjust-btn" onClick={() => setD6Count((prev) => Math.max(prev - 1, 0))}>-</button>
          <span className="count-display">{d6Count}</span>
          <button className="adjust-btn" onClick={() => totalDice < 10 && setD6Count((prev) => prev + 1)}>+</button>

          <h2>D20 Count</h2>
          <button className="adjust-btn" onClick={() => setD20Count((prev) => Math.max(prev - 1, 0))}>-</button>
          <span className="count-display">{d20Count}</span>
          <button className="adjust-btn" onClick={() => totalDice < 10 && setD20Count((prev) => prev + 1)}>+</button>

          <h2>Coin Flip Count</h2>
          <button className="adjust-btn" onClick={() => setCoinCount((prev) => Math.max(prev - 1, 0))}>-</button>
          <span className="count-display">{coinCount}</span>
          <button className="adjust-btn" onClick={() => totalDice < 10 && setCoinCount((prev) => prev + 1)}>+</button>

          <h2>Flip Coin</h2>
          <button className="coin-style" onClick={flipCoin}>Flip Coin</button>
        </div>
      )}

      {/* Instructions */}
      <h3 style={{ color: 'white' }}>This is a dice prototype! Test it out!</h3>
      <h5 style={{ color: 'white' }}>Click on the Bakunawa to roll the dice!</h5>

      <div style={{ marginBottom: '20px' }}>
        <button className="center-roll-btn" onClick={rollDice} disabled={isRolling}>
          Roll Dice
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