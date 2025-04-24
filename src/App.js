import './App.css';
import { useState, useEffect, useRef } from 'react';

import DiceTray from "./DiceImg/DiceTray.png";

import AlertBox from './AlertBox'; // use this instead of alert()

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
import D6_corner from "./DiceImg/D6_corner.png";

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
import D20_corner from "./DiceImg/d20_corner.png";

//Coin Assets
import Coin1 from "./DiceImg/Coin1.png";
import Coin2 from "./DiceImg/Coin2.png";
import CoinMid from "./DiceImg/CoinMid.png";
import coinSFX from "./DiceImg/coinSFX.MP3";
import takeCoin from "./DiceImg/takeCoin.MP3";
import putCoin from "./DiceImg/putCoin.MP3";

//Containers
import ContainerSelector from "./DiceImg/Dice_Container_top.png";
import DiceContainer from "./DiceImg/Dice_Container_body.png";

function App() {
  const SkinImgs = [BakunawaRoller, BakunawaRollerG, BakunawaRollerR, CastleRoller, BakunawiJr];
  const D6Imgs = [D6_six, D6_five, D6_four, D6_three, D6_two, D6_one];
  const D20Imgs = [
    D20_1, D20_2, D20_3, D20_4, D20_5, D20_6, D20_7, D20_8, D20_9, D20_10,
    D20_11, D20_12, D20_13, D20_14, D20_15, D20_16, D20_17, D20_18, D20_19, D20_20];
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
  const [showGameSettings, setShowGameSettings] = useState(false);
  const [shakeEnabled, setShakeEnabled] = useState(true);
  const [fivesMode, setFivesMode] = useState(false);
  const totalDice = d6Count + d20Count + coinCount;
  // const [showShutTheBoxSetup, setShowShutTheBoxSetup] = useState(false);
  // const [shutBoxPlayers, setShutBoxPlayers] = useState(1);
  // const [shutBoxState, setShutBoxState] = useState([]);
  // const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  // const [diceTotal, setDiceTotal] = useState(null);
  const [alertMsg, setAlertMsg] = useState('');
  // const [isShutBoxActive, setIsShutBoxActive] = useState(false);
  const [unlockedSkins, setUnlockedSkins] = useState([true, true, true, false, false]);
  const cancelFivesMode = () => setFivesMode(false);
  // const shutBoxRollResults = useRef([]);

  

  const [stats, setStats] = useState({
    nat20: 0,
    nat1: 0,
    d6nat6: 0,
    d6nat1: 0,
    heads: 0,
    tails: 0,
    fives: 0,
  });

  //play sound effect for selecting dice
  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.playbackRate = 0.9 + Math.random() * 0.15;
    audio.play();
  };
  //SELECTING DICE FUNCTIONS
  const handleD6CountChange = (change) => {
    cancelFivesMode();
    if (change < 0 && d6Count > 0) {
      playSound(takeDice);
      setD6Count(prev => Math.max(prev + change, 0));
    } else if (change > 0 && totalDice < 10) {
      playSound(putDice);
      setD6Count(prev => prev + 1);
    }
  };

  const handleD20CountChange = (change) => {
    cancelFivesMode();
    if (change < 0 && d20Count > 0) {
      playSound(takeDice);
      setD20Count(prev => Math.max(prev + change, 0));
    } else if (change > 0 && totalDice < 10) {
      playSound(putDice);
      setD20Count(prev => prev + 1);
    }
  };

  const handleCoinCountChange = (change) => {
    cancelFivesMode();
    if (change < 0 && coinCount > 0) {
      playSound(takeCoin);
      setCoinCount(prev => Math.max(prev + change, 0));
    } else if (change > 0 && totalDice < 10) {
      playSound(putCoin);
      setCoinCount(prev => prev + 1);
    }
  };

  //GAME MODE FUNCTIONS
  
  //This game mode is not working as intended, and has been commented out.
  //To the next people fixing it, all you have to do is make sure that the game does not end until a player cannot have their remaining Int as 0.
//   const startShutTheBox = () => {
//     setAlertMsg("Roll two D6's to play. Whatever you roll, you must put down an equal amount as written on the blocks. If you cannot put down an equal amount, skip your turn, and record your score according to the blocks. Lowest Score wins.");
//     setShowShutTheBoxSetup(true);
//   };

