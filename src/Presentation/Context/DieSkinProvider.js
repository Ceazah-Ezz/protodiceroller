import { DieSkinContext } from "./DieSkinContext";
import { useDieSkinHandler } from "../Hooks/useDieSkinHandler";
import "../Pages/Revamped.css";
export default function DieSkinProvider({ children }) {
  const { dieSkin, setDieSkin, changeDieSkin, getDieAssets } =
    useDieSkinHandler();

  return (
    <DieSkinContext.Provider
      value={{ dieSkin, setDieSkin, changeDieSkin, getDieAssets }}
    >
      {children}
    </DieSkinContext.Provider>
  );
}
