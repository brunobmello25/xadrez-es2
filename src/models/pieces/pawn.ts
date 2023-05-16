import { Color, Piece, PieceType } from "../../protocols";
import { Board } from "../board";
import { Coord } from "../coord";

export class Pawn implements Piece {

  type: PieceType = "pawn";

  color: Color;

  moveCount = 0;

  constructor(color: Color) {
    this.color = color;
  }

  getValidMoves(board: Board, currentCoord: Coord) {
    const coords = [];
    const direction = this.color == "white" ? -1 : 1;

    const forwardCoord = currentCoord.offsetFromCurrent(0, direction);
    if (board.isEmpty(forwardCoord)) {
      coords.push(forwardCoord);
    }

    if (this.moveCount == 0) {
      const doubleForwardCoord = currentCoord.offsetFromCurrent(0, direction * 2);
      if (board.isEmpty(doubleForwardCoord)) {
        coords.push(doubleForwardCoord);
      }
    }

    const leftDiagonalCoord = currentCoord.offsetFromCurrent(-1, direction);
    if (board.hasEnemy(leftDiagonalCoord)) {
      coords.push(leftDiagonalCoord);
    }

    const rightDiagonalCoord = currentCoord.offsetFromCurrent(1, direction);
    if (board.hasEnemy(rightDiagonalCoord)) {
      coords.push(rightDiagonalCoord);
    }

    return coords;
  }

  onMove() {
    this.moveCount += 1;
  }
}
