import { Coord } from '../coord';
import { Piece } from './piece'

export class Pawn extends Piece {
  constructor(color) {
    super('pawn', color);
  }

  getMoveCoords(board, currentCoord) {
    let coords = [];
    let direction = this.color == 'white' ? -1 : 1;

    let forwardCoord = currentCoord.offsetFromCurrent(0, direction);
    if (board.isEmpty(forwardCoord)) {
      coords.push(forwardCoord);
    }

    if (this.moveCount == 0) {
      let doubleForwardCoord = currentCoord.offsetFromCurrent(0, direction * 2);
      if (board.isEmpty(doubleForwardCoord)) {
        coords.push(doubleForwardCoord);
      }
    }

    let leftDiagonalCoord = currentCoord.offsetFromCurrent(-1, direction);
    if (board.hasEnemy(this, leftDiagonalCoord)) {
      coords.push(leftDiagonalCoord);
    }

    let rightDiagonalCoord = currentCoord.offsetFromCurrent(1, direction);
    if (board.hasEnemy(this, rightDiagonalCoord)) {
      coords.push(rightDiagonalCoord);
    }

    return coords;
  }
}
