import d4_1 from "./d4_1.png";
import d4_2 from "./d4_2.png";
import d4_3 from "./d4_3.png";
import d4_4 from "./d4_4.png";
import d4_corner from "./d4_corner.png";

import Die from "../../Application/Objects/Die";

const base_skin = [d4_1, d4_2, d4_3, d4_4, d4_corner];

class Base_D4 extends Die {
  constructor(skin = base_skin) {
    const d4_Assets = skin;
    const faces = 4;
    super(d4_Assets, faces);
  }
}

export default Base_D4;
