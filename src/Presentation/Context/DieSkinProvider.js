import { useState } from "react";
import { DieSkinContext } from "./DieSkinContext";
import BaseDieSkin from "../../Assets/DieSkins/BaseSkin/BaseDieSkin";
import "../Pages/Revamped.css";
export default function DieSkinProvider({ children }) {
  const [dieSkin, setDieSkin] = useState(new BaseDieSkin());

  const changeDieSkin = () => {
    
  }

  return (
    <DieSkinContext.Provider value={{ dieSkin, setDieSkin }}>
      {children}
    </DieSkinContext.Provider>
  );
}
