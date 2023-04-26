export class View {
  constructor(model) {
    this.model = model;
  }

  updateBoard() {
    const target = document.querySelector('.board');

    target.innerHTML = this._makeInnerBoardElement(this.model.board);
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

    html += `<div class='cell' data-x='${x}' data-y='${y}'>`;

    if (piece != null) {
      html += `<div class='piece'><img src="images/${piece.color}-${piece.type}.png" alt="" srcset=""></div>`;
    }

    html += `</div>`;

    return html;
  }
}
