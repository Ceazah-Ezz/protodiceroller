import { useCallback, useState } from "react";
import BaseDieSkin from "../../Assets/DieSkins/BaseSkin/BaseDieSkin";
export function useDieSkinHandler() {
  const [dieSkin, setDieSkin] = useState(new BaseDieSkin());
  const changeDieSkin = () => {};
  const getDieAssets = useCallback(
    (dieType) => {
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
    },
    [dieSkin]
  );
  return {
    dieSkin,
    setDieSkin,
    changeDieSkin,
    getDieAssets,
  };
}
