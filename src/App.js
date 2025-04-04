import './App.css';
import { useState, useEffect } from 'react';

// Import media in the folder. Ensure proper file names when adding!

import BakunawaRoller from "./DiceImg/BakunawaRoller.png"; // Roller Skins
import BakunawaRollerG from "./DiceImg/BakunawaRollerG.png";
import BakunawaRollerR from "./DiceImg/BakunawaRollerR.png";
import CastleRoller from "./DiceImg/CastleRoller.png";
import BakunawiJr from "./DiceImg/BakunawiJr.png";

import Button_Y from "./DiceImg/Button_Y.png"; // Button Colors
import Button_B from "./DiceImg/Button_B.png";
import Button_R from "./DiceImg/Button_R.png";

import DiceSFX from "./DiceImg/dicesfx.mp3"; // Sfx

import D6_one from "./DiceImg/D6_one.png"; // D6 Images
import D6_two from "./DiceImg/D6_two.png";
import D6_three from "./DiceImg/D6_three.png";
import D6_four from "./DiceImg/D6_four.png";
import D6_five from "./DiceImg/D6_five.png";
import D6_six from "./DiceImg/D6_six.png";

import D20_1 from "./DiceImg/d20_1.png"; // D20 Images
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

import Coin1 from "./DiceImg/Coin1.png"; // Coin flip assets
import Coin2 from "./DiceImg/Coin2.png";
import coinSFX from "./DiceImg/coinSFX.wav";

function App() {
  const SkinImgs = [BakunawaRoller, BakunawaRollerG, BakunawaRollerR, BakunawiJr, CastleRoller];
  const D6Imgs = [D6_six, D6_five, D6_four, D6_three, D6_two, D6_one];
  const D20Imgs = [D20_1, D20_2, D20_3, D20_4, D20_5, D20_6, D20_7, D20_8, D20_9, D20_10, D20_11, D20_11, D20_12, D20_13, D20_14, D20_15, D20_16, D20_17, D20_18, D20_19, D20_20];
  const CoinImgs = [Coin1, Coin2];

  // State management for dice, skin selection, visibility, and animations
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
  const [coinCount, setCoinCount] = useState(1); // Coin flip count

  // Shaking feature for mobile devices. Please test if coin flip works here
  useEffect(() => {
    let lastX = 0, lastY = 0, lastZ = 0, lastTime = 0;
    const SHAKE_THRESHOLD = 3;

    const handleMotion = (event) => {
      if (!event.accelerationIncludingGravity) return;

      const { x, y, z } = event.accelerationIncludingGravity;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastTime;

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
  }, [d6Count, d20Count]);

  // Handles dice rolling animation and sound effects
  const rollDice = () => {
    setIsRolling(true);
    setIsDiceVisible(true);
    setAnimationKey((prevKey) => prevKey + 1);

    const diceAudio = new Audio(DiceSFX);
    diceAudio.play();

    let counter = 0;
    const rollInterval = setInterval(() => {
      setD6Images(Array.from({ length: d6Count }, () => D6Imgs[Math.floor(Math.random() * 6)]));
      setD20Images(Array.from({ length: d20Count }, () => D20Imgs[Math.floor(Math.random() * 20)]));
      counter++;
      if (counter >= 10) {
        clearInterval(rollInterval);
        setIsRolling(false);
      }
    }, 100);
  };

  // Handles coin flipping animation and result
  const flipCoin = () => {
    setIsRolling(true); // Activate animation
    setCoinImages([]); // Clear previous coin result
    const coinAudio = new Audio(coinSFX);
    coinAudio.play();

    let counter = 0;
    const flipInterval = setInterval(() => {
      setCoinImages(Array.from({ length: coinCount }, () => CoinImgs[Math.floor(Math.random() * 2)])); // Randomly pick Coin1 or Coin2
      counter++;
      if (counter >= 10) {
        clearInterval(flipInterval);
        setIsRolling(false); // Stop the animation
      }
    }, 100);
  };

  return (
    <div className="App">
      <button className="menu-button" onClick={() => setShowMenu(true)}>
        <img src={Button_Y}/>
          <span>Skins</span>
        </button>
      <button className="dice-settings" onClick={() => setShowDiceSettings(true)}><img src={Button_B}/>
          <span>Dices & Etc.</span>
      </button>

      {/* Skin Selection Menu */}
      {showMenu && (
        <div className="menu-overlay">
          <button className="close-btn" onClick={() => setShowMenu(false)}>
            <img src={Button_R} />
            <span>Close</span>
          </button>
          <br></br>
          <h2>Select a Bakunawa Skin</h2>
          <div className="skin-options">
            {SkinImgs.map((skin, index) => (
              <img key={index} src={skin} alt={`Skin ${index + 1}`} onClick={() => setCurrentSkinIndex(index)} style={{ width: '115px', height: '150px' }} />
            ))}
          </div>
        </div> 
      )}

      {/* Dice Settings Menu */}
      {showDiceSettings && (
        <div className="menu-overlay right">
          <button className="close-btn" onClick={() => setShowDiceSettings(false)}><img src={Button_R} />
            <span>Close</span>
          </button>
          <br></br>
          <h2>D6 Count</h2>
          <button className="adjust-btn" onClick={() => setD6Count((prev) => Math.max(prev - 1, 0))}>-</button>
          <span className="count-display">{d6Count}</span>
          <button className="adjust-btn" onClick={() => setD6Count((prev) => Math.min(prev + 1, 10))}>+</button>
          <br></br>
          <h2>D20 Count</h2>
          <button className="adjust-btn" onClick={() => setD20Count((prev) => Math.max(prev - 1, 0))}>-</button>
          <span className="count-display">{d20Count}</span>
          <button className="adjust-btn" onClick={() => setD20Count((prev) => Math.min(prev + 1, 10))}>+</button>
          <br></br>
          <h2>Coin Flip Count</h2>
          <button className="adjust-btn" onClick={() => setCoinCount((prev) => Math.max(prev - 1, 0))}>-</button>
          <span className="count-display">{coinCount}</span>
          <button className="adjust-btn" onClick={() => setCoinCount((prev) => Math.min(prev + 1, 10))}>+</button>
          <br></br>
          <h2>Flip Coin</h2>
          <button className="coin-style" onClick={flipCoin}>Flip Coin</button>
          {coinImages.length > 0 && (
            <div className="coin-results">
              {coinImages.map((img, index) => (
                <img key={index} src={img} alt="Coin Flip Result" className="coin" />
              ))}
            </div>
          )}
        </div>
      )}

      <h3 style={{ color: 'white' }}>This is a dice prototype! Test it out!</h3>
      <h5 style={{ color: 'white' }}>Click on the Bakunawa to roll the dice!</h5>

      {/* Dice Roller Section */}
      <div className={`image-container${isRolling ? ' rolling' : ''}`}>
        <button className={`bakunawa-button${isRolling ? ' rolling active' : ''}`} onClick={rollDice} disabled={isRolling}>
          <img key={animationKey} src={SkinImgs[currentSkinIndex]} alt="Bakunawa Roller" className="bakunawa" />
        </button>
        {/* Display Dice Results */}
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
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
