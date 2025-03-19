import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

import BakunawaRoller from "./DiceImg/BakunawaRoller.png";
import Dice_1 from "./DiceImg/Dice_1.png";
import Dice_2 from "./DiceImg/Dice_2.png";
import Dice_3 from "./DiceImg/Dice_3.png";
import Dice_4 from "./DiceImg/Dice_4.png";
import Dice_5 from "./DiceImg/Dice_5.png";
import DiceSFX from "./DiceImg/dicesfx.mp3";

function App() 
{
  // Array containing dice images
  const DiceImgs = [Dice_1, Dice_2, Dice_3, Dice_4, Dice_5];
  
  // State variables to manage dice images, animation, and visibility
  const [image, setNewImage] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [isDiceVisible, setIsDiceVisible] = useState(false);

  // Handle dice rolling animation and visibility of dice.
  const rollDice = () => {
    setIsRolling(true); // Start the rolling animation
    setHasMoved(true); // Track that the dice has moved once
    setIsDiceVisible(true); // Ensure dice image becomes visible
    let counter = 0; //amount of images to shown before stopping on the last

    // Play dice sound effect. May want to change the name later.
    const audio = new Audio(DiceSFX);
    audio.play();

    // Interval to simulate rolling effect by switching images
    const rollInterval = setInterval(() => {
      const randomNum = Math.floor(Math.random() * 5);
      setNewImage(DiceImgs[randomNum]);
      counter++;

      // Stop rolling after 10 image changes and display the final result
      if (counter >= 10) {
        clearInterval(rollInterval);
        const finalNum = Math.floor(Math.random() * 5);
        setNewImage(DiceImgs[finalNum]);
        setIsRolling(false);
      }
    }, 200);
  };

  return (
    <div className="App" style={{ backgroundColor: '#001f3f', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1 style={{ color: 'white' }}>This is a dice prototype! Test it out!</h1>
      <h3 style={{ color: 'white' }}>Click on the Roll button to roll the dice!</h3>
      <div className={`image-container ${isRolling || hasMoved ? 'rolling' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Display Bakunawa image */}
        <img src={BakunawaRoller} alt="Bakunawa Roller" className="bakunawa" style={{ width: '250px', height: 'auto' }} />
        {/* Display Dice result if visible */}
        {isDiceVisible && image && <img src={image} alt="Dice Result" className={`dice ${isRolling ? 'rolling-dice' : 'final-dice'}`} style={{ width: '200px', height: 'auto' }} />}
      </div>
      {/* Roll Button */}
      <button
        id="rollButton"
        className={isRolling ? 'rolling active' : ''}
        onClick={rollDice}
        disabled={isRolling}
      >
        {isRolling ? 'Rolling...' : 'Roll'}
      </button>
    </div>
  );
}

export default App;
