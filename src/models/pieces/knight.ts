import { Color, Piece, PieceType } from "../../protocols";
import { Board } from "../board";
import { Coord } from "../coord";

export class Knight implements Piece {
  moveCount = 0;

  color: Color;

  type: PieceType = "knight";

  constructor(color: Color) {
    this.color = color;
  }

  onMove() {
    this.moveCount += 1;
  }

  getValidMoves(board: Board, currentCoord: Coord): Coord[] {
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
      return !coord.isOffBoard() && (board.isEmpty(coord) || board.hasEnemy(coord));
    });
  }
}
