import { DieContext } from "./DieContext";
import { useDiceHandler } from "../Hooks/useDiceHandler";

import "../Pages/Revamped.css";

export default function DieProvider({ children }) {
  const {
    dice,
    handleAddDie,
    handleRemoveDie,
    handleRollDice,
    handleResetDice,
  } = useDiceHandler();
  return (
    <DieContext.Provider
      value={{
        dice,
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
