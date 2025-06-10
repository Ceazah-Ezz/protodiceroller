import d20_1 from "../../Assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_1.png";
import d20_2 from "../../Assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_2.png";
import d20_3 from "../../Assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_3.png";
import d20_4 from "../../Assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_4.png";
import d20_5 from "../../Assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_5.png";
import d20_6 from "../../Assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_6.png";
import d20_7 from "../../Assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_7.png";
import d20_8 from "../../Assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_8.png";
import d20_9 from "../../Assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_9.png";
import d20_10 from "../../Assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_10.png";
import d20_11 from "../../Assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_11.png";
import d20_12 from "../../Assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_12.png";
import d20_13 from "../../Assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_13.png";
import d20_14 from "../../Assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_14.png";
import d20_15 from "../../Assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_15.png";
import d20_16 from "../../Assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_16.png";
import d20_17 from "../../Assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_17.png";
import d20_18 from "../../Assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_18.png";
import d20_19 from "../../Assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_19.png";
import d20_20 from "../../Assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_20.png";
import d20_corner1 from "../../Assets/DieSkins/BaseSkin/D20/D20RollFrames/D20Roll1.png";
import d20_corner2 from "../../Assets/DieSkins/BaseSkin/D20/D20RollFrames/D20Roll2.png";
import d20_corner3 from "../../Assets/DieSkins/BaseSkin/D20/D20RollFrames/D20Roll3.png";

const baseD20Skin = [
  d20_1,
  d20_2,
  d20_3,
  d20_4,
  d20_5,
  d20_6,
  d20_7,
  d20_8,
  d20_9,
  d20_10,
  d20_11,
  d20_12,
  d20_13,
  d20_14,
  d20_15,
  d20_16,
  d20_17,
  d20_18,
  d20_19,
  d20_20,
  d20_corner1,
  d20_corner2,
  d20_corner3,
];

class DieSkin {
  constructor(Assets = baseD20Skin) {
    if (!Array.isArray(Assets)) {
      throw new TypeError("Assets must be an Array!");
    }
    this.dieAssets = Assets;
  }

  getDieAssets() {
    return this.dieAssets;
  }
}

export default DieSkin;
