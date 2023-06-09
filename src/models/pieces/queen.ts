import { Color, PieceType } from "../../protocols";
import { Movement } from "../movement";
import { Board } from "../board";
import { Coord } from "../coord";
import { Piece } from "./piece";

export class Queen extends Piece {
  type: PieceType = "queen";

  constructor(color: Color) {
    super(color);
  }

  getPossibleMoves(board: Board, currentCoord: Coord): Movement[] {
    return this.getNormalMoves(board, currentCoord);
  }

  getNormalMoves(board: Board, currentCoord: Coord): Movement[] {
    const coords: Coord[] = [];

    for (let i = currentCoord.y - 1; i >= 0; i--) {
      const coord = new Coord(currentCoord.x, i);
      if (board.isEmpty(coord)) {
        coords.push(coord);
      } else if (board.hasOpponent(coord, this.color)) {
        coords.push(coord);
        break;
      } else {
        break;
      }
    }

    // down
    for (let i = currentCoord.y + 1; i < 8; i++) {
      const coord = new Coord(currentCoord.x, i);
      if (board.isEmpty(coord)) {
        coords.push(coord);
      } else if (board.hasOpponent(coord, this.color)) {
        coords.push(coord);
        break;
      } else {
        break;
      }
    }

    // left
    for (let i = currentCoord.x - 1; i >= 0; i--) {
      const coord = new Coord(i, currentCoord.y);
      if (board.isEmpty(coord)) {
        coords.push(coord);
      } else if (board.hasOpponent(coord, this.color)) {
        coords.push(coord);
        break;
      } else {
        break;
      }
    }

    // right
    for (let i = currentCoord.x + 1; i < 8; i++) {
      const coord = new Coord(i, currentCoord.y);
      if (board.isEmpty(coord)) {
        coords.push(coord);
      } else if (board.hasOpponent(coord, this.color)) {
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

      if (board.isEmpty(coord)) {
        coords.push(coord);
      } else if (board.hasOpponent(coord, this.color)) {
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
      } else if (board.hasOpponent(coord, this.color)) {
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
      } else if (board.hasOpponent(coord, this.color)) {
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
      } else if (board.hasOpponent(coord, this.color)) {
        coords.push(coord);
        break;
      } else {
        break;
      }
    }

    return coords.map((coord) => new Movement(currentCoord, coord));
  }
}
