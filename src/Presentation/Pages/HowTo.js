import "./HowTo.css";
function HowTo({ onExit = () => {} }) {
  return (
    <div className="how-to-container">
      <div>
        <h2>HOW TO PLAY</h2>
        <hr></hr>
        <li>Click a dice to add in the PlayMat</li>
        <li>Click the “Roll” button to roll</li>
        <li>Navigate dice options with the arrows</li>
        <li>Click on a dice on the PlayMat to remove them</li>
        <button onClick={() => onExit()}>✕</button>
      </div>
    </div>
  );
}

export default HowTo;
