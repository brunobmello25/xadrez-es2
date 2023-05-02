import { Color } from "../../protocols";
import { Piece } from "./piece";

export class Bishop extends Piece {
  constructor(color: Color) {
    super('bishop', color);
  }
}
