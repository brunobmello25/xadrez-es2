import { Board } from "../src/models";
import { King, Piece } from "../src/models/pieces";
import { Matrix } from "../src/protocols";

describe("Board", () => {
  describe(".getState", () => {
    it("should return an 8x8 matrix", () => {
      const { sut } = makeSut();

      const state = sut.getState();

      expect(state).toHaveLength(8);
      for (const row of state) {
        expect(row).toHaveLength(8);
      }
    });

    it("should return an empty matrix when there are no pieces", () => {
      const { sut } = makeSut();

      const state = sut.getState();

      const pieces = state.flat().filter((piece) => piece !== null);
      expect(pieces).toHaveLength(0);
    });

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
});

function makeSut(board: Matrix<Piece | null> = makeEmptyBoard()) {
  const sut = new Board(board);

  return { sut };
}

function makeEmptyBoard(): Matrix<Piece | null> {
  return Array(8).fill(Array(8).fill(null));
}
