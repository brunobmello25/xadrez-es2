import { BOARD_DIMENSIONS } from "../constants";
import { ShiftController } from "../controllers";
import { pickRandom } from "../helpers";
import { Board, Coord, Movement } from "../models";
import { Color, DumbState, Engine, PromotablePiece } from "../protocols";

export class MinmaxEngine implements Engine {
  private readonly MAX_DEPTH = 5;

  constructor(
    private readonly board: Board,
    private readonly shiftController: ShiftController
  ) {}

  async pickPromotionPiece(): Promise<PromotablePiece> {
    const pieces: PromotablePiece[] = ["queen", "rook", "bishop", "knight"];

    return pickRandom(pieces);
  }

  async playTurn(): Promise<void> {
    const state = this.board.getState();
    const color = this.shiftController.currentShift();

    const bestMove = await this.minimax(
      this.MAX_DEPTH,
      -Infinity,
      Infinity,
      true,
      state,
      color
    );

    if (bestMove.movement === null) {
      const allPossibleMoves = this.getAllPossibleMoves();

      const randomMove = pickRandom(allPossibleMoves);

      bestMove.movement = randomMove;
    }

    this.board.movePiece(bestMove.movement);
  }

  private async minimax(
    depth: number,
    alpha: number,
    beta: number,
    maximizingPlayer: boolean,
    state: DumbState,
    myColor: Color
  ): Promise<{ value: number; movement: Movement | null }> {
    if (depth === 0) {
      return {
        value: this.evaluateBoard(myColor, state),
        movement: null,
      };
    }

    const possibleMoves = this.getAllPossibleMoves();

    let value;
    let chosenMovement: Movement | null = null;

    if (maximizingPlayer) {
      value = -Infinity;
      for (const move of possibleMoves) {
        this.move(state, move);
        const evaluation = await this.minimax(
          depth - 1,
          alpha,
          beta,
          false,
          state,
          myColor
        );
        this.undoMove(state, move);

        if (evaluation.value > value) {
          value = evaluation.value;
          chosenMovement = move;
        }
        alpha = Math.max(alpha, value);
        if (beta <= alpha) {
          break;
        }
      }
    } else {
      value = Infinity;
      for (const move of possibleMoves) {
        this.move(state, move);
        const evaluation = await this.minimax(
          depth - 1,
          alpha,
          beta,
          true,
          state,
          myColor
        );
        this.undoMove(state, move);
        if (evaluation.value < value) {
          value = evaluation.value;
          chosenMovement = move;
        }
        beta = Math.min(beta, value);
        if (beta <= alpha) {
          break;
        }
      }
    }
    return { value, movement: chosenMovement };
  }

  private evaluateBoard(myColor: Color, state: DumbState) {
    let score = 0;
    for (let x = 0; x < BOARD_DIMENSIONS.width; x++) {
      for (let y = 0; y < BOARD_DIMENSIONS.height; y++) {
        const coord = new Coord(x, y);
        const piece = state[coord.y][coord.x]; // TODO: refactor state to be a class with a "getFromCoord" method
        if (piece) {
          if (piece.color === myColor) {
            score += 1;
          } else {
            score -= 1;
          }
        }
      }
    }
    return score;
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

  private move(state: DumbState, move: Movement) {
    const { origin, destination } = move;
    state[destination.y][destination.x] = state[origin.y][origin.x];
    state[origin.y][origin.x] = null;
  }

  private undoMove(state: DumbState, move: Movement) {
    const { origin, destination } = move;
    state[origin.y][origin.x] = state[destination.y][destination.x];
    state[destination.y][destination.x] = null;
  }
}
