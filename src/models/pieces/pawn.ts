import { Color, PieceType } from "../../protocols";
import { Board } from "../board";
import { Coord } from "../coord";
import { Piece } from "./piece";

export class Pawn extends Piece {
  type: PieceType = "pawn";

  constructor(color: Color) {
    super(color);
  }

  getValidMoves(board: Board, currentCoord: Coord) {
    const coords = [];
    const direction = this.color == "white" ? -1 : 1;

    const forwardCoord = currentCoord.offsetFromCurrent(0, direction);
    if (board.isEmpty(forwardCoord)) {
      coords.push(forwardCoord);
    }

    if (this.moveCount == 0) {
      const doubleForwardCoord = currentCoord.offsetFromCurrent(
        0,
        direction * 2
      );
      if (board.isEmpty(doubleForwardCoord)) {
        coords.push(doubleForwardCoord);
      }
    }

    const leftDiagonalCoord = currentCoord.offsetFromCurrent(-1, direction);
    if (board.hasOpponent(leftDiagonalCoord, this.color)) {
      coords.push(leftDiagonalCoord);
    }

    const rightDiagonalCoord = currentCoord.offsetFromCurrent(1, direction);
    if (board.hasOpponent(rightDiagonalCoord, this.color)) {
      coords.push(rightDiagonalCoord);
    }

    return coords;
  }
}
