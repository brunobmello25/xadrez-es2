import { Board } from "../models/board";
import { Coord } from "../models/coord";
import { Engine, Movement, Piece } from "../protocols";
import { BOARD_DIMENSIONS } from "../constants";

export class RandomEngine implements Engine {
  private board: Board;

  constructor(board: Board) {
    this.board = board;
  }

  playTurn(): void {
    const possibleMoves = this.getAllPossibleMoves();
    const movement: Movement = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    this.board.movePiece(movement.from, movement.to);
  }

  private getAllPossibleMoves(): Movement[] {
    const possibleMoves: Movement[] = [];

    for (let x = 0; x < BOARD_DIMENSIONS.width; x++) {
      for (let y = 0; y < BOARD_DIMENSIONS.height; y++) {
        const coord = new Coord(x, y);

        if (this.board.isEmpty(coord) || this.board.hasEnemy(coord)) continue;

        const piece = this.board.getFromCoord(coord) as Piece;

        const validPieceMoves = piece.getValidMoves(this.board, coord);

        validPieceMoves.forEach((to) => {
          possibleMoves.push({
            from: coord,
            to,
          });
        });
      }
    }

    return possibleMoves;
  }
}
