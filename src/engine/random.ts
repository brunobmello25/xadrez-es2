import { Board } from "../models/board";
import { Coord } from "../models/coord";
import { Engine, Movement } from "../protocols";
import { BOARD_DIMENSIONS } from "../constants";
import { ShiftController } from "../controllers";

export class RandomEngine implements Engine {
  constructor(
    private readonly board: Board,
    private readonly shiftController: ShiftController
  ) {}

  async playTurn(): Promise<void> {
    const possibleMoves = this.getAllPossibleMoves();

    const movement: Movement =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    await new Promise((resolve) => setTimeout(resolve, 800));

    this.board.movePiece(movement.from, movement.to);
  }

  private getAllPossibleMoves(): Movement[] {
    const possibleMoves: Movement[] = [];

    for (let x = 0; x < BOARD_DIMENSIONS.width; x++) {
      for (let y = 0; y < BOARD_DIMENSIONS.height; y++) {
        const coord = new Coord(x, y);

        if (
          this.board.isEmpty(coord) ||
          this.board.hasOpponent(coord, this.shiftController.currentShift())
        )
          continue;

        const validPieceMoves = this.board.getValidMoves(coord);

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
