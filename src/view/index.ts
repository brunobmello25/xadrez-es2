import { Board } from '../models/board';
import { Coord } from '../models/coord'
import { Matrix, ViewPiece } from '../protocols';

export class View {
  board: Board;
  selectedCell: Coord | null;

  constructor(board: Board) {
    this.board = board;
    this.selectedCell = null;
  }

  updateBoard() {
    const target = document.querySelector('.board');

    if (!target) {
      alert("Falha ao inicializar o jogo, Por favor recarregue a página.");
      return;
    }

    target.innerHTML = this.makeInnerBoardElement(this.board.getViewMatrix());

    this.setEventListeners();
  }

  private setEventListeners() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell) => {
      cell.addEventListener('click', (e) => {
        if (!e.currentTarget) return;

        // @ts-ignore
        const x = parseInt(e.currentTarget.dataset.x);
        // @ts-ignore
        const y = parseInt(e.currentTarget.dataset.y);

        this.handleCellClick(new Coord(x, y));

        this.updateBoard();
      })
    })
  }

  private handleCellClick(coord: Coord) {
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

  private makeInnerBoardElement(board: Matrix<ViewPiece | null>) {
    let html = '';

    board.forEach((line, y) => {
      html += `<div class='line line-${y % 2 == 0 ? 'even' : 'odd'}'>`;
      line.forEach((cell, x) => {
        html += this.makeCellElement(cell, x, y);
      })
      html += "</div>";
    })

    return html;
  }

  private makeCellElement(piece: ViewPiece | null, x: number, y: number) {
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
