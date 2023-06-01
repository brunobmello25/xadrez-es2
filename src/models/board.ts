import { Color, Matrix, DumbState } from "../protocols";
import { Coord } from "./coord";
import { Piece } from "./pieces";
import { BOARD_DIMENSIONS } from "../constants";

export class Board {
  private boardMatrix: Matrix<Piece | null>;

  constructor(initialBoard: Matrix<Piece | null>) {
    this.boardMatrix = initialBoard;
  }

  reset(initialBoard: Matrix<Piece | null>) {
    this.boardMatrix = initialBoard;
  }

  isCheckMate(kingColor: Color) {
    if (!this.isCheck(kingColor)) return false;

    const kingCoord = this.findKing(kingColor);

    if (!kingCoord) throw new Error("No king found");

    for (let x = 0; x < BOARD_DIMENSIONS.width; x++) {
      for (let y = 0; y < BOARD_DIMENSIONS.height; y++) {
        const coord = new Coord(x, y);

        const piece = this.getFromCoord(coord);

        if (!piece || piece.color !== kingColor) continue;

        const possibleMoves = piece.getPossibleMoves(this, coord);

        if (
          possibleMoves.some((move) =>
            this.moveWillRemoveKingFromCheck(kingColor, coord, move)
          )
        ) {
          return false;
        }
      }
    }

    return true;
  }

  isCheck(kingColor: Color) {
    const kingCoord = this.findKing(kingColor);

    if (!kingCoord) throw new Error("No king found");

    for (let x = 0; x < BOARD_DIMENSIONS.width; x++) {
      for (let y = 0; y < BOARD_DIMENSIONS.height; y++) {
        const coord = new Coord(x, y);

        const piece = this.getFromCoord(coord);

        if (!piece || piece.color === kingColor) continue;

        const possibleMoves = piece.getPossibleMoves(this, coord);

        if (possibleMoves.some((move) => move.equals(kingCoord))) {
          return true;
        }
      }
    }

    return false;
  }

  isStaleMate(kingColor: Color) {
    if (this.isCheck(kingColor)) return false;
    if (this.isCheckMate(kingColor)) return false;

    for (let x = 0; x < BOARD_DIMENSIONS.width; x++) {
      for (let y = 0; y < BOARD_DIMENSIONS.height; y++) {
        const coord = new Coord(x, y);

        const piece = this.getFromCoord(coord);

        if (!piece || piece.color !== kingColor) continue;

        if (this.getValidMoves(coord).length > 0) {
          return false;
        }
      }
    }
    return true;
  }

  moveWillPutKingInCheck(kingColor: Color, from: Coord, to: Coord) {
    const piece = this.getFromCoord(from);

    if (!piece) return false;

    const pieceInTo = this.getFromCoord(to);

    this.setInCoord(to, piece);
    this.setInCoord(from, null);

    const isCheck = this.isCheck(kingColor);

    this.setInCoord(to, pieceInTo);
    this.setInCoord(from, piece);

    return isCheck;
  }

  moveWillRemoveKingFromCheck(kingColor: Color, from: Coord, to: Coord) {
    const piece = this.getFromCoord(from);

    if (!piece) return false;

    const pieceInTo = this.getFromCoord(to);

    this.setInCoord(to, piece);
    this.setInCoord(from, null);

    const isCheck = this.isCheck(kingColor);

    this.setInCoord(to, pieceInTo);
    this.setInCoord(from, piece);

    return !isCheck;
  }

  getValidMoves(coord: Coord): Coord[] {
    const piece = this.getFromCoord(coord);

    if (!piece) throw new Error("No piece to get moves");

    return piece
      .getPossibleMoves(this, coord)
      .filter((move) => !this.moveWillPutKingInCheck(piece.color, coord, move));
  }

  movePiece(from: Coord, to: Coord) {
    const piece = this.getFromCoord(from);

    if (!piece) throw new Error("No piece to move");

    this.setInCoord(from, null);
    this.setInCoord(to, piece);
    piece.onMove();
  }

  getFromCoord(coord: Coord) {
    return this.boardMatrix[coord.y][coord.x];
  }

  setInCoord(coord: Coord, piece: Piece | null) {
    this.boardMatrix[coord.y][coord.x] = piece;
  }

  getState(): DumbState {
    return this.boardMatrix.map((line) => {
      return line.map((piece) => piece?.toDumbState() || null);
    });
  }

  hasOpponent(coord: Coord, color: Color): boolean {
    const piece = this.getFromCoord(coord);

    if (!piece) return false;

    return piece.color !== color;
  }

  hasAlly(coord: Coord, color: Color): boolean {
    const piece = this.getFromCoord(coord);

    if (!piece) return false;

    return piece.color === color;
  }

  isEmpty(coord: Coord): boolean {
    const piece = this.getFromCoord(coord);

    return piece === null;
  }

  private findKing(color: Color): Coord | null {
    for (let y = 0; y < 8; y++) {
      const line = this.boardMatrix[y];

      for (let x = 0; x < 8; x++) {
        const piece = line[x];

        if (piece && piece.type === "king" && piece.color === color) {
          return new Coord(x, y);
        }
      }
    }

    return null;
  }
}
