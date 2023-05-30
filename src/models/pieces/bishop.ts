import { Color, Piece, PieceType } from "../../protocols";
import { ShiftController } from "../../shiftcontroller";
import { Coord } from "../coord";

export class Bishop implements Piece {
  color: Color;

  moveCount = 0;

  type: PieceType = "bishop";

  constructor(color: Color) {
    this.color = color;
  }

  onMove() {
    this.moveCount += 1;
  }

  getValidMoves(shiftController: ShiftController, currentCoord: Coord): Coord[] {
    const coords: Coord[] = [];

    // up-left
    for (let i = 1; i < 8; i++) {
      const coord = new Coord(currentCoord.x - i, currentCoord.y - i);
      if (coord.isOffBoard()) {
        break;
      }

      if (shiftController.isEmpty(coord)) {
        coords.push(coord);
      } else if (shiftController.hasOpponent(coord)) {
        coords.push(coord);
        break;
      } else {
        break;
      }
    }

    // up-right
    for (let i = 1; i < 8; i++) {
      const coord = new Coord(currentCoord.x + i, currentCoord.y - i);

      if (coord.isOffBoard()) {
        break;
      }

      if (shiftController.isEmpty(coord)) {
        coords.push(coord);
      } else if (shiftController.hasOpponent(coord)) {
        coords.push(coord);
        break;
      } else {
        break;
      }
    }

    // down-left
    for (let i = 1; i < 8; i++) {
      const coord = new Coord(currentCoord.x - i, currentCoord.y + i);

      if (coord.isOffBoard()) {
        break;
      }

      if (shiftController.isEmpty(coord)) {
        coords.push(coord);
      } else if (shiftController.hasOpponent(coord)) {
        coords.push(coord);
        break;
      } else {
        break;
      }
    }

    // down-right
    for (let i = 1; i < 8; i++) {
      const coord = new Coord(currentCoord.x + i, currentCoord.y + i);

      if (coord.isOffBoard()) {
        break;
      }

      if (shiftController.isEmpty(coord)) {
        coords.push(coord);
      } else if (shiftController.hasOpponent(coord)) {
        coords.push(coord);
        break;
      } else {
        break;
      }
    }

    return coords;
  }
}
