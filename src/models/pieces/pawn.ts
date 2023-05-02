import { Color } from '../../protocols';
import { Board } from '../board';
import { Coord } from '../coord';

export class Pawn {

  type = 'pawn';

  color: Color;

  moveCount = 0;

  constructor(color: Color) {
    this.color = color;
  }

  getValidMoves(board: Board, currentCoord: Coord) {
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
    if (board.hasEnemy(leftDiagonalCoord)) {
      coords.push(leftDiagonalCoord);
    }

    let rightDiagonalCoord = currentCoord.offsetFromCurrent(1, direction);
    if (board.hasEnemy(rightDiagonalCoord)) {
      coords.push(rightDiagonalCoord);
    }

    return coords;
  }

  onMove() {
    this.moveCount += 1;
  }
}
