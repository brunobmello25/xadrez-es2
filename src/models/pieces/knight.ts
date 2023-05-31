import { Color, PieceType } from "../../protocols";
import { Board } from "../board";
import { Coord } from "../coord";
import { Piece } from "./piece";

export class Knight extends Piece {
  type: PieceType = "knight";

  constructor(color: Color) {
    super(color);
  }

  getPossibleMoves(board: Board, currentCoord: Coord): Coord[] {
    const potentialMoves: Coord[] = [
      new Coord(currentCoord.x + 1, currentCoord.y + 2),
      new Coord(currentCoord.x + 2, currentCoord.y + 1),
      new Coord(currentCoord.x + 2, currentCoord.y - 1),
      new Coord(currentCoord.x + 1, currentCoord.y - 2),
      new Coord(currentCoord.x - 1, currentCoord.y - 2),
      new Coord(currentCoord.x - 2, currentCoord.y - 1),
      new Coord(currentCoord.x - 2, currentCoord.y + 1),
      new Coord(currentCoord.x - 1, currentCoord.y + 2),
    ];

    return potentialMoves.filter((coord) => {
      return (
        !coord.isOffBoard() &&
        (board.isEmpty(coord) || board.hasOpponent(coord, this.color))
      );
    });
  }
}
