import { Movement } from "..";
import { Color, PieceType } from "../../protocols";
import { Board } from "../board";
import { Coord } from "../coord";
import { Piece } from "./piece";

export class Bishop extends Piece {
  type: PieceType = "bishop";

  constructor(color: Color) {
    super(color);
  }

  getPossibleMoves(board: Board, currentCoord: Coord): Movement[] {
    return this.getNormalMoves(board, currentCoord);
  }

  getNormalMoves(board: Board, currentCoord: Coord): Movement[] {
    const coords: Coord[] = [];

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
