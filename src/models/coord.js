export class Coord {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(other) {
    if (other == null) return false;

    return this.x == other.x && this.y == other.y;
  }

  offsetFromCurrent(xOffset, yOffset) {
    return new Coord(this.x + xOffset, this.y + yOffset);
  }
}
