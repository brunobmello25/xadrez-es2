import { Color, PieceType } from "../../protocols";
import { Movement } from "../movement";
import { Board } from "../board";
import { Coord } from "../coord";
import { Piece } from "./piece";

export class Knight extends Piece {
  type: PieceType = "knight";

  constructor(color: Color) {
    super(color);
  }

  getPossibleMoves(board: Board, currentCoord: Coord): Movement[] {
    return this.getNormalMoves(board, currentCoord);
  }

  getNormalMoves(board: Board, currentCoord: Coord): Movement[] {
    const potentialMovesCoords: Coord[] = [
      new Coord(currentCoord.x + 1, currentCoord.y + 2),
      new Coord(currentCoord.x + 2, currentCoord.y + 1),
      new Coord(currentCoord.x + 2, currentCoord.y - 1),
      new Coord(currentCoord.x + 1, currentCoord.y - 2),
      new Coord(currentCoord.x - 1, currentCoord.y - 2),
      new Coord(currentCoord.x - 2, currentCoord.y - 1),
      new Coord(currentCoord.x - 2, currentCoord.y + 1),
      new Coord(currentCoord.x - 1, currentCoord.y + 2),
    ];

    return potentialMovesCoords
      .filter((coord) => {
        return (
          !coord.isOffBoard() &&
          (board.isEmpty(coord) || board.hasOpponent(coord, this.color))
        );
      })
      .map((coord) => new Movement(currentCoord, coord));
  }
}
