import { Movement } from ".";
import { Coord } from "..";

export class CastlingMovement extends Movement {
  constructor(
    public readonly origin: Coord,
    public readonly destination: Coord,
    public readonly rookOrigin: Coord,
    public readonly rookDestination: Coord
  ) {
    super(origin, destination);
  }
}
