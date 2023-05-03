import './styles'

import { Board } from './models/board';
import { View } from './view';

export function main() {
  const board = new Board();
  const view = new View(board);

  view.updateBoard();
}

