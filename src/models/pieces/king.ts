import { Color } from "../../protocols";
import { Board } from "../board";
import { Coord } from "../coord";

export class King {
  moveCount = 0;

  color: Color;

  type = "king";

  constructor(color: Color) {
    this.color = color;
  }

  onMove() {
    this.moveCount += 1;
  }

  getValidMoves(board: Board, currentCoord: Coord): Coord[] {
    const potentialMoves = [
      new Coord(currentCoord.x + 1, currentCoord.y + 1),
      new Coord(currentCoord.x + 1, currentCoord.y),
      new Coord(currentCoord.x + 1, currentCoord.y - 1),
      new Coord(currentCoord.x, currentCoord.y - 1),
      new Coord(currentCoord.x - 1, currentCoord.y - 1),
      new Coord(currentCoord.x - 1, currentCoord.y),
      new Coord(currentCoord.x - 1, currentCoord.y + 1),
      new Coord(currentCoord.x, currentCoord.y + 1),
    ]

    return potentialMoves.filter((coord) => {
      return !coord.isOffBoard() && (board.isEmpty(coord) || board.hasEnemy(coord));
    });
  }
}
