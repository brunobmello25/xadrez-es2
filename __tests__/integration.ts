import { makeInitialBoard } from "../src/helpers";
import { Board, Coord, Movement } from "../src/models";

describe("Integration tests", () => {
  describe("piece movement", () => {
    it("should move a piece", () => {
      const movement = new Movement(new Coord(0, 6), new Coord(0, 4));
      const { sut } = makeSut();

      sut.movePiece(movement);

      const updatedState = sut.getState();
      expect(updatedState[6][0]).toEqual(null);
      expect(updatedState[4][0]).toEqual({
        color: "white",
        type: "pawn",
        moveCount: 1,
      });
    });
  });

  describe("valid moves listing", () => {
    it("should return proper list of movements", () => {
      const { sut } = makeSut();

      const validMoves = sut.getValidMoves(new Coord(0, 6));

      expect(validMoves.length).toBe(2);
      expect(validMoves).toContainEqual(
        new Movement(new Coord(0, 6), new Coord(0, 5))
      );
      expect(validMoves).toContainEqual(
        new Movement(new Coord(0, 6), new Coord(0, 4))
      );
    });
  });
});

function makeSut() {
  const board = new Board(makeInitialBoard());

  return { sut: board };
}
