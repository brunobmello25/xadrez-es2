import { Coord } from '../models/coord'

export class View {
  constructor(board) {
    this.board = board;
    this.selectedCell = null;
  }

  updateBoard() {
    const target = document.querySelector('.board');

    target.innerHTML = this._makeInnerBoardElement(this.board.getViewMatrix());

    this._setEventListeners();
  }

  _setEventListeners() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell) => {
      cell.addEventListener('click', (e) => {
        const x = parseInt(e.currentTarget.dataset.x);
        const y = parseInt(e.currentTarget.dataset.y);

        this._handleCellClick(new Coord(x, y));

        this.updateBoard();
      })
    })
  }

  _handleCellClick(coord) {
    // TODO: to much business logic here. Move these validations inside the board model class
    if (!this.selectedCell) {
      this.selectedCell = coord;
      console.log(this.board.getPieceMoves(coord))
      return;
    }

    if (!!this.selectedCell && coord.equals(this.selectedCell)) {
      this.selectedCell = null;
      return;
    }

    this.board.movePiece(this.selectedCell, coord);
    this.selectedCell = null;
  }

  _makeInnerBoardElement(board) {
    let html = '';

    board.forEach((line, y) => {
      html += `<div class='line line-${y % 2 == 0 ? 'even' : 'odd'}'>`;
      line.forEach((cell, x) => {
        html += this._makeCellElement(cell, x, y);
      })
      html += "</div>";
    })

    return html;
  }

  _makeCellElement(piece, x, y) {
    let html = "";

    let classes = "cell";
    if (this.selectedCell !== null && this.selectedCell.equals(new Coord(x, y))) {
      classes += " selected";
    }

    html += `<div class="${classes}" data-x='${x}' data-y='${y}'>`;

    if (piece != null) {

      html += `<div class='piece'><img src="images/${piece.color}-${piece.type}.png" alt="" srcset=""></div>`;
    }

    html += `</div>`;

    return html;
  }
}
