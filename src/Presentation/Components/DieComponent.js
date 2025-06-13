export default function DieComponent({
  die,
  dieSkin,
  onRemove = () => {},
  dieType,
  onAdd = () => {},
}) {
  // const handleRoll = () => {
  //   let counter = 0;

  //   const rollInterval = setInterval(() => {
  //     dieObj.roll();
  //     if (counter % 2 === 0) {
  //       dieObj.setCurrentFaceImg(
  //         dieObj.getDieCornerImgs()[dieObj.getDieValue() % 3]
  //       );
  //     } else {
  //       dieObj.setCurrentFaceImg(
  //         dieObj.getDieFacesImgs()[dieObj.getDieValue()]
  //       );
  //     }
  //     counter++;
  //     const clonedDie = Object.assign(
  //       Object.create(Object.getPrototypeOf(dieObj)),
  //       dieObj
  //     );
  //     setDieObj(clonedDie);
  //     if (counter >= 8) {
  //       clearInterval(rollInterval);
  //     }
  //   }, 100);
  // };

  if (dieType !== undefined) {
    let renderDieAssets = [];
    switch (dieType) {
      case 4:
        renderDieAssets.push(...dieSkin.getD4Assets());
        break;
      case 6:
        renderDieAssets.push(...dieSkin.getD6Assets());
        break;
      case 8:
        renderDieAssets.push(...dieSkin.getD8Assets());
        break;
      case 12:
        renderDieAssets.push(...dieSkin.getD12Assets());
        break;
      case 20:
        renderDieAssets.push(...dieSkin.getD20Assets());
        break;
      case 100:
        renderDieAssets.push(...dieSkin.getD100Assets());
        break;
      default:
        renderDieAssets.push(...dieSkin.getD20Assets());
        break;
    }

    return (
      <img
        className="relative w-12 h-12 cursor-pointer"
        src={renderDieAssets[0]}
        alt={`D${dieType}`}
        onClick={() => {
          onAdd();
        }}
      />
    );
  } else {
    let dieAssets = [];
    let dieAssetIndex = die.getDieValue() - 1;
    switch (die.getFaceCount()) {
      case 4:
        dieAssets.push(...dieSkin.getD4Assets());
        break;
      case 6:
        dieAssets.push(...dieSkin.getD6Assets());
        break;
      case 8:
        dieAssets.push(...dieSkin.getD8Assets());
        break;
      case 12:
        dieAssets.push(...dieSkin.getD12Assets());
        break;
      case 20:
        dieAssets.push(...dieSkin.getD20Assets());
        break;
      case 100:
        dieAssets.push(...dieSkin.getD100Assets());
        break;
      default:
        dieAssets.push(...dieSkin.getD20Assets());
        break;
    }
    return (
      <img
        className="relative w-12 h-12 cursor-pointer"
        src={dieAssets[dieAssetIndex]}
        alt={`D${die.getFaceCount()}`}
        onClick={() => {
          onRemove();
        }}
      />
    );
  }
}
