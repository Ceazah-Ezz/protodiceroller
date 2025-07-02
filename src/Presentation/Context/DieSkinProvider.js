import { useState } from "react";
import { DieSkinContext } from "./DieSkinContext";
import BaseDieSkin from "../../Assets/DieSkins/BaseSkin/BaseDieSkin";
import "../Pages/Revamped.css";
export default function DieSkinProvider({ children }) {
  const [dieSkin, setDieSkin] = useState(new BaseDieSkin());

  const changeDieSkin = () => {};
  const getDieAssets = (dieType) => {
    switch (dieType) {
      case 4:
        return dieSkin.getD4Assets();
      case 6:
        return dieSkin.getD6Assets();
      case 8:
        return dieSkin.getD8Assets();
      case 12:
        return dieSkin.getD12Assets();
      case 20:
        return dieSkin.getD20Assets();
      case 100:
        return dieSkin.getD100Assets();
      default:
        return dieSkin.getD20Assets();
    }
  };

  return (
    <DieSkinContext.Provider value={{ dieSkin, setDieSkin, getDieAssets }}>
      {children}
    </DieSkinContext.Provider>
  );
}
