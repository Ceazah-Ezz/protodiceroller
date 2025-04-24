// Contains all functions of the Gamemodes of the dice roller! Please make a comment of the new game mode if you wish to add it
import { useState, useEffect } from 'react';
import { useDices } from './Dices';

import takeDice from "./DiceImg/takeDice.MP3";
import putDice from "./DiceImg/putDice.MP3";
import takeCoin from "./DiceImg/takeCoin.MP3";
import putCoin from "./DiceImg/putCoin.MP3";

export function useGamemodes ({
    d6Count, d20Count, coinCount, finalD6Results, newStats, setAlertMsg, setD6Count, setD20Count, setCoinCount
})

{
    // Fives Gamemode
    const [fivesMode, setFivesMode] = useState(false);

    const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.playbackRate = 0.9 + Math.random() * 0.15;
    audio.play();
    };

    const totalDice = d6Count + d20Count + coinCount; // calculates the total of dice

    const cancelFivesMode = () => setFivesMode(false); // Cancels gamemode

    // Functions below 
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

    const activateFivesMode = () => {
        setAlertMsg("Fives is a game where you get 5 dice and roll until you get 5 of a kind. First one to get it wins!");
        setFivesMode(true);
        setD6Count(5);
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

    return { alertMsg: '', fivesMode, finalD6Results, setAlertMsg, activateFivesMode, cancelFivesMode, handleCoinCountChange, handleD20CountChange, handleD6CountChange };
}
