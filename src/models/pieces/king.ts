import { Color, PieceType } from "../../protocols";
import { Board } from "../board";
import { Coord } from "../coord";
import { Piece } from "./piece";

export class King extends Piece {
  type: PieceType = "king";

  constructor(color: Color) {
    super(color);
  }

  getPossibleMoves(board: Board, currentCoord: Coord): Coord[] {
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
      return (
        !coord.isOffBoard() &&
        (board.isEmpty(coord) || board.hasOpponent(coord, this.color))
      );
    });
  }
}
