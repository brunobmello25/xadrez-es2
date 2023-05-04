export class Coord {
  x: number;

  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  equals(other: Coord) {
    if (other == null) return false;

    return this.x == other.x && this.y == other.y;
  }

  offsetFromCurrent(xOffset: number, yOffset: number) {
    return new Coord(this.x + xOffset, this.y + yOffset);
  }

  isOffBoard() {
    return this.x < 0 || this.x > 7 || this.y < 0 || this.y > 7;
  }
}
