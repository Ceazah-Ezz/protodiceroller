class Die {
  constructor(faceCount = 20) {
    if (!Number.isInteger(faceCount)) {
      throw new TypeError("faceCount must be an Integer!");
    }
    this.faceCount = faceCount;
    this.dieValue = 0;
  }

  getFaceCount() {
    return this.faceCount;
  }
  getDieValue() {
    return this.dieValue;
  }

  roll() {
    switch (this.faceCount) {
      case 100:
        this.dieValue = Math.floor((Math.random() * this.faceCount) % 10);
        break;
      default:
        this.dieValue = Math.floor(Math.random() * this.faceCount);
        break;
    }
  }
}

export default Die;
