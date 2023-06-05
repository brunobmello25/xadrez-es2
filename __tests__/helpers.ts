import { makeInitialBoard } from "../src/helpers";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "../src/models/pieces";

describe("helpers", () => {
  describe("makeInitialBoard", () => {
    it("should return an proper 8x8 matrix", () => {
      const board = makeInitialBoard();

      expect(board).toHaveLength(8);
      for (const row of board) {
        expect(row).toHaveLength(8);
      }
    });

    it("should return a board with the initial pieces", () => {
      const board = makeInitialBoard();

      expect(board[0][0]).toEqual(new Rook("black"));
      expect(board[0][1]).toEqual(new Knight("black"));
      expect(board[0][2]).toEqual(new Bishop("black"));
      expect(board[0][3]).toEqual(new Queen("black"));
      expect(board[0][4]).toEqual(new King("black"));
      expect(board[0][5]).toEqual(new Bishop("black"));
      expect(board[0][6]).toEqual(new Knight("black"));
      expect(board[0][7]).toEqual(new Rook("black"));
      for (let i = 0; i < 8; i++) {
        expect(board[1][i]).toEqual(new Pawn("black"));
      }
      expect(board[7][0]).toEqual(new Rook("white"));
      expect(board[7][1]).toEqual(new Knight("white"));
      expect(board[7][2]).toEqual(new Bishop("white"));
      expect(board[7][3]).toEqual(new Queen("white"));
      expect(board[7][4]).toEqual(new King("white"));
      expect(board[7][5]).toEqual(new Bishop("white"));
      expect(board[7][6]).toEqual(new Knight("white"));
      expect(board[7][7]).toEqual(new Rook("white"));
      for (let i = 0; i < 8; i++) {
        expect(board[6][i]).toEqual(new Pawn("white"));
      }
    });

    it("should not create a board with references to the same piece", () => {
      const board = makeInitialBoard();

      expect(board[0][0]).not.toBe(board[7][0]);
      expect(board[0][1]).not.toBe(board[7][1]);
      expect(board[0][2]).not.toBe(board[7][2]);
      expect(board[0][3]).not.toBe(board[7][3]);
      expect(board[0][4]).not.toBe(board[7][4]);
      expect(board[0][5]).not.toBe(board[7][5]);
      expect(board[0][6]).not.toBe(board[7][6]);
      expect(board[0][7]).not.toBe(board[7][7]);
      for (let i = 0; i < 8; i++) {
        expect(board[1][i]).not.toBe(board[6][i]);
      }
    });
  });
});
