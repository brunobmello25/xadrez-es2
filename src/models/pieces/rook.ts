import { Color, PieceType } from "../../protocols";
import { Board } from "../board";
import { Coord } from "../coord";
import { Piece } from "./piece";

export class Rook extends Piece {
  type: PieceType = "rook";

  constructor(color: Color) {
    super(color);
  }

  getPossibleMoves(board: Board, currentCoord: Coord): Coord[] {
    const coords: Coord[] = [];

    // up
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

    return coords;
  }
}
