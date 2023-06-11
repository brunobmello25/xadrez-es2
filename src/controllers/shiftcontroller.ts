import { playerIsComputer, playerIsHuman } from "../helpers";
import { Board, Options } from "../models";
import { Movement } from "../models";
import { Color, PlayerType } from "../protocols";

export class ShiftController {
  private shift: Color = "white";

  private whiteType: PlayerType = "human";
  private blackType: PlayerType = "human";

  constructor(
    private readonly board: Board,
    private readonly options: Options
  ) {
    this.whiteType = "human";
    if (this.options.mode === "human-human") {
      this.blackType = "human";
    } else {
      this.blackType = "computer";
    }
  }

  currentShift() {
    return this.shift;
  }

  updateShift() {
    this.shift = this.shift === "white" ? "black" : "white";
  }

  canMove(movement: Movement) {
    if (this.board.isEmpty(movement.origin)) return false;
    if (this.board.hasOpponent(movement.origin, this.shift)) return false;

    const moves = this.board.getValidMoves(movement.origin);

    return moves.some((coord) =>
      coord.destination.equals(movement.destination)
    );
  }

  isHumanTurn() {
    return (
      (this.shift === "white" && playerIsHuman(this.whiteType)) ||
      (this.shift === "black" && playerIsHuman(this.blackType))
    );
  }

  isAiTurn() {
    return (
      (this.shift === "white" && playerIsComputer(this.whiteType)) ||
      (this.shift === "black" && playerIsComputer(this.blackType))
    );
  }

  reset() {
    this.shift = "white";
  }
}
