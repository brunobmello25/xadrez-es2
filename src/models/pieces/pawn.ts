import { Color, PieceType } from "../../protocols";
import { ShiftController } from "../../shiftcontroller";
import { Coord } from "../coord";
import { Piece } from "./piece";

export class Pawn extends Piece {
  type: PieceType = "pawn";

  constructor(color: Color) {
    super(color);
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
}
