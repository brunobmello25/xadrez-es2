import { Color, Matrix, PieceType, ViewPiece } from "../protocols";
import { King, Pawn, Rook, Queen, Bishop, Knight } from "./pieces";
import { Coord } from "./coord";
import { Piece } from "./pieces";
import { BOARD_DIMENSIONS } from "../constants";

export class Board {
  private boardMatrix: Matrix<Piece | null>;

  constructor() {
    this.boardMatrix = this.makeInitialBoard();
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

        const validMoves = piece.getPossibleMoves(this, coord);

        if (
          validMoves.some((move) =>
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

        const validMoves = piece.getPossibleMoves(this, coord);

        if (validMoves.some((move) => move.equals(kingCoord))) {
          return true;
        }
      }
    }

    return false;
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

  getViewMatrix(): Matrix<ViewPiece | null> {
    return this.boardMatrix.map((line) => {
      return line.map((piece) => {
        if (!piece) return null;

        return {
          type: piece.type as PieceType,
          color: piece.color,
        };
      });
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

  private makeInitialBoard(): Matrix<Piece | null> {
    const board = Array(8)
      .fill([])
      .map(() => Array(8).fill(null));

    board[0][0] = new Rook("black");
    board[0][1] = new Knight("black");
    board[0][2] = new Bishop("black");
    board[0][3] = new Queen("black");
    board[0][4] = new King("black");
    board[0][5] = new Bishop("black");
    board[0][6] = new Knight("black");
    board[0][7] = new Rook("black");

    for (let i = 0; i < 8; i++) {
      board[1][i] = new Pawn("black");
    }

    board[7][0] = new Rook("white");
    board[7][1] = new Knight("white");
    board[7][2] = new Bishop("white");
    board[7][3] = new Queen("white");
    board[7][4] = new King("white");
    board[7][5] = new Bishop("white");
    board[7][6] = new Knight("white");
    board[7][7] = new Rook("white");

    for (let i = 0; i < 8; i++) {
      board[6][i] = new Pawn("white");
    }

    return board;
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
