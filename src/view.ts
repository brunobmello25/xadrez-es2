import { Board } from "./models/board";
import { Coord } from "./models/coord";
import { Matrix, ViewPiece } from "./protocols";

export class View {
  private selectedCoord: Coord | null = null;
  private highlightedCoords: Coord[] = [];

  constructor(private readonly board: Board, private readonly clickHandler: (coord: Coord) => void) {
  }

  updateBoard() {
    this.renderBoard(this.board);
    this.bindCellClick(this.clickHandler);
  }

  setHighlightedCells(coords: Coord[]) {
    this.highlightedCoords = coords;
  }

  setSelectedCell(coord: Coord | null) {
    this.selectedCoord = coord;
  }

  private renderBoard(board: Board) {
    const target = document.querySelector(".board");

    if (!target) {
      alert("Falha ao inicializar o jogo, Por favor recarregue a página.");
      return;
    }

    target.innerHTML = this.makeInnerBoardElement(board.getViewMatrix());
  }

  private bindCellClick(handler: (coord: Coord) => void) {
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

        handler(new Coord(x, y));

        this.updateBoard();
      });
    });
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
      if (piece != null) {
        classes += " hasEnemy";
      }
    }

    html += `<div class="${classes}" data-x='${x}' data-y='${y}'>`;

    if (piece != null) {
      html += `<div class='piece'><img src="images/${piece.color}-${piece.type}.png" alt="" srcset=""></div>`;
    }

    html += "</div>";

    return html;
  }
}
