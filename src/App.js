import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

import BakunawaRoller from "./DiceImg/BakunawaRoller.png";
import Dice_1 from "./DiceImg/Dice_1.png";
import Dice_2 from "./DiceImg/Dice_2.png";
import Dice_3 from "./DiceImg/Dice_3.png";
import Dice_4 from "./DiceImg/Dice_4.png";
import Dice_5 from "./DiceImg/Dice_5.png";


function App() 
{
  var DiceImgs = {
    Dice_1,
    Dice_2,
    Dice_3,
    Dice_4,
    Dice_5
  }

  const [image, setNewImage] = useState(DiceImgs[0])

  const rollDice = () => {
    //Randomly select dice value
    var randomNum1 = Math.floor(Math.random() * 5);
  }

  return (
    <div className="App">
      <center>
        <br></br>
        <h1>This a dice prototype! Test it out!</h1>
        <h3>Click on the serpent to roll the dice!</h3>
        <br></br>
        <br></br>
        <a href="https://www.youtube.com/watch?v=p8OHccFLeDQ">
          <img src={BakunawaRoller} />
        </a>
        <div className=''></div>
      </center>
    </div>
  );
}

export default App;
