import { Color } from "../../protocols";
import { Coord } from "../coord";

export class Rook {
  moveCount = 0;

  color: Color;

  type = "rook";

  constructor(color: Color) {
    this.color = color;
  }

  onMove() {
    this.moveCount += 1;
  }

  getValidMoves(): Coord[] {
    return [];
  }
}
