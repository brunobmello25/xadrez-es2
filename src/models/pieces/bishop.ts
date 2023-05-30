import { Color, PieceType } from "../../protocols";
import { ShiftController } from "../../shiftcontroller";
import { Coord } from "../coord";
import { Piece } from "./piece";

export class Bishop extends Piece {
  type: PieceType = "bishop";

  constructor(color: Color) {
    super(color);
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
