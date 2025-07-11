import { DieContext } from "./DieContext";
import { useDiceHandler } from "../Hooks/useDiceHandler";

import "../Pages/Revamped.css";

export default function DieProvider({ children }) {
  const {
    dice,
    isRolling,
    setIsRolling,
    handleAddDie,
    handleRemoveDie,
    handleRollDice,
    handleResetDice,
  } = useDiceHandler();
  return (
    <DieContext.Provider
      value={{
        dice,
        isRolling,
        setIsRolling,
        handleAddDie,
        handleRemoveDie,
        handleRollDice,
        handleResetDice,
      }}
    >
      {children}
    </DieContext.Provider>
  );
}
