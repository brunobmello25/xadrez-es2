import { Color, PieceType } from "../../protocols";
import { EnPassantMovement, Movement } from "../movement";
import { Board } from "../board";
import { Coord } from "../coord";
import { Piece } from "./piece";

export class Pawn extends Piece {
  type: PieceType = "pawn";

  private enPassantable = false;

  constructor(color: Color) {
    super(color);
  }

  isPromotable(coord: Coord): boolean {
    if (this.color === "white" && coord.y === 0) return true;
    else if (this.color === "black" && coord.y === 7) return true;
    return false;
  }

  public isEnPassantable() {
    return this.enPassantable;
  }

  onMove(movement: Movement, board: Board) {
    super.onMove(movement, board);

    this.calculateIsEnPassantable(board, movement);
  }

  getPossibleMoves(board: Board, currentCoord: Coord): Movement[] {
    return [
      ...this.getNormalMoves(board, currentCoord),
      ...this.getEnPassantMoves(board, currentCoord),
    ];
  }

  getNormalMoves(board: Board, currentCoord: Coord): Movement[] {
    const coords = [];
    const direction = this.color == "white" ? -1 : 1;

    const forwardCoord = currentCoord.offsetFromCurrent(0, direction);
    if (forwardCoord && board.isEmpty(forwardCoord)) {
      coords.push(forwardCoord);
    }

    if (this.moveCount == 0) {
      const doubleForwardCoord = currentCoord.offsetFromCurrent(
        0,
        direction * 2
      );
      if (doubleForwardCoord && board.isEmpty(doubleForwardCoord)) {
        coords.push(doubleForwardCoord);
      }
    }

    const leftDiagonalCoord = currentCoord.offsetFromCurrent(-1, direction);
    if (leftDiagonalCoord && board.hasOpponent(leftDiagonalCoord, this.color)) {
      coords.push(leftDiagonalCoord);
    }

    const rightDiagonalCoord = currentCoord.offsetFromCurrent(1, direction);
    if (
      rightDiagonalCoord &&
      board.hasOpponent(rightDiagonalCoord, this.color)
    ) {
      coords.push(rightDiagonalCoord);
    }

    return coords.map((coord) => new Movement(currentCoord, coord));
  }

  private getEnPassantMoves(board: Board, currentCoord: Coord): Movement[] {
    const left = currentCoord.offsetFromCurrent(-1, 0);
    const right = currentCoord.offsetFromCurrent(1, 0);
    const verticalDirection = this.color == "white" ? -1 : 1;

    const pieceOnLeft = left && board.getFromCoord(left);
    const pieceOnRight = right && board.getFromCoord(right);

    const leftIsEnPassantable =
      pieceOnLeft instanceof Pawn && pieceOnLeft.isEnPassantable();
    const rightIsEnPassantable =
      pieceOnRight instanceof Pawn && pieceOnRight.isEnPassantable();

    const movements: Movement[] = [];

    if (leftIsEnPassantable) {
      const leftDestination =
        left && left.offsetFromCurrent(0, verticalDirection);

      if (leftDestination)
        movements.push(
          new EnPassantMovement(currentCoord, leftDestination, left)
        );
    }

    if (rightIsEnPassantable) {
      const rightDestination =
        right && right.offsetFromCurrent(0, verticalDirection);

      if (rightDestination)
        movements.push(
          new EnPassantMovement(currentCoord, rightDestination, right)
        );
    }

    return movements;
  }

  private calculateIsEnPassantable(board: Board, movement: Movement) {
    const wasFirstMove = this.moveCount === 1;

    const isDoubleForward =
      Math.abs(movement.origin.y - movement.destination.y) === 2;

    const left = movement.destination.offsetFromCurrent(-1, 0);
    const right = movement.destination.offsetFromCurrent(1, 0);

    const hasEnemyOnLeft = left && board.hasOpponent(left, this.color);
    const hasEnemyOnRight = right && board.hasOpponent(right, this.color);

    this.enPassantable =
      wasFirstMove &&
      isDoubleForward &&
      (!!hasEnemyOnLeft || !!hasEnemyOnRight);
  }
}