//   const initializeShutBoxGame = (players) => {
//     const initialStates = Array.from({ length: players }, () => ({ blocks: Array(10).fill(false), done: false, score: 0 }));
//     setShutBoxState(initialStates);
//     setCurrentPlayerIndex(0);
//     setDiceTotal(null);
//     setIsShutBoxActive(true);
//     rollShutBoxDice();
//   };

//   // Separate Shut The Box roll logic to preserve global rollDice function
//   const rollShutBoxDice = () => {
//     setIsRolling(true);
//     let counter = 0;
//     let finalResults = [];

//     if (d6Count > 0 || d20Count > 0) {
//       const diceAudio = new Audio(DiceSFX);
//       diceAudio.playbackRate = 0.85 + Math.random() * 0.15;
//       diceAudio.play();
//     }

//     const rollInterval = setInterval(() => {
//       let results;

//       if (counter % 2 === 0) {
//         // When counter is an even number, show certain image
//         results = [D6_corner, D6_corner];
//       } else {
//         // Odd counter, show random
//         finalResults = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
//         results = finalResults.map(n => D6Imgs[6 - n]);
//       }

//       setD6Images(results);
//       counter++;

//       if (counter >= 8) {
//         clearInterval(rollInterval);
//         setIsRolling(false);
//         shutBoxRollResults.current = finalResults;
//         const total = finalResults.reduce((a, b) => a + b, 0);
//         setDiceTotal(total);

//         const hasValidMoves = getValidCombinations(total).length > 0;
//         if (!hasValidMoves) {
//           endTurn(); // No combos possible, end turn automatically
//         }
//       }
//     }, 100);
//   };

//   const renderShutBoxBlocks = () => {
//     if (!shutBoxState.length) return null;
//     const player = shutBoxState[currentPlayerIndex];
//     return (
//       <div className="shut-box-container">
//         <h3 style={{ color: 'white' }}>Player {currentPlayerIndex + 1}'s Turn</h3>
//         {diceTotal !== null && <h4 style={{ color: 'white' }}>Remaining: {diceTotal}</h4>}
//         <div className="block-row">
//           {player.blocks.map((isDown, i) => (
//             <div
//               key={i}
//               className={`block value-${i + 1} ${isDown ? 'down' : 'up'} ${(diceTotal !== null && !isDown && diceTotal < i + 1) ? 'disabled' : ''}`}
//               onClick={() => handleBlockClick(i)}
//             >
//               {i + 1}
//             </div>
//           ))}
//         </div>
//         <div className="button-row">
//           <button className="end-btn" onClick={endTurn}>End Turn</button>
//           <button className="exit-btn" onClick={exitShutBoxGame}>Exit Game</button>
//         </div>
//       </div>
//     );
//   };

//   // Utility to get valid combinations from remaining blocks
// const getValidCombinations = (target) => {
//   const player = shutBoxState[currentPlayerIndex];
//   const available = player.blocks.map((down, i) => (!down ? i + 1 : null)).filter(Boolean);

//   const results = [];
//   const findCombos = (start, sum, path) => {
//     if (sum === target) {
//       results.push([...path]);
//       return;
//     }
//     if (sum > target || start >= available.length) return;
//     for (let i = start; i < available.length; i++) {
//       findCombos(i + 1, sum + available[i], [...path, available[i]]);
//     }
//   };
//   findCombos(0, 0, []);
//   return results;
// };

//   const handleBlockClick = (index) => {
//     const value = index + 1;
//     if (diceTotal === null || value > diceTotal) return;

//     const updated = [...shutBoxState];
//     updated[currentPlayerIndex].blocks[index] = true;
//     setShutBoxState(updated);

//     const newTotal = diceTotal - value;
//   if (newTotal === 0) {
//     endTurn();
//   } else {
//     setDiceTotal(newTotal);

//     // Auto-end turn if no valid combos exist anymore
//     if (getValidCombinations(newTotal).length === 0) {
//       endTurn();
//     }
//   }

//   };

//   const endTurn = () => {
//     const updated = [...shutBoxState];
//     const player = updated[currentPlayerIndex];
//     const remaining = player.blocks.map((down, i) => (!down ? i + 1 : 0)).reduce((a, b) => a + b, 0);
//     player.score = remaining;
//     player.done = true;
//     setShutBoxState(updated);

