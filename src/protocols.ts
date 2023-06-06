export type Matrix<T> = T[][];

export type Color = "white" | "black";

export type PieceType =
  | "pawn"
  | "rook"
  | "knight"
  | "bishop"
  | "queen"
  | "king";

export type PlayerType = "human" | "computer";

export type DumbStatePiece = {
  color: Color;
  type: PieceType;
};

export type DumbState = Matrix<DumbStatePiece | null>;

export interface Engine {
  playTurn(): Promise<void>;
}

export type Difficulty = "easy" | "medium" | "hard";

export type Mode = "human-computer" | "human-human";
