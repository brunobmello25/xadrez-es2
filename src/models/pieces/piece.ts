import { Color, DumbStatePiece, PieceType } from "../../protocols";
import { Movement } from "../Movement";
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

  abstract getPossibleMoves(board: Board, currentCoord: Coord): Movement[];

  onMove(_movement: Movement, _board: Board) {
    this.moveCount += 1;
  }

  toDumbState(): DumbStatePiece {
    return {
      type: this.type,
      color: this.color,
      moveCount: this.moveCount,
    };
  }
}
