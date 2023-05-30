import { Color, PieceType } from "../../protocols";
import { ShiftController } from "../../shiftcontroller";
import { Coord } from "../coord";

export abstract class Piece {
  abstract type: PieceType;

  color: Color;

  moveCount: number;

  constructor(color: Color) {
    this.moveCount = 0;
    this.color = color;
  }

  abstract getValidMoves(
    shiftController: ShiftController,
    currentCoord: Coord
  ): Coord[];

  onMove() {
    this.moveCount += 1;
  }
}
