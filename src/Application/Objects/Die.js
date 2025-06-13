class Die {
  constructor(faceCount = 20) {
    if (!Number.isInteger(faceCount)) {
      throw new TypeError("faceCount must be an Integer!");
    }
    this.faceCount = faceCount;
    this.dieValue = 1;
    this.isRolling = false;
  }

  getFaceCount() {
    return this.faceCount;
  }
  getDieValue() {
    return this.dieValue;
  }
  getIsRolling() {
    return this.isRolling;
  }
  setIsRolling(value) {
    this.isRolling = value;
  }

  roll() {
    this.dieValue = Math.floor(Math.random() * this.faceCount);
  }
}

export default Die;
