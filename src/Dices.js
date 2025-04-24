// This file contains all Dice, Roller, and Skin functions!
import { useState, useEffect } from 'react';
import { useGamemodes } from './Gamemodes';

//Rollers
import BakunawaRoller from "./DiceImg/BakunawaRoller.png";
import BakunawaRollerG from "./DiceImg/BakunawaRollerG.png";
import BakunawaRollerR from "./DiceImg/BakunawaRollerR.png";
import CastleRoller from "./DiceImg/CastleRoller.png";
import BakunawiJr from "./DiceImg/BakunawiJr.png";

//DiceSFX
import DiceSFX from "./DiceImg/dicesfx.mp3";
import takeDice from "./DiceImg/takeDice.MP3";
import putDice from "./DiceImg/putDice.MP3";

//D4 Images
import D4_1 from "./DiceImg/d4_1.png";
import D4_2 from "./DiceImg/d4_2.png";
import D4_3 from "./DiceImg/d4_3.png";
import D4_4 from "./DiceImg/d4_4.png";
import D4_corner from "./DiceImg/d4_corner.png";

//D6 Images
import D6_one from "./DiceImg/D6_one.png";
import D6_two from "./DiceImg/D6_two.png";
import D6_three from "./DiceImg/D6_three.png";
import D6_four from "./DiceImg/D6_four.png";
import D6_five from "./DiceImg/D6_five.png";
import D6_six from "./DiceImg/D6_six.png";
import D6_corner from "./DiceImg/D6_corner.png";

//D8 Images
import D8_1 from "./DiceImg/d8_1.png";
import D8_2 from "./DiceImg/d8_2.png";
import D8_3 from "./DiceImg/d8_3.png";
import D8_4 from "./DiceImg/d8_4.png";
import D8_5 from "./DiceImg/d8_5.png";
import D8_6 from "./DiceImg/d8_6.png";
import D8_7 from "./DiceImg/d8_7.png";
import D8_8 from "./DiceImg/d8_8.png";
import D8_corner from "./DiceImg/d8_corner.png";

//D10 Images
import D10_0 from "./DiceImg/d10_0.png";
import D10_1 from "./DiceImg/d10_1.png";
import D10_2 from "./DiceImg/d10_2.png";
import D10_3 from "./DiceImg/d10_3.png";
import D10_4 from "./DiceImg/d10_4.png";
import D10_5 from "./DiceImg/d10_5.png";
import D10_6 from "./DiceImg/d10_6.png";
import D10_7 from "./DiceImg/d10_7.png";
import D10_8 from "./DiceImg/d10_8.png";
import D10_9 from "./DiceImg/d10_9.png";
import D10_10 from "./DiceImg/d10_10.png";

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

