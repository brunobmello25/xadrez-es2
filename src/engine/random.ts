import { Board } from "../models/board";
import { Coord } from "../models/coord";
import { Engine, Movement } from "../protocols";
import { BOARD_DIMENSIONS } from "../constants";
import { ShiftController } from "../shiftcontroller";
import { Piece } from "../models/pieces";

export class RandomEngine implements Engine {
  constructor(private readonly board: Board, private readonly shiftController: ShiftController) {
  }

  async playTurn(): Promise<void> {
    const possibleMoves = this.getAllPossibleMoves();

    const movement: Movement = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    await new Promise((resolve) => setTimeout(resolve, 800));

    this.board.movePiece(movement.from, movement.to);
  }

  private getAllPossibleMoves(): Movement[] {
    const possibleMoves: Movement[] = [];

    for (let x = 0; x < BOARD_DIMENSIONS.width; x++) {
      for (let y = 0; y < BOARD_DIMENSIONS.height; y++) {
        const coord = new Coord(x, y);

        if (this.shiftController.isEmpty(coord) || this.shiftController.hasOpponent(coord)) continue;

        const piece = this.board.getFromCoord(coord) as Piece;

        const validPieceMoves = piece.getValidMoves(this.shiftController, coord);

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
