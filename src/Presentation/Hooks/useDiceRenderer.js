import { useContext, useMemo, useState, useEffect } from "react";
import { useDiceHandler } from "./useDiceHandler";
import { useDieSkinHandler } from "../useDieSkinHandler";

export function useDiceRenderer() {
  const { getDieAssets } = useDieSkinHandler();
  const { dice, isRolling } = useDiceHandler();
  const currentDieFaces = useMemo(() => {
    return dice.map((die) => {
      let dieAssets = getDieAssets(die.getDieType());
      let faceImgs = dieAssets.slice(0, -3);
      return faceImgs[die.getDieValue()];
    });
  }, [dice, getDieAssets]);

  useEffect(() => {
    if (isRolling) {
    }
  }, [isRolling]);

  return currentDieFaces;
}
