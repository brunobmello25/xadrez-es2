import { Board } from "../models/board";
import { Coord } from "../models/coord";
import { Engine } from "../protocols";
import { BOARD_DIMENSIONS } from "../constants";
import { ShiftController } from "../controllers";
import { Movement } from "../models/Movement";
import { pickRandom } from "../helpers";

export class RandomEngine implements Engine {
  constructor(
    private readonly board: Board,
    private readonly shiftController: ShiftController
  ) {}

  async playTurn(): Promise<void> {
    const possibleMoves = this.getAllPossibleMoves();

    const movement: Movement = pickRandom(possibleMoves);

    await new Promise((resolve) => setTimeout(resolve, 800));

    this.board.movePiece(movement);
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

        validPieceMoves.forEach((movement) => {
          possibleMoves.push(movement);
        });
      }
    }

    return possibleMoves;
  }
}
