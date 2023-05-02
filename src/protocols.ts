import { Bishop, King, Knight, Pawn, Queen, Rook } from "./models/pieces";

export type Piece = Pawn | Rook | Knight | Bishop | Queen | King;

export type Matrix<T> = T[][];

export type Color = 'white' | 'black';

export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';

export type ViewPiece = {
  color: Color;
  type: PieceType;
}

