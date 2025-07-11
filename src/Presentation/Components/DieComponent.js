import { useMemo } from "react";
import { useDieSkinHandler } from "../Hooks/useDieSkinHandler";

export default function DieComponent({
  dieType,
  currentDieFaces,
  onDieClick = () => {},
}) {
  const { getDieAssets } = useDieSkinHandler();
  const isStatic = !!dieType;
  const staticDieFace = useMemo(() => {
    const dieAssets = getDieAssets(dieType);
    return dieAssets[0];
  }, [getDieAssets, dieType]);

  if (isStatic) {
    return (
      <img
        className="relative w-16 h-16 cursor-pointer"
        src={staticDieFace}
        alt={`D${dieType}`}
        onClick={() => {
          onDieClick();
        }}
      />
    );
  } else {
    return (
      <div className="display-dice-container">
        {currentDieFaces.map(([dieFace, dieType], index) => {
          return (
            <img
              key={index}
              className="relative w-16 h-16 cursor-pointer"
              src={dieFace}
              alt={`D${dieType}`}
              onClick={() => {
                onDieClick(index);
              }}
            />
          );
        })}
      </div>
    );
  }
}
