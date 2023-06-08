import { Coord } from ".";

export class Movement {
  constructor(
    public readonly origin: Coord,
    public readonly destination: Coord,
    public readonly capturedPieceCoord: Coord | null = null
  ) {}
}
