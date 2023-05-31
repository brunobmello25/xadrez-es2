import { playerIsComputer, playerIsHuman } from "./helpers";
import { Board } from "./models/board";
import { Coord } from "./models/coord";
import { Color, PlayerType } from "./protocols";

export class ShiftController {
  private shift: Color = "white";

  private whiteType: PlayerType = "human";
  private blackType: PlayerType = "human";

  constructor(private readonly board: Board) {}

  currentShift() {
    return this.shift;
  }

  updateShift() {
    this.shift = this.shift === "white" ? "black" : "white";
  }

  canMove(from: Coord, to: Coord) {
    if (this.board.isEmpty(from)) return false;
    if (this.board.hasOpponent(from, this.shift)) return false;

    const moves = this.board.getValidMoves(from);

    return moves.some((coord) => coord.equals(to));
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
