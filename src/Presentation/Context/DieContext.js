import { createContext } from "react";
import Die from "../../Application/Objects/Die";

export const DieContext = createContext([new Die(20)]);
