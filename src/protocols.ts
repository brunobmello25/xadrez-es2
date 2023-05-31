import { Coord } from "./models/coord";

export type Matrix<T> = T[][];

export type Movement = {
  from: Coord;
  to: Coord;
};

export type Color = "white" | "black";

export type PieceType =
  | "pawn"
  | "rook"
  | "knight"
  | "bishop"
  | "queen"
  | "king";

export type PlayerType = "human" | "computer";

export type ViewPiece = {
  color: Color;
  type: PieceType;
};

export interface Engine {
  playTurn(): Promise<void>;
}

export type Difficulty = "easy" | "medium" | "hard";

export type Mode = "human-computer" | "human-human";
