import { Color, DumbStatePiece, PieceType } from "../../protocols";
import { Board } from "../board";
import { Coord } from "../coord";

export abstract class Piece {
  abstract type: PieceType;

  color: Color;

  moveCount: number;

  constructor(color: Color) {
    this.moveCount = 0;
    this.color = color;
  }

  abstract getPossibleMoves(board: Board, currentCoord: Coord): Coord[];

  onMove() {
    this.moveCount += 1;
  }

  toDumbState(): DumbStatePiece {
    return {
      type: this.type,
      color: this.color,
    };
  }
}
