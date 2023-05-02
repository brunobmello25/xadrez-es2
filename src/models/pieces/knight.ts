import { Color } from "../../protocols";
import { Piece } from "./piece";

export class Knight extends Piece {
  constructor(color: Color) {
    super('knight', color);
  }
}