export function useDices() {
  const SkinImgs = [BakunawaRoller, BakunawaRollerG, BakunawaRollerR, CastleRoller, BakunawiJr];
  const D4Imgs = [D4_1, D4_2, D4_3, D4_4];
  const D6Imgs = [D6_six, D6_five, D6_four, D6_three, D6_two, D6_one];
  const D8Imgs = [D8_1, D8_2, D8_3, D8_4, D8_5, D8_6, D8_7, D8_8];
  const D10Imgs = [D10_0, D10_1, D10_2, D10_3, D10_4, D10_5, D10_6, D10_7, D10_8, D10_9, D10_10];
  const D20Imgs = [D20_1, D20_2, D20_3, D20_4, D20_5, D20_6, D20_7, D20_8, D20_9, D20_10, D20_11, D20_12, D20_13, D20_14, D20_15, D20_16, D20_17, D20_18, D20_19, D20_20];
  const CoinImgs = [Coin1, Coin2];
  const [finalD6Results, setFinalD6Results] = useState([]);
  const [alertMsg, setAlertMsg] = useState("");
  
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
  const [d4Images, setD4Images] = useState([]);
  const [d4Count, setD4Count] = useState(0);
  const [d8Images, setD8Images] = useState([]);
  const [d8Count, setD8Count] = useState(0);
  const [d10Images, setD10Images] = useState([]);
  const [d10Count, setD10Count] = useState(0);

  const [stats, setStats] = useState({
    nat20: 0,
    nat1: 0,
    d6nat6: 0,
    d6nat1: 0,
    d4nat4: 0,
    d4nat1: 0,
    d8nat8: 0,
    d8nat1: 0,
    d10nat10: 0,
    d10nat1: 0,
    heads: 0,
    tails: 0,
    fives: 0,
  });

  const {handleD4CountChange, handleD6CountChange, handleD8CountChange, handleD10CountChange, handleD20CountChange, handleCoinCountChange} = useGamemodes({
    d4Count,
    d6Count,
    d8Count,
    d10Count,
    d20Count,
    coinCount,
    setD4Count,
    setD6Count,
    setD8Count,
    setD10Count,
    setD20Count,
    setCoinCount,
    finalD6Results,
    stats,
    newStats: stats,
    setAlertMsg
  });

  const [unlockedSkins, setUnlockedSkins] = useState([true, true, true, false, false]);
  
     // Effect to update dice images immediately when their counts change
     useEffect(() => {
      const spawnDice = () => {
        const d4Results = Array.from({ length: d4Count }, () => Math.floor(Math.random() * 4));
        const d6Results = Array.from({ length: d6Count }, () => Math.floor(Math.random() * 6));
        const d8Results = Array.from({ length: d8Count }, () => Math.floor(Math.random() * 8));
        const d10Results = Array.from({ length: d10Count }, () => Math.floor(Math.random() * 10));
        const d20Results = Array.from({ length: d20Count }, () => Math.floor(Math.random() * 20));
        const coinResults = Array.from({ length: coinCount }, () => Math.floor(Math.random() * 2));
  
        setD4Images(d4Results.map(i => D4Imgs[i]));
        setD6Images(d6Results.map(i => D6Imgs[i]));
        setD8Images(d8Results.map(i => D8Imgs[i]));
        setD10Images(d10Results.map(i => D10Imgs[i]));
        setD20Images(d20Results.map(i => D20Imgs[i]));
        setCoinImages(coinResults.map(i => CoinImgs[i]));
      };
  
      spawnDice();
    }, [d4Count, d6Count, d8Count, d10Count, d20Count, coinCount]);
  
    const rollDice = () => {
      setIsRolling(true);
      setIsDiceVisible(true);
      setAnimationKey(prevKey => prevKey + 1);
    
      // Play dice SFX only if there are dice
      if (d6Count > 0 || d20Count > 0 || d4Count > 0 || d8Count > 0 || d10Count > 0) {
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
        let d4Results, d6Results, d8Results, d10Results, d20Results, coinResults;
    
        if (counter % 2 === 0) {
          // When counter is an even number, show certain image
          d4Results = Array.from({ length: d4Count }, () => D4_corner);
          d6Results = Array.from({ length: d6Count }, () => D6_corner);
          d8Results = Array.from({ length: d8Count }, () => D8_corner);
          d10Results = Array.from({ length: d10Count }, () => D10_0);
          d20Results = Array.from({ length: d20Count }, () => D20_corner);
          coinResults = Array.from({ length: coinCount }, () => CoinMid);
        } else {
          // Odd counter, show random
          d4Results = Array.from({ length: d4Count }, () => D4Imgs[Math.floor(Math.random() * 4)]);
          d6Results = Array.from({ length: d6Count }, () => D6Imgs[Math.floor(Math.random() * 6)]);
          d8Results = Array.from({ length: d8Count }, () => D8Imgs[Math.floor(Math.random() * 8)]);
          d10Results = Array.from({ length: d10Count }, () => D10Imgs[Math.floor(Math.random() * 10)]);
          d20Results = Array.from({ length: d20Count }, () => D20Imgs[Math.floor(Math.random() * 20)]);
          coinResults = Array.from({ length: coinCount }, () => CoinImgs[Math.floor(Math.random() * 2)]);
        }
    
        setD4Images(d4Results);
        setD6Images(d6Results);
        setD8Images(d8Results);
        setD10Images(d10Results);
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

          d4Results.forEach((img) => {
            const val = D4Imgs.indexOf(img);
            if (val === 0) newStats.d4nat4 += 1;
            if (val === 3) newStats.d4nat1 += 1;
          });

          d8Results.forEach((img) => {
            const val = D8Imgs.indexOf(img);
            if (val === 0) newStats.d8nat8 += 1;
            if (val === 7) newStats.d8nat1 += 1;
          });

          d10Results.forEach((img) => {
            const val = D10Imgs.indexOf(img);
            if (val === 0) newStats.d10nat10 += 1;
            if (val === 9) newStats.d6nat1 += 1;
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

    return {
      SkinImgs, D4Imgs, D6Imgs, D8Imgs, D10Imgs, D20Imgs, CoinImgs,
      d4Images, d6Images, d8Images, d10Images, d20Images, coinImages, isRolling, isDiceVisible,
      animationKey, currentSkinIndex, showMenu, showDiceSettings,
      d4Count, d6Count, d8Count, d10Count, d20Count, coinCount, showSkin, statsVisible, showGameSettings,
      shakeEnabled,  stats, unlockedSkins, alertMsg, setD4Count, setD6Count, setD8Count, setD10Count, setD20Count, setCoinCount,
      finalD6Results,
      setShowMenu, setShowDiceSettings, setD4Count, setD6Count, setD8Count, setD10Count, setD20Count, setCoinCount,
      setShowSkin, setStatsVisible, setShowGameSettings,
      setShakeEnabled, setCurrentSkinIndex, setAlertMsg,
      handleD4CountChange, handleD6CountChange, handleD8CountChange, handleD10CountChange, handleD20CountChange, handleCoinCountChange,
      rollDice 
    };
}