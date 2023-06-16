import {
  Board,
  Coord,
  isEnPassant,
  EnPassantMovement,
  Movement,
} from "../src/models";
import { makeInitialBoard, isPawn } from "../src/helpers";

describe("En Passant", () => {
  it("should set a pawn as en passantable if it is", () => {
    const board = new Board(makeInitialBoard());
    const capturingCoord = new Coord(4, 3);
    const capturedCoord = new Coord(5, 3);
    board.movePiece(new Movement(new Coord(4, 6), new Coord(4, 4)));
    board.movePiece(new Movement(new Coord(0, 1), new Coord(0, 2)));
    board.movePiece(new Movement(new Coord(4, 4), capturingCoord));
    board.movePiece(new Movement(new Coord(5, 1), capturedCoord));

    const capturing = board.getFromCoord(capturingCoord);
    const captured = board.getFromCoord(capturedCoord);

    if (isPawn(captured) && isPawn(capturing)) {
      expect(captured.isEnPassantable()).toBe(true);
      const capturingMoves = capturing.getPossibleMoves(board, capturingCoord);
      const enPassantMove = capturingMoves.find((m) => isEnPassant(m));
      if (!enPassantMove) {
        fail();
      }
      expect(
        (enPassantMove as EnPassantMovement).capturedPieceDestination.equals(
          capturedCoord
        )
      ).toBe(true);
    } else {
      fail();
    }
  });

  it("should not set a pawn as en passantable if it is not", () => {
    const board = new Board(makeInitialBoard());
    const pawnCoord = new Coord(4, 6);
    const nonCapturingCoord = new Coord(3, 3);
    board.movePiece(new Movement(new Coord(4, 6), new Coord(4, 4)));
    board.movePiece(new Movement(new Coord(0, 1), new Coord(0, 2)));
    board.movePiece(new Movement(new Coord(4, 4), pawnCoord));
    board.movePiece(new Movement(new Coord(3, 1), nonCapturingCoord));

    const pawn = board.getFromCoord(pawnCoord);

    if (isPawn(pawn)) {
      const movements = pawn.getPossibleMoves(board, pawnCoord);
      expect(movements.find((m) => isEnPassant(m))).toBeUndefined();
    }
  });
});
