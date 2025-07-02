import { createContext } from "react";
import Die from "../../Domain/Objects/Die";

export const DieContext = createContext([new Die(20)]);
