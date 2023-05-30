import { Color, Matrix, Piece, PieceType, ViewPiece } from "../protocols";
import { King, Pawn, Rook, Queen, Bishop, Knight } from "./pieces";
import { Coord } from "./coord";

export class Board {
  private boardMatrix: Matrix<Piece | null>;

  private currentShift: Color = "white";

  constructor() {
    this.boardMatrix = this.makeInitialBoard();
  }

  canMove(from: Coord, to: Coord) {
    const piece = this.getFromCoord(from);

    if (!piece) throw new Error("No piece to move");

    const moves = piece.getValidMoves(this, from);

    return moves.some((coord) => coord.equals(to));
  }

  movePiece(from: Coord, to: Coord) {
    const piece = this.getFromCoord(from);

    if (!piece) throw new Error("No piece to move");

    this.setInCoord(from, null);
    this.setInCoord(to, piece);
    piece.onMove();
    this.updateShift();
  }

  isEmpty(coord: Coord) {
    return this.boardMatrix[coord.y][coord.x] == null;
  }

  isFriendly(coord: Coord) {
    return this.boardMatrix[coord.y][coord.x]?.color === this.currentShift;
  }

  hasEnemy(coord: Coord) {
    if (this.isEmpty(coord)) return false;
    return this.boardMatrix[coord.y][coord.x]?.color !== this.currentShift;
  }

  getFromCoord(coord: Coord) {
    return this.boardMatrix[coord.y][coord.x];
  }

  setInCoord(coord: Coord, piece: Piece | null) {
    this.boardMatrix[coord.y][coord.x] = piece;
  }

  getPieceMoves(pieceCoord: Coord) {
    const piece = this.getFromCoord(pieceCoord);

    if (!piece) throw new Error("No piece to move");

    return piece.getValidMoves(this, pieceCoord);
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

  private updateShift() {
    this.currentShift = this.currentShift === "white" ? "black" : "white";
  }
}
