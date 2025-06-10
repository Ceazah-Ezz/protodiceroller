import DieSkin from "./DieSkin";

class Die {
  constructor(die_assets, faceCount = 20) {
    if (!(die_assets instanceof DieSkin)) {
      throw new TypeError("die_assets must be a DieSkins Object!");
    }
    if (!Number.isInteger(faceCount)) {
      throw new TypeError("faceCount must be an Integer!");
    }
    this.dieFaceImgs = die_assets.getDieAssets().slice(0, faceCount);
    this.faceCount = faceCount;
    this.dieCornerImgs = die_assets.getDieAssets().slice(faceCount);
    this.dieValue = 1;
    this.isRolling = false;
    this.currentFaceImg = this.dieFaceImgs[0];
  }

  getDieFacesImgs() {
    return this.dieFaceImgs;
  }
  getFaceCount() {
    return this.faceCount;
  }
  getDieCornerImgs() {
    return this.dieCornerImgs;
  }
  getDieValue() {
    return this.dieValue;
  }
  getIsRolling() {
    return this.isRolling;
  }
  getCurrentFaceImg() {
    return this.currentFaceImg;
  }
  setIsRolling(value) {
    this.isRolling = value;
  }
  setCurrentFaceImg(faceImg) {
    this.currentFaceImg = faceImg;
  }

  roll() {
    this.dieValue = Math.floor(Math.random() * this.faceCount);
  }
}

export default Die;
