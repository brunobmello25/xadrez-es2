import { Color } from "../../protocols";
import { Piece } from "./piece";

export class King extends Piece {
  constructor(color: Color) {
    super('king', color);
  }
}
