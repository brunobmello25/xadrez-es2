import { Board } from "./models/board";
import { Coord } from "./models/coord";
import { Piece } from "./models/pieces/piece";

export type Type = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king'

export type Color = 'white' | 'black'

export type Matrix<T> = Array<Array<T>>

export interface Movable {
  getMoveCoords(board: Board, currentCoord: Coord): Array<Coord>;
}

export interface Comparable {
  isEnemy(piece: Piece): boolean;
}
