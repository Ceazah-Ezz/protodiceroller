import './App.css';
import { useState, useEffect } from 'react';

// Import images and sound effects
import BakunawaRoller from "./DiceImg/BakunawaRoller.png";
import BakunawaRollerG from "./DiceImg/BakunawaRollerG.png";
import BakunawaRollerR from "./DiceImg/BakunawaRollerR.png";
import Dice_1 from "./DiceImg/Dice_1.png";
import Dice_2 from "./DiceImg/Dice_2.png";
import Dice_3 from "./DiceImg/Dice_3.png";
import Dice_4 from "./DiceImg/Dice_4.png";
import Dice_5 from "./DiceImg/Dice_5.png";
import DiceSFX from "./DiceImg/dicesfx.mp3";
import D6_one from "./DiceImg/D6_one.png";
import D6_two from "./DiceImg/D6_two.png";
import D6_three from "./DiceImg/D6_three.png";
import D6_four from "./DiceImg/D6_four.png";
import D6_five from "./DiceImg/D6_five.png";
import D6_six from "./DiceImg/D6_six.png";

function App() {
  // Store dice and skin images in arrays for easy access
  const DiceImgs = [Dice_1, Dice_2, Dice_3, Dice_4, Dice_5];
  const D6Imgs = [D6_one, D6_two, D6_three, D6_four, D6_five, D6_six];
  const SkinImgs = [BakunawaRoller, BakunawaRollerG, BakunawaRollerR];

  // State variables to manage dice images, animations, and UI visibility
  const [d5Images, setD5Images] = useState([]);
  const [d6Images, setD6Images] = useState([]);
  const [isRolling, setIsRolling] = useState(false);
  const [isDiceVisible, setIsDiceVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [currentSkinIndex, setCurrentSkinIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [showDiceSettings, setShowDiceSettings] = useState(false);
  const [d5Count, setD5Count] = useState(1);
  const [d6Count, setD6Count] = useState(1);

  // Handles the dice rolling logic and animations
  const rollDice = () => {
    setIsRolling(true);
    setIsDiceVisible(true);
    setAnimationKey((prevKey) => prevKey + 1);

    // Play dice roll sound
    const audio = new Audio(DiceSFX);
    audio.play();

    let counter = 0;
    const rollInterval = setInterval(() => {
      // Randomly select images for D5 and D6 dice
      const newD5Images = Array.from({ length: d5Count }, () => DiceImgs[Math.floor(Math.random() * 5)]);
      const newD6Images = Array.from({ length: d6Count }, () => D6Imgs[Math.floor(Math.random() * 6)]);
      setD5Images(newD5Images);
      setD6Images(newD6Images);
      counter++;

      // After 3 repeats, show the result
      if (counter >= 3) {
        clearInterval(rollInterval);
        const finalD5Images = Array.from({ length: d5Count }, () => DiceImgs[Math.floor(Math.random() * 5)]);
        const finalD6Images = Array.from({ length: d6Count }, () => D6Imgs[Math.floor(Math.random() * 6)]);
        setD5Images(finalD5Images);
        setD6Images(finalD6Images);
        setIsRolling(false);
      }
    }, 200);
  };

  // Function to change the Bakunawa skin
  const changeSkin = (index) => {
    setCurrentSkinIndex(index);
    setShowMenu(false);
  };

  return (
    <div className="App">
      {/* Menu and Dice Settings Buttons */}
      <button className="menu-button" onClick={() => setShowMenu(true)}>Menu</button>
      <button className="dice-settings" onClick={() => setShowDiceSettings(true)}>Dice Settings</button>

      {/* Skin Selection Menu */}
      {showMenu && (
        <div className="menu-overlay">
          <button className="close-btn" onClick={() => setShowMenu(false)}>Close</button>
          <h2>Select a Bakunawa Skin</h2>
          <div className="skin-options">
            {SkinImgs.map((skin, index) => (
              <img key={index} src={skin} alt={`Skin ${index + 1}`} onClick={() => changeSkin(index)} style={{ width: '80px', height: '80px' }} />
            ))}
          </div>
        </div>
      )}

      {/* Dice Settings Menu */}
      {showDiceSettings && (
        <div className="menu-overlay right">
          <button className="close-btn" onClick={() => setShowDiceSettings(false)}>Close</button>
          <h2>D5 Count</h2>
          <button className="adjust-btn" onClick={() => setD5Count((prev) => Math.max(prev - 1, 0))}>-</button>
          <span className="count-display">{d5Count}</span>
          <button className="adjust-btn" onClick={() => setD5Count((prev) => Math.min(prev + 1, 10))}>+</button>

          <h2>D6 Count</h2>
          <button className="adjust-btn" onClick={() => setD6Count((prev) => Math.max(prev - 1, 0))}>-</button>
          <span className="count-display">{d6Count}</span>
          <button className="adjust-btn" onClick={() => setD6Count((prev) => Math.min(prev + 1, 10))}>+</button>
        </div>
      )}

      {/* Header Text */}
      <h3 style={{ color: 'white' }}>This is a dice prototype! Test it out!</h3>
      <h5 style={{ color: 'white' }}>Click on the Bakunawa to roll the dice!</h5>

      {/* Dice Roller Section */}
      <div className={`image-container${isRolling ? ' rolling' : ''}`}>
        <button className={`bakunawa-button${isRolling ? ' rolling active' : ''}`} onClick={rollDice} disabled={isRolling}>
          <img key={animationKey} src={SkinImgs[currentSkinIndex]} alt="Bakunawa Roller" className="bakunawa" />
        </button>

        {/* Display Results of the Dice Roll */}
        {isDiceVisible && (
          <div className="dice-container">
            {d5Images.map((img, index) => (
              <img key={`d5-${animationKey}-${index}`} src={img} alt="D5 Result" className="dice" />
            ))}
            {d6Images.map((img, index) => (
              <img key={`d6-${animationKey}-${index}`} src={img} alt="D6 Result" className="dice d6-dice" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;