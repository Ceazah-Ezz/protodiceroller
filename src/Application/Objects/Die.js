class Die {
  constructor(die_assets, faceCount) {
    if (!Array.isArray(die_assets)) {
      throw new TypeError("die_assets must be an Array!");
    }
    this.dieFaceImgs = die_assets.slice(0, -1);
    this.faceCount = faceCount;
    this.dieCornerImg = die_assets[die_assets.length - 1];
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
  getDieCornerImg() {
    return this.dieCornerImg;
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
    console.log("Rolling");
    this.dieValue = Math.floor(Math.random() * this.faceCount);
  }
}

export default Die;
