import { Board, Coord, Movement } from "../src/models";
import { King, Piece, Queen, Rook } from "../src/models/pieces";
import { Matrix } from "../src/protocols";

describe("Board", () => {
  describe(".getState", () => {
    it("should return a matrix with the same pieces as the board", () => {
      const board = makeEmptyBoard();
      board[0][0] = new King("white");
      board[0][1] = new King("black");
      const { sut } = makeSut(board);

      const state = sut.getState();

      expect(state[0][0]).toEqual(new King("white").toDumbState());
      expect(state[0][1]).toEqual(new King("black").toDumbState());
    });
  });

  describe(".isCheckMate", () => {
    it("should return true when the king is in check and has no possible moves", () => {
      const board = makeEmptyBoard();
      board[0][0] = new King("white");
      board[0][1] = new King("black");
      board[0][2] = new Queen("black");
      const { sut } = makeSut(board);

      const isCheckMate = sut.isCheckMate("white");

      expect(isCheckMate).toBe(true);
    });

    it("should return false when the king is in check but has a move that will remove it from check", () => {
      const board = makeEmptyBoard();
      board[0][0] = new King("white");
      board[0][1] = new King("black");
      const { sut } = makeSut(board);

      const isCheckMate = sut.isCheckMate("white");

      expect(isCheckMate).toBe(false);
    });
  });

  describe(".isKingInCheck", () => {
    it("should return true when the king is in check", () => {
      const board = makeEmptyBoard();
      board[0][0] = new King("white");
      board[7][7] = new King("black");
      board[2][1] = new Queen("black");
      const { sut } = makeSut(board);
      sut.movePiece(new Movement(new Coord(1, 2), new Coord(1, 1)));

      const isCheck = sut.isKingInCheck("white");

      expect(isCheck).toBe(true);
    });

    it("should return false when the king is not in check", () => {
      const board = makeEmptyBoard();
      board[0][0] = new King("white");
      board[2][1] = new Queen("black");
      board[7][7] = new King("black");
      const { sut } = makeSut(board);
      sut.movePiece(new Movement(new Coord(1, 2), new Coord(3, 2)));

      const isCheck = sut.isKingInCheck("white");

      expect(isCheck).toBe(false);
    });
  });

  describe(".isStaleMate", () => {
    it("should return true when board is in stalemate state", () => {
      const board = makeEmptyBoard();
      board[0][0] = new King("white");
      board[7][1] = new Rook("black");
      board[1][7] = new Rook("black");
      board[2][7] = new King("black");
      const { sut } = makeSut(board);

      const result = sut.isStaleMate("white");

      expect(result).toBe(true);
    });

    it("should return false when board is not in stalemate state", () => {
      const board = makeEmptyBoard();
      board[0][0] = new King("white");
      board[0][1] = new Rook("black");
      board[2][7] = new King("black");
      const { sut } = makeSut(board);

      const result = sut.isStaleMate("white");

      expect(result).toBe(false);
    });
  });

  describe(".movePiece", () => {
    it("should call piece.onMove function", () => {
      const board = makeEmptyBoard();
      const piece = new King("white");
      board[0][0] = piece;
      board[7][7] = new King("black");
      const from = new Coord(0, 0);
      const to = new Coord(0, 1);
      const movement = new Movement(from, to);
      // spy on piece superclass
      const onMoveSpy = jest.spyOn(Piece.prototype, "onMove");
      const { sut } = makeSut(board);

      sut.movePiece(movement);

      expect(onMoveSpy).toHaveBeenCalled();
    });

    it("should set origin to null and destination to piece", () => {
      const board = makeEmptyBoard();
      const piece = new King("white");
      board[0][0] = piece;
      board[7][7] = new King("black");
      const from = new Coord(0, 0);
      const to = new Coord(0, 1);
      const movement = new Movement(from, to);
      const { sut } = makeSut(board);

      sut.movePiece(movement);

      const state = sut.getState();
      expect(state[0][0]).toBeNull();
      expect(state[1][0]?.moveCount).toBe(1);
      expect(state[1][0]?.color).toBe("white");
      expect(state[1][0]?.type).toBe("king");
    });
  });
});

function makeSut(board: Matrix<Piece | null> = makeEmptyBoard()) {
  const sut = new Board(board);

  return { sut };
}

function makeEmptyBoard(): Matrix<Piece | null> {
  return Array.from({ length: 8 }).map(() =>
    Array.from({ length: 8 }).fill(null)
  ) as Matrix<Piece | null>;
}
