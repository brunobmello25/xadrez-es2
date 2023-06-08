import {
  Bishop,
  King,
  Knight,
  Pawn,
  Piece,
  Queen,
  Rook,
} from "./models/pieces";
import { Matrix, PlayerType } from "./protocols";

export function playerIsHuman(player: PlayerType): player is "human" {
  return player === "human";
}

export function playerIsComputer(player: PlayerType): player is "computer" {
  return player === "computer";
}

export function makeInitialBoard(): Matrix<Piece | null> {
  const board = Array(8)
    .fill([])
    .map(() => Array(8).fill(null));

  board[0][0] = new Rook("black");
  board[0][1] = new Knight("black");
  board[0][2] = new Bishop("black");
  board[0][3] = new Queen("black");
  board[0][4] = new King("black");
  board[0][5] = new Bishop("black");
  board[0][6] = new Knight("black");
  board[0][7] = new Rook("black");

  for (let i = 0; i < 8; i++) {
    board[1][i] = new Pawn("black");
  }

  board[7][0] = new Rook("white");
  board[7][1] = new Knight("white");
  board[7][2] = new Bishop("white");
  board[7][3] = new Queen("white");
  board[7][4] = new King("white");
  board[7][5] = new Bishop("white");
  board[7][6] = new Knight("white");
  board[7][7] = new Rook("white");

  for (let i = 0; i < 8; i++) {
    board[6][i] = new Pawn("white");
  }

  return board;
}

export function pickRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
