import { Board } from "./models/board";
import { Coord } from "./models/coord";
import { Matrix, ViewPiece } from "./protocols";

export class View {
  board: Board;

  selectedCoord: Coord | null;

  highlightedCoords: Coord[] = [];

  constructor(board: Board) {
    this.board = board;
    this.selectedCoord = null;
  }

  updateBoard() {
    const target = document.querySelector(".board");

    if (!target) {
      alert("Falha ao inicializar o jogo, Por favor recarregue a página.");
      return;
    }

    target.innerHTML = this.makeInnerBoardElement(this.board.getViewMatrix());

    this.setEventListeners();
  }

  private setEventListeners() {
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (!e.currentTarget) return;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const x = parseInt(e.currentTarget.dataset.x);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const y = parseInt(e.currentTarget.dataset.y);

        this.handleCellClick(new Coord(x, y));

        this.updateBoard();
      });
    });
  }

  private handleCellClick(coord: Coord) {
    if (!this.selectedCoord) {
      if (this.board.isEmpty(coord)) return;

      if (this.board.isFriendly(coord)) {
        this.selectedCoord = coord;
        this.highlightedCoords = this.board.getPieceMoves(coord);
        return;
      }

      if (this.board.hasEnemy(coord)) {
        alert("Não é possível selecionar uma peça inimiga");
        return;
      }
    }

    if (this.selectedCoord) {
      if (this.selectedCoord.equals(coord)) {
        this.selectedCoord = null;
        this.highlightedCoords = [];
        return;
      }

      if (this.board.isFriendly(coord)) {
        this.selectedCoord = coord;
        this.highlightedCoords = this.board.getPieceMoves(coord);
        return;
      }

      if (this.board.canMove(this.selectedCoord, coord)) {
        this.board.movePiece(this.selectedCoord, coord);
        this.selectedCoord = null;
        this.highlightedCoords = [];
        return;
      }
    }
  }

  private makeInnerBoardElement(board: Matrix<ViewPiece | null>) {
    let html = "";

    board.forEach((line, y) => {
      html += `<div class='line line-${y % 2 == 0 ? "even" : "odd"}'>`;
      line.forEach((cell, x) => {
        html += this.makeCellElement(cell, x, y);
      });
      html += "</div>";
    });

    return html;
  }

  private makeCellElement(piece: ViewPiece | null, x: number, y: number) {
    let html = "";

    let classes = "cell";
    if (this.selectedCoord !== null && this.selectedCoord.equals(new Coord(x, y))) {
      classes += " selected";
    }

    if (this.highlightedCoords.some((coord) => coord.equals(new Coord(x, y)))) {
      classes += " highlighted";
    }

    html += `<div class="${classes}" data-x='${x}' data-y='${y}'>`;

    if (piece != null) {
      html += `<div class='piece'><img src="images/${piece.color}-${piece.type}.png" alt="" srcset=""></div>`;
    }

    html += "</div>";

    return html;
  }
}
