import { Color, Type } from "../../protocols";

export class Piece {
  moveCount: number;

  type: Type;

  color: Color;

  constructor(type: Type, color: Color) {
    this.moveCount = 0;
    this.type = type;
    this.color = color;
  }

  onMove() {
    this.moveCount++;
  }

  getMoveCoords() {
    return [];
  }
}
