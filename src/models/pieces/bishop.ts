import { Color } from "../../protocols";
import { Coord } from "../coord";

export class Bishop {
  color: Color;

  moveCount = 0;

  type = 'bishop'

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
