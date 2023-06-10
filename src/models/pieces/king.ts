import { Color, PieceType } from "../../protocols";
import { Movement } from "../movement";
import { Board } from "../board";
import { Coord } from "../coord";
import { Piece } from "./piece";
import { CastlingMovement } from "../movement/castlingmovement";
import { isRook } from "../../helpers";

export class King extends Piece {
  type: PieceType = "king";

  constructor(color: Color) {
    super(color);
  }

  getPossibleMoves(board: Board, currentCoord: Coord): Movement[] {
    const normalMoves = this.getNormalMoves(board, currentCoord);
    const castlingMoves = this.getCastlingMoves(board, currentCoord);

    return [...normalMoves, ...castlingMoves];
  }

  private getNormalMoves(board: Board, currentCoord: Coord): Movement[] {
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

    return potentialMoves
      .filter((coord) => {
        return (
          !coord.isOffBoard() &&
          (board.isEmpty(coord) || board.hasOpponent(coord, this.color))
        );
      })
      .map((coord) => new Movement(currentCoord, coord));
  }

  private getCastlingMoves(
    board: Board,
    currentCoord: Coord
  ): CastlingMovement[] {
    if (this.moveCount > 0) {
      return [];
    }

    const castlingMoves: CastlingMovement[] = [];

    // Get coordinates for rooks (on traditional chess board)
    const rookCoords = [
      new Coord(0, currentCoord.y),
      new Coord(7, currentCoord.y),
    ];

    for (const rookCoord of rookCoords) {
      const rook = board.getFromCoord(rookCoord);

      if (!isRook(rook) || rook.moveCount > 0) {
        continue;
      }

      const direction = rookCoord.x > currentCoord.x ? 1 : -1;
      let canCastle = true;

      // Check all squares between the king and the rook
      for (
        let x = currentCoord.x + direction;
        x !== rookCoord.x;
        x += direction
      ) {
        const coord = new Coord(x, currentCoord.y);
        if (!board.isEmpty(coord)) {
          canCastle = false;
          break;
        }
      }

      if (canCastle) {
        // The destination for the king is two squares towards the rook
        const kingDestination = new Coord(
          currentCoord.x + 2 * direction,
          currentCoord.y
        );

        // The destination for the rook is the square the king skipped over
        const rookDestination = new Coord(
          currentCoord.x + direction,
          currentCoord.y
        );

        // Create a CastlingMovement and add it to the list
        const castlingMove = new CastlingMovement(
          currentCoord,
          kingDestination,
          rookCoord,
          rookDestination
        );
        castlingMoves.push(castlingMove);
      }
    }

    return castlingMoves;
  }
}
