import { useMemo } from "react";
import { useDiceRenderer } from "../Hooks/useDiceRenderer";
import { useDieSkinHandler } from "../Hooks/useDieSkinHandler";

export default function DieComponent({ dieType, onDieClick = () => {} }) {
  const { currentDieFaces, updateDieFaces } = useDiceRenderer();
  const { getDieAssets } = useDieSkinHandler();
  const isStatic = !!dieType;
  const staticDieFace = useMemo(() => {
    const dieAssets = getDieAssets(dieType);
    return dieAssets[0];
  }, [getDieAssets, dieType]);
  console.log(currentDieFaces);
  if (isStatic) {
    return (
      <img
        className="relative w-16 h-16 cursor-pointer"
        src={staticDieFace}
        alt={`D${dieType}`}
        onClick={() => {
          onDieClick();
          updateDieFaces();
        }}
      />
    );
  } else {
    return (
      <div>
        {currentDieFaces.map(([dieFace, dieType], index) => {
          return (
            <img
              key={index}
              className="relative w-16 h-16 cursor-pointer"
              src={dieFace}
              alt={`D${dieType}`}
              onClick={() => {
                onDieClick(index);
                updateDieFaces();
              }}
            />
          );
        })}
      </div>
    );
  }
}
