import { Color, Piece, PieceType } from "../../protocols";
import { ShiftController } from "../../shiftcontroller";
import { Coord } from "../coord";

export class King implements Piece{
  moveCount = 0;

  color: Color;

  type: PieceType = "king";

  constructor(color: Color) {
    this.color = color;
  }

  onMove() {
    this.moveCount += 1;
  }

  getValidMoves(shiftController: ShiftController, currentCoord: Coord): Coord[] {
    const potentialMoves = [
      new Coord(currentCoord.x + 1, currentCoord.y + 1),
      new Coord(currentCoord.x + 1, currentCoord.y),
      new Coord(currentCoord.x + 1, currentCoord.y - 1),
      new Coord(currentCoord.x, currentCoord.y - 1),
      new Coord(currentCoord.x - 1, currentCoord.y - 1),
      new Coord(currentCoord.x - 1, currentCoord.y),
      new Coord(currentCoord.x - 1, currentCoord.y + 1),
      new Coord(currentCoord.x, currentCoord.y + 1),
    ];

    return potentialMoves.filter((coord) => {
      return !coord.isOffBoard() && (shiftController.isEmpty(coord) || shiftController.hasOpponent(coord));
    });
  }
}
