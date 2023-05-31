import { Color, Piece, PieceType } from "../../protocols";
import { ShiftController } from "../../shiftcontroller";
import { Coord } from "../coord";

export class Pawn implements Piece {
  type: PieceType = "pawn";

  color: Color;

  moveCount = 0;

  constructor(color: Color) {
    this.color = color;
  }

  getValidMoves(shiftController: ShiftController, currentCoord: Coord) {
    const coords = [];
    const direction = this.color == "white" ? -1 : 1;

    const forwardCoord = currentCoord.offsetFromCurrent(0, direction);
    if (shiftController.isEmpty(forwardCoord)) {
      coords.push(forwardCoord);
    }

    if (this.moveCount == 0) {
      const doubleForwardCoord = currentCoord.offsetFromCurrent(0, direction * 2);
      if (shiftController.isEmpty(doubleForwardCoord)) {
        coords.push(doubleForwardCoord);
      }
    }

    const leftDiagonalCoord = currentCoord.offsetFromCurrent(-1, direction);
    if (shiftController.hasOpponent(leftDiagonalCoord)) {
      coords.push(leftDiagonalCoord);
    }

    const rightDiagonalCoord = currentCoord.offsetFromCurrent(1, direction);
    if (shiftController.hasOpponent(rightDiagonalCoord)) {
      coords.push(rightDiagonalCoord);
    }

    return coords;
  }

  onMove() {
    this.moveCount += 1;
  }
}