//     if (updated.every(p => p.done)) {
//       const winnerIndex = updated.reduce((minIdx, p, i, arr) => p.score < arr[minIdx].score ? i : minIdx, 0);
//       setAlertMsg(`Player ${winnerIndex + 1} Won!`);
//       setIsShutBoxActive(false);
//       setD6Images([]);
//       setDiceTotal(null);
//     } else {
//       const next = (currentPlayerIndex + 1) % shutBoxPlayers;
//       setCurrentPlayerIndex(next);
//       setDiceTotal(null);
//       rollShutBoxDice();
//     }
//   };

//   const exitShutBoxGame = () => {
//     setIsShutBoxActive(false);
//     setShutBoxState([]);
//     setCurrentPlayerIndex(0);
//     setDiceTotal(null);
//     setD6Images([]);
//   };
  
  const activateFivesMode = () => {
    setAlertMsg("Fives is a game where you get 5 dice and roll until you get 5 of a kind. First one to get it wins!");
    setFivesMode(true);
    setD6Count(5);
    setD20Count(0);
    setCoinCount(0);
  };

  const handleRemoveDice = (index) => {
    if (isRolling) return;
    if (index < d6Count) {
      handleD6CountChange(-1);
    } else if (index < d6Count + d20Count) {
      handleD20CountChange(-1);
    } else {
      handleCoinCountChange(-1);
    }
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

  //ROLLING DICE FUNCTION
  const rollDice = () => {
    setIsRolling(true);
    setIsDiceVisible(true);
    setAnimationKey(prevKey => prevKey + 1);
  
    // Play dice SFX only if there are dice
    if (d6Count > 0 || d20Count > 0) {
      const diceAudio = new Audio(DiceSFX);
      diceAudio.playbackRate = 0.85 + Math.random() * 0.15;
      diceAudio.play();
    }
  
    // Play coin SFX only if there are coins
    if (coinCount > 0) {
      const coinAudio = new Audio(coinSFX);
      coinAudio.playbackRate = 0.85 + Math.random() * 0.15;
      coinAudio.play();
    }
  
    let counter = 0; //amount of image switches
    let finalCoinResults = [];
  
    const rollInterval = setInterval(() => {
      let finalD6Results = [];
      let d6Results, d20Results, coinResults;
  
      if (counter % 2 === 0) {
        // When counter is an even number, show certain image
        d6Results = Array.from({ length: d6Count }, () => D6_corner);
        d20Results = Array.from({ length: d20Count }, () => D20_corner);
        coinResults = Array.from({ length: coinCount }, () => CoinMid);
      } else {
        // Odd counter, show random
        d6Results = Array.from({ length: d6Count }, () => D6Imgs[Math.floor(Math.random() * 6)]);
        d20Results = Array.from({ length: d20Count }, () => D20Imgs[Math.floor(Math.random() * 20)]);
        coinResults = Array.from({ length: coinCount }, () => CoinImgs[Math.floor(Math.random() * 2)]);
      }
  
      setD6Images(d6Results);
      setD20Images(d20Results);
      setCoinImages(coinResults);
  
      // Save real coin results for stat tracking
      if (counter % 2 !== 0) {
        finalCoinResults = coinResults.map(img => CoinImgs.indexOf(img));
      }
  
      // Track results and unlocks
      //WHEN CHANGING MAX AMOUNT OF IMAGES SWITCHES NEAR THE END OF THIS FUNCTION, CHANGE THIS TOO
      if (counter === 7) { //1 below the real number, as arrays start from 0. 
        let newStats = { ...stats };
        let newUnlocked = [...unlockedSkins];

        if (fivesMode) {
          const allSame = finalD6Results.every(val => val === finalD6Results[0]);
          if (allSame && finalD6Results.length === 5) {
            setAlertMsg("FIVE!");
            newStats.fives += 1;
          }
        }
  
        d20Results.forEach((img) => {
          const val = D20Imgs.indexOf(img);
          if (val === 19) {
            newStats.nat20 += 1;
            if (!newUnlocked[3]) {
              setAlertMsg("Woah, you rolled a 20!. You are now the king of the Castle! Castle Roller added to Skins.");
            }
            newUnlocked[3] = true;
          }
          if (val === 0) {
            newStats.nat1 += 1;
            if (!newUnlocked[4]) {
               setAlertMsg("Aww, you rolled a 1. Have Bakunawi Jr as a consolation. Added to Skins.");
            }
            newUnlocked[4] = true;
          }
        });
  
        d6Results.forEach((img) => {
          const val = D6Imgs.indexOf(img);
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
  
      counter++; //WHEN CHANGING MAX AMOUNT OF IMAGES SWITCHES BELOW, CHANGE ABOVE STAT CHECKER TOO
      if (counter >= 8) { //change number to control amount of image switched. ENSURE THIS IS AN EVEN NUMBER
        clearInterval(rollInterval);
        setIsRolling(false);
      }
    }, 100); //delay per image switch
  };
  
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
        {/* {/* <div style={{ marginTop: '20px' }}>
          <h2>Shut The Box</h2>
          <button className="adjust-btn" onClick={startShutTheBox}>Play Shut The Box</button>
        </div> */}
      </div>

      {/* Shut The Box Setup UI
      {showShutTheBoxSetup && (
        <div className="menu-overlay right show">
          <button className="close-btn" onClick={() => setShowShutTheBoxSetup(false)}>
            <img src={Button_R} alt="Close" />
            <span>Close</span>
          </button>
          <h2>Choose Number of Players</h2>
          {[2, 3, 4].map((n) => (
            <button
              key={n}
              className="adjust-btn"
              onClick={() => {
                setShutBoxPlayers(n);
                initializeShutBoxGame(n);
                setShowShutTheBoxSetup(false);
              }}
            >
              {n} Player{n > 1 ? 's' : ''}
            </button>
          ))}
        </div>
      )}

      {/* Shut The Box Game UI */}
      {/*shutBoxState.length > 0 && isShutBoxActive && (
  <div className="shut-box-container">
    <h3 style={{ color: 'white' }}>Player {currentPlayerIndex + 1}'s Turn</h3>
    {diceTotal !== null && <h4 style={{ color: 'white' }}>Remaining: {diceTotal}</h4>}
    <div className="block-row">
      {shutBoxState[currentPlayerIndex].blocks.map((isDown, i) => (
        <div
          key={i}
          className={`block value-${i + 1} ${isDown ? 'down' : 'up'} ${(diceTotal !== null && !isDown && diceTotal < i + 1) ? 'disabled' : ''}`}
          onClick={() => handleBlockClick(i)}
        >
          {i + 1}
        </div>
      ))}
    </div>
    <div className="button-row">
      <button className="end-btn" onClick={endTurn}>End Turn</button>
      <button className="exit-btn" onClick={exitShutBoxGame}>Exit Game</button>
    </div>
  </div>
)}


      {/* Instructions */}
      <h3 style={{ color: 'white' }}>This is a dice prototype! Test it out!</h3>
      <h5 style={{ color: 'white' }}>Click on the Button or Skin to roll the dice!</h5>
      <h5 style={{ color: 'white' }}>If you are on Mobile you can also shake to roll the dice!</h5>

      <div className={`image-container${isRolling ? ' rolling' : ''}`}>
        {showSkin && (
          <button className={`bakunawa-button${isRolling ? ' rolling active' : ''}`} onClick={rollDice} disabled={isRolling}>
            <img key={animationKey} src={SkinImgs[currentSkinIndex]} alt="Bakunawa Roller" className="bakunawa" />
          </button>
        )}

      <div className="dice-container-top" >
        <img src={D6_six} alt="D6" onClick={() => handleD6CountChange(1)}/>
        <img src={D20_20} alt="D20" onClick={() => handleD20CountChange(1)}/>
        <img src={Coin1} alt="Coin" onClick={() => handleCoinCountChange(1)}/>
      </div>

        {isDiceVisible && (
          <div>
            <div className="dice-container" >
            {[...d6Images, ...d20Images, ...coinImages].map((img, index) => (
              <img key={`all-${animationKey}-${index}`} src={img} alt="Roll Result" className="dice" onClick={() => handleRemoveDice(index)} title="Click to remove" style={{ cursor: 'pointer' }} />
            ))}
            </div>
          </div>
        )}
      <div style={{ marginBottom: '20px' }}>
        <button className="center-roll-btn" onClick={rollDice} disabled={isRolling}>
          <img src={DiceButton} alt="DiceButton" style={{width: '100px', height: '100px'}}/>
        </button>
      </div>
      </div>
      {alertMsg && (
        <AlertBox message={alertMsg} onClose={() => setAlertMsg('')} />
      )}
    </div>
  );
}

export default App;