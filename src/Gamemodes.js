//   Contains all functions of the Gamemodes of the dice roller! Please make a comment of the new game mode if you wish to add it
import { useState, useEffect } from 'react';
import { useDices } from './Dices';

import takeDice from "./DiceImg/takeDice.MP3";
import putDice from "./DiceImg/putDice.MP3";
import takeCoin from "./DiceImg/takeCoin.MP3";
import putCoin from "./DiceImg/putCoin.MP3";

export function useGamemodes ({
    d4Count, d6Count, d8Count, d10Count, d20Count, coinCount, finalD6Results, newStats, setAlertMsg, setD4Count, setD6Count, setD8Count, setD10Count, setD20Count, setCoinCount
})

{
    // Fives Gamemode
    const [fivesMode, setFivesMode] = useState(false);

    const playSound = (sound) => { //play dice roll sfx
    const audio = new Audio(sound);
    audio.playbackRate = 0.9 + Math.random() * 0.15;
    audio.play();
    };

    const totalDice = d4Count + d6Count + d8Count + d10Count + d20Count + coinCount; // calculates the total of dice

    const cancelFivesMode = () => setFivesMode(false); // Cancels gamemode

    // Functions below 
    const handleD4CountChange = (change) => {
      cancelFivesMode();
      if (change < 0 && d4Count > 0) {
          playSound(takeDice);
          setD4Count(prev => Math.max(prev + change, 0));
      } else if (change > 0 && totalDice < 10) {
          playSound(putDice);
          setD4Count(prev => prev + 1);
      }
      };

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

    const handleD8CountChange = (change) => {
        cancelFivesMode();
        if (change < 0 && d8Count > 0) {
            playSound(takeDice);
            setD8Count(prev => Math.max(prev + change, 0));
        } else if (change > 0 && totalDice < 10) {
            playSound(putDice);
            setD8Count(prev => prev + 1);
        }
        };

    const handleD10CountChange = (change) => {
        cancelFivesMode();
        if (change < 0 && d10Count > 0) {
            playSound(takeDice);
            setD10Count(prev => Math.max(prev + change, 0));
        } else if (change > 0 && totalDice < 10) {
            playSound(putDice);
            setD10Count(prev => prev + 1);
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

    const activateFivesMode = () => {
        setAlertMsg("Fives is a game where you get 5 dice and roll until you get 5 of a kind. First one to get it wins!");
        setFivesMode(true);
        setD4Count(0);
        setD6Count(5);
        setD8Count(0);
        setD10Count(0);
        setD20Count(0);
        setCoinCount(0); 
    };

    // This will execute once the player lands five of the same roll, length is the amount of images in the array
    useEffect(() => {
        if (!fivesMode || !finalD6Results || finalD6Results.length !== 5) return; 
        const timeout = setTimeout(() => {
          const allSame = finalD6Results.every(val => val === finalD6Results[0]);
          if (allSame) {
            setAlertMsg("FIVE!");
            newStats.fives += 1;
          }
        }, 50);      
        return () => clearTimeout(timeout);
      }, [finalD6Results, fivesMode]);


      
    /*This game mode is not working as intended, and has been commented out.
    To the next people fixing it, all you have to do is make sure that the game does not end until a player cannot have their remaining Int as 0.
     const startShutTheBox = () => {
       setAlertMsg("Roll two D6's to play. Whatever you roll, you must put down an equal amount as written on the blocks. If you cannot put down an equal amount, skip your turn, and record your score according to the blocks. Lowest Score wins.");
       setShowShutTheBoxSetup(true);
     };

     const initializeShutBoxGame = (players) => {
       const initialStates = Array.from({ length: players }, () => ({ blocks: Array(10).fill(false), done: false, score: 0 }));
       setShutBoxState(initialStates);
       setCurrentPlayerIndex(0);
       setDiceTotal(null);
       setIsShutBoxActive(true);
       rollShutBoxDice();
     };

        Separate Shut The Box roll logic to preserve global rollDice function
     const rollShutBoxDice = () => {
       setIsRolling(true);
       let counter = 0;
       let finalResults = [];

       if (d6Count > 0 || d20Count > 0) {
         const diceAudio = new Audio(DiceSFX);
         diceAudio.playbackRate = 0.85 + Math.random() * 0.15;
         diceAudio.play();
       }

       const rollInterval = setInterval(() => {
         let results;

         if (counter % 2 === 0) {
              When counter is an even number, show certain image
           results = [D6_corner, D6_corner];
         } else {
              Odd counter, show random
           finalResults = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
           results = finalResults.map(n => D6Imgs[6 - n]);
         }

         setD6Images(results);
         counter++;

         if (counter >= 8) {
           clearInterval(rollInterval);
           setIsRolling(false);
           shutBoxRollResults.current = finalResults;
           const total = finalResults.reduce((a, b) => a + b, 0);
           setDiceTotal(total);

           const hasValidMoves = getValidCombinations(total).length > 0;
           if (!hasValidMoves) {
             endTurn();    No combos possible, end turn automatically
           }
         }
       }, 100);
     };

     const renderShutBoxBlocks = () => {
       if (!shutBoxState.length) return null;
       const player = shutBoxState[currentPlayerIndex];
       return (
         <div className="shut-box-container">
           <h3 style={{ color: 'white' }}>Player {currentPlayerIndex + 1}'s Turn</h3>
           {diceTotal !== null && <h4 style={{ color: 'white' }}>Remaining: {diceTotal}</h4>}
           <div className="block-row">
             {player.blocks.map((isDown, i) => (
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
       );
     };

        Utility to get valid combinations from remaining blocks
   const getValidCombinations = (target) => {
     const player = shutBoxState[currentPlayerIndex];
     const available = player.blocks.map((down, i) => (!down ? i + 1 : null)).filter(Boolean);

     const results = [];
     const findCombos = (start, sum, path) => {
       if (sum === target) {
         results.push([...path]);
         return;
       }
       if (sum > target || start >= available.length) return;
       for (let i = start; i < available.length; i++) {
         findCombos(i + 1, sum + available[i], [...path, available[i]]);
       }
     };
     findCombos(0, 0, []);
     return results;
   };

     const handleBlockClick = (index) => {
       const value = index + 1;
       if (diceTotal === null || value > diceTotal) return;

       const updated = [...shutBoxState];
       updated[currentPlayerIndex].blocks[index] = true;
       setShutBoxState(updated);

       const newTotal = diceTotal - value;
     if (newTotal === 0) {
       endTurn();
     } else {
       setDiceTotal(newTotal);

          Auto-end turn if no valid combos exist anymore
       if (getValidCombinations(newTotal).length === 0) {
         endTurn();
       }
     }

     };

     const endTurn = () => {
       const updated = [...shutBoxState];
       const player = updated[currentPlayerIndex];
       const remaining = player.blocks.map((down, i) => (!down ? i + 1 : 0)).reduce((a, b) => a + b, 0);
       player.score = remaining;
       player.done = true;
       setShutBoxState(updated);

       if (updated.every(p => p.done)) {
         const winnerIndex = updated.reduce((minIdx, p, i, arr) => p.score < arr[minIdx].score ? i : minIdx, 0);
         setAlertMsg(`Player ${winnerIndex + 1} Won!`);
         setIsShutBoxActive(false);
         setD6Images([]);
         setDiceTotal(null);
       } else {
         const next = (currentPlayerIndex + 1) % shutBoxPlayers;
         setCurrentPlayerIndex(next);
         setDiceTotal(null);
         rollShutBoxDice();
       }
     };

     const exitShutBoxGame = () => {
       setIsShutBoxActive(false);
      setShutBoxState([]);
       setCurrentPlayerIndex(0);
       setDiceTotal(null);
       setD6Images([]);
      }; */

    return { alertMsg: '', fivesMode, finalD6Results, setAlertMsg, activateFivesMode, cancelFivesMode, handleCoinCountChange, handleD20CountChange, handleD6CountChange, handleD4CountChange, handleD8CountChange, handleD10CountChange, totalDice, playSound, setFivesMode, setD4Count, setD6Count, setD8Count, setD10Count, setD20Count, setCoinCount }; // Returns the functions and variables needed for the gamemode
}
