import './App.css';
import { useState } from 'react';

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

function App() {
  // Store dice and skin images in arrays
  const DiceImgs = [Dice_1, Dice_2, Dice_3, Dice_4, Dice_5];
  const SkinImgs = [BakunawaRoller, BakunawaRollerG, BakunawaRollerR];

  // State variables for managing app behavior
  const [images, setImages] = useState([]);
  const [isRolling, setIsRolling] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [isDiceVisible, setIsDiceVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [currentSkinIndex, setCurrentSkinIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [showDiceSettings, setShowDiceSettings] = useState(false);
  const [diceCount, setDiceCount] = useState(1);

  // Handles dice rolling animation and results
  const rollDice = () => {
    setIsRolling(false);
    setTimeout(() => {
      setIsRolling(true);
      setAnimationKey((prevKey) => prevKey + 1); // Update key to force image rerender
    }, 50);

    setHasMoved(true);
    setIsDiceVisible(true);

    const audio = new Audio(DiceSFX);
    audio.play(); // Play dice roll sound

    let counter = 0;
    const rollInterval = setInterval(() => {
      // Randomly select dice images
      const newImages = Array.from({ length: diceCount }, () => DiceImgs[Math.floor(Math.random() * 5)]);
      setImages(newImages);
      counter++;
      if (counter >= 6) {
        clearInterval(rollInterval);
        // Final dice result
        const finalImages = Array.from({ length: diceCount }, () => DiceImgs[Math.floor(Math.random() * 5)]);
        setImages(finalImages);
        setIsRolling(false);
      }
    }, 200);
  };

  // Change Bakunawa skin based on selection
  const changeSkin = (index) => {
    setCurrentSkinIndex(index);
    setShowMenu(false);
  };

  // Adjust dice count within limits (1-10)
  const increaseDiceCount = () => setDiceCount((prev) => Math.min(prev + 1, 10));
  const decreaseDiceCount = () => setDiceCount((prev) => Math.max(prev - 1, 1));

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
              <img key={index} src={skin} alt={`Skin ${index + 1}`} onClick={() => changeSkin(index)} />
            ))}
          </div>
        </div>
      )}

      {/* Dice Settings Menu */}
      {showDiceSettings && (
        <div className="menu-overlay right">
          <button className="close-btn" onClick={() => setShowDiceSettings(false)}>Close</button>
          <h2>D5</h2>
          <button onClick={decreaseDiceCount}>-</button>
          {diceCount}
          <button onClick={increaseDiceCount}>+</button>
        </div>
      )}

      {/* Header Text */}
      <h3 style={{ color: 'white'}}>This is a dice prototype! Test it out!</h3>
      <h5 style={{ color: 'white' }}>Click on the Bakunawa to roll the dice!</h5>

      {/* Bakunawa Roller Section */}
      <div className={`image-container${isRolling || hasMoved ? ' rolling' : ''}`}>
        <button className={`bakunawa-button${isRolling ? ' rolling active' : ''}`} onClick={rollDice} disabled={isRolling}>
          <img key={animationKey} src={SkinImgs[currentSkinIndex]} alt="Bakunawa Roller" className="bakunawa" />
        </button>

        {/* Display Dice Results */}
        {isDiceVisible && images.length > 0 && (
          <div className="dice-container">
            {images.map((img, index) => (
              <img key={`${animationKey}-${index}`} src={img} alt="Dice Result" className={`dice${isRolling ? ' rolling-dice' : ''}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
