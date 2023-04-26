import './styles'

export function main() {
  updateBoard();
}



function makePiece(color, type) {
  return {
    color,
    type
  }
}

function makeBoard() {
  const board = Array(8).fill([]).map(() => Array(8).fill(null));

  board[0][0] = makePiece('black', 'rook');
  board[0][1] = makePiece('black', 'knight');
  board[0][2] = makePiece('black', 'bishop');
  board[0][3] = makePiece('black', 'queen');
  board[0][4] = makePiece('black', 'king');
  board[0][5] = makePiece('black', 'bishop');
  board[0][6] = makePiece('black', 'knight');
  board[0][7] = makePiece('black', 'rook');

  for (let i = 0; i < 8; i++) {
    board[1][i] = makePiece('black', 'pawn');
  }

  board[7][0] = makePiece('white', 'rook');
  board[7][1] = makePiece('white', 'knight');
  board[7][2] = makePiece('white', 'bishop');
  board[7][3] = makePiece('white', 'queen');
  board[7][4] = makePiece('white', 'king');
  board[7][5] = makePiece('white', 'bishop');
  board[7][6] = makePiece('white', 'knight');
  board[7][7] = makePiece('white', 'rook');

  for (let i = 0; i < 8; i++) {
    board[6][i] = makePiece('white', 'pawn');
  }

  return board;
}

function makeCellElement(piece, x, y) {
  let html = "";

  html += `<div class='cell' data-x='${x}' data-y='${y}'>`;

  if (piece != null) {
    html += `<div class='piece'><img src="images/${piece.color}-${piece.type}.png" alt="" srcset=""></div>`;
  }

  html += `</div>`;

  return html;
}

function makeInnerBoardElement(board) {
  let html = '';

  board.forEach((line, y) => {
    html += `<div class='line line-${y % 2 == 0 ? 'even' : 'odd'}'>`;
    line.forEach((cell, x) => {
      html += makeCellElement(cell, x, y);
    })
    html += "</div>";
  })

  return html;
}

function updateBoard() {
  const board = document.querySelector('.board');

  board.innerHTML = makeInnerBoardElement(makeBoard());
}
