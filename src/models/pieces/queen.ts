import { Color } from "../../protocols";
import { Coord } from "../coord";

export class Queen {
  moveCount = 0;

  color: Color;

  type = "queen";

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
