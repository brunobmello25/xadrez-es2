import { Movement } from ".";
import { Coord } from "..";

export class EnPassantMovement extends Movement {
  constructor(
    public readonly origin: Coord,
    public readonly destination: Coord,
    public readonly capturedPieceDestination: Coord
  ) {
    super(origin, destination);
  }
}
