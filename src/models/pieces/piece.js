export class Piece {
  constructor(type, color) {
    this.moveCount = 0;
    this.type = type;
    this.color = color;
  }

  onMove() {
    this.moveCount++;
  }

  getMoveCoords() {
    return [];
  }
}
