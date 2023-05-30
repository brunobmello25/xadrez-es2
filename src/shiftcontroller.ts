import { playerIsComputer, playerIsHuman } from "./helpers";
import { Board } from "./models/board";
import { Coord } from "./models/coord";
import { Piece } from "./models/pieces";
import { Color, PlayerType } from "./protocols";

export class ShiftController {
  private shift: Color = "white";

  private whiteType: PlayerType = "human";
  private blackType: PlayerType = "computer";

  constructor(private readonly board: Board) {}

  currentShift() {
    return this.shift;
  }

  updateShift() {
    this.shift = this.shift === "white" ? "black" : "white";
  }

  hasOpponent(coord: Coord) {
    const piece = this.board.getFromCoord(coord);

    return piece && piece.color !== this.shift;
  }

  hasAlly(coord: Coord) {
    const piece = this.board.getFromCoord(coord);

    return piece && piece.color === this.shift;
  }

  isEmpty(coord: Coord) {
    return !this.board.getFromCoord(coord);
  }

  getPieceMoves(coord: Coord, piece: Piece) {
    return piece.getValidMoves(this, coord);
  }

  canMove(from: Coord, to: Coord) {
    const piece = this.board.getFromCoord(from);

    if (!piece) throw new Error("No piece to move");

    const moves = piece.getValidMoves(this, from);

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
}
