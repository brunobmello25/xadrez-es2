import { Color } from "../../protocols";
import { Board } from "../board";
import { Coord } from "../coord";

export class Bishop {
  color: Color;

  moveCount = 0;

  type = "bishop";

  constructor(color: Color) {
    this.color = color;
  }

  onMove() {
    this.moveCount += 1;
  }

  getValidMoves(board: Board, currentCoord: Coord): Coord[] {
    const coords: Coord[] = [];

    // up-left
    for (let i = 1; i < 8; i++) {
      const coord = new Coord(currentCoord.x - i, currentCoord.y - i);
      if (coord.isOffBoard()) {
        break;
      }

      if (board.isEmpty(coord)) {
        coords.push(coord);
      } else if (board.hasEnemy(coord)) {
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

      if (board.isEmpty(coord)) {
        coords.push(coord);
      } else if (board.hasEnemy(coord)) {
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

      if (board.isEmpty(coord)) {
        coords.push(coord);
      } else if (board.hasEnemy(coord)) {
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

      if (board.isEmpty(coord)) {
        coords.push(coord);
      } else if (board.hasEnemy(coord)) {
        coords.push(coord);
        break;
      } else {
        break;
      }
    }

    return coords;
  }
}
