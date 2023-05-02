import { King, Pawn, Rook, Queen, Bishop, Knight } from './pieces'


export class Board {
  constructor() {
    this.boardMatrix = this._makeInitialBoard();
  }

  movePiece(from, to) {
    const piece = this.getFromCoord(from);

    if (!piece) throw new Error('No piece to move');

    this.setInCoord(from, null);
    this.setInCoord(to, piece);
    piece.onMove();
  }

  isEmpty(coord) {
    return this.boardMatrix[coord.y][coord.x] == null;
  }

  hasEnemy(piece, coord) {
    console.log({ boardMatrix: this.boardMatrix, piece, coord })
    const pieceInCoord = this.boardMatrix[coord.y][coord.x];

    if (!pieceInCoord) return false;

    return pieceInCoord.color != piece.color;
  }

  getFromCoord(coord) {
    return this.boardMatrix[coord.y][coord.x];
  }

  setInCoord(coord, piece) {
    this.boardMatrix[coord.y][coord.x] = piece;
  }

  getPieceMoves(pieceCoord) {
    const piece = this.getFromCoord(pieceCoord);

    if (!piece) throw new Error('No piece to move');

    return piece.getMoveCoords(this, pieceCoord);
  }

  getViewMatrix() {
    return this.boardMatrix.map((line) => {
      return line.map((piece) => {
        if (!piece) return null;

        return {
          type: piece.type,
          color: piece.color
        }
      });
    })
  }

  _makeInitialBoard() {
    const board = Array(8).fill([]).map(() => Array(8).fill(null));

    board[0][0] = new Rook('black');
    board[0][1] = new Knight('black');
    board[0][2] = new Bishop('black');
    board[0][3] = new Queen('black');
    board[0][4] = new King('black');
    board[0][5] = new Bishop('black');
    board[0][6] = new Knight('black');
    board[0][7] = new Rook('black');

    for (let i = 0; i < 8; i++) {
      board[1][i] = new Pawn('black');
    }

    board[7][0] = new Rook('white');
    board[7][1] = new Knight('white');
    board[7][2] = new Bishop('white');
    board[7][3] = new Queen('white');
    board[7][4] = new King('white');
    board[7][5] = new Bishop('white');
    board[7][6] = new Knight('white');
    board[7][7] = new Rook('white');

    for (let i = 0; i < 8; i++) {
      board[6][i] = new Pawn('white');
    }

    return board;
  }
}
