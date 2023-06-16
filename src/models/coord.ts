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
    const x = this.x + xOffset;
    const y = this.y + yOffset;

    if (x < 0 || x > 7 || y < 0 || y > 7) {
      return null;
    }

    return new Coord(x, y);
  }

  isOffBoard() {
    return this.x < 0 || this.x > 7 || this.y < 0 || this.y > 7;
  }
}
