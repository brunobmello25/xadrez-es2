import { Color } from "../../protocols";
import { Coord } from "../coord";

export class King {
  moveCount = 0;

  color: Color;

  type = "king";

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
