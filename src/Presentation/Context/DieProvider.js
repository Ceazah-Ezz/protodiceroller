import { useState } from "react";
import { DieContext } from "./DieContext";
import Die from "../../Application/Objects/Die";
import "../Pages/Revamped.css";

export default function DieProvider({ children }) {
  const [die, setDie] = useState([new Die(20)]);
  return (
    <DieContext.Provider value={{ die, setDie }}>
      {children}
    </DieContext.Provider>
  );
}
