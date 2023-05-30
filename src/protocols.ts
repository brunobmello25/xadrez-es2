import { Board } from "./models/board";
import { Coord } from "./models/coord";

export type Matrix<T> = T[][];

export type Color = "white" | "black";

export type PieceType =
  | "pawn"
  | "rook"
  | "knight"
  | "bishop"
  | "queen"
  | "king";

export type ViewPiece = {
  color: Color;
  type: PieceType;
};

export interface Movable {
  moveCount: number;

  getValidMoves(board: Board, currentCoord: Coord): Coord[];

  onMove(): void;
}

export interface Piece extends Movable {
  color: Color;
  type: PieceType;
}
