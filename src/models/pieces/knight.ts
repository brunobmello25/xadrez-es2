import { Color } from "../../protocols";
import { Coord } from "../coord";

export class Knight {
  moveCount = 0;

  color: Color;

  type = "knight";

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
