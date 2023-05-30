import { Color, PieceType } from "../../protocols";
import { ShiftController } from "../../shiftcontroller";
import { Coord } from "../coord";
import { Piece } from "./piece";

export class Queen extends Piece {
  type: PieceType = "queen";

  constructor(color: Color) {
    super(color);
  }

  getValidMoves(shiftController: ShiftController, currentCoord: Coord): Coord[] {
    const coords: Coord[] = [];

    for (let i = currentCoord.y - 1; i >= 0; i--) {
      const coord = new Coord(currentCoord.x, i);
      if (shiftController.isEmpty(coord)) {
        coords.push(coord);
      } else if (shiftController.hasOpponent(coord)) {
        coords.push(coord);
        break;
      } else {
        break;
      }
    }

    // down
    for (let i = currentCoord.y + 1; i < 8; i++) {
      const coord = new Coord(currentCoord.x, i);
      if (shiftController.isEmpty(coord)) {
        coords.push(coord);
      } else if (shiftController.hasOpponent(coord)) {
        coords.push(coord);
        break;
      } else {
        break;
      }
    }

    // left
    for (let i = currentCoord.x - 1; i >= 0; i--) {
      const coord = new Coord(i, currentCoord.y);
      if (shiftController.isEmpty(coord)) {
        coords.push(coord);
      } else if (shiftController.hasOpponent(coord)) {
        coords.push(coord);
        break;
      } else {
        break;
      }
    }

    // right
    for (let i = currentCoord.x + 1; i < 8; i++) {
      const coord = new Coord(i, currentCoord.y);
      if (shiftController.isEmpty(coord)) {
        coords.push(coord);
      } else if (shiftController.hasOpponent(coord)) {
        coords.push(coord);
        break;
      } else {
        break;
      }
    }

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
