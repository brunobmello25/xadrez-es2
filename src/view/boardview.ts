import { toHumanName } from "../helpers";
import { Board, Coord, Options } from "../models";
import {
  Color,
  Matrix,
  DumbStatePiece,
  PromotablePiece,
  PieceType,
} from "../protocols";

export class BoardView {
  private selectedCoord: Coord | null = null;
  private highlightedCoords: Coord[] = [];

  private promotionModal: HTMLDivElement | null = null;

  constructor(
    private readonly options: Options,
    private readonly clickHandler: (coord: Coord) => void
  ) {
    this.createPromotionModal();
  }

  setHighlightedCells(coords: Coord[]) {
    this.highlightedCoords = coords;
  }

  setSelectedCell(coord: Coord | null) {
    this.selectedCoord = coord;
  }

  renderCheckMate(winner: Color | null) {
    alert(`Xeque-mate! Vencedor: ${winner === "white" ? "Branco" : "Preto"}`);
  }

  renderStaleMate() {
    alert("Empate!");
  }

  renderBoard(board: Board) {
    const target = document.querySelector(".board");

    if (!target) {
      alert("Falha ao inicializar o jogo, Por favor recarregue a página.");
      return;
    }

    target.innerHTML = this.makeInnerBoardElement(board.getState());
  }

  bindBoardClickListeners() {
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

        this.clickHandler(new Coord(x, y));
      });
    });
  }

  public showPromotionModal(
    onChoice: (choice: PromotablePiece, color: Color, coord: Coord) => void,
    color: Color,
    coord: Coord
  ) {
    if (!this.promotionModal) {
      alert(
        "Falha ao escolher peça de promoção, escolhendo rainha por padrão."
      );
      onChoice("queen", color, coord);
      return;
    }

    this.promotionModal.style.display = "block";

    const buttons = this.promotionModal.querySelectorAll(".promotion-choice");

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const choice = (e.target as HTMLButtonElement).dataset
          .piecetype as PromotablePiece;

        if (this.promotionModal) {
          this.promotionModal.style.display = "none";
        }

        onChoice(choice, color, coord);
      });
    });
  }

  private makeInnerBoardElement(board: Matrix<DumbStatePiece | null>) {
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

  private makeCellElement(piece: DumbStatePiece | null, x: number, y: number) {
    let html = "";

    let classes = "cell";
    if (
      this.selectedCoord !== null &&
      this.selectedCoord.equals(new Coord(x, y))
    ) {
      classes += " selected";
    }

    const shouldHighlightCells = this.options.difficulty === "easy";

    if (
      shouldHighlightCells &&
      this.highlightedCoords.some((coord) => coord.equals(new Coord(x, y)))
    ) {
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

  private createPromotionModal() {
    let promotionModal = '<div class="promotion-modal" style="display: none;">';

    promotionModal += `<h2>Escolha uma peça para promoção</h2>`;

    promotionModal += `<div class="choices-container">`;

    const pieces: PromotablePiece[] = ["bishop", "knight", "queen", "rook"];

    pieces.forEach((piece) => {
      promotionModal += `<button class="promotion-choice promotion-${piece}" data-piecetype="${piece}">${toHumanName(
        piece
      )}</button>`;
    });

    promotionModal += "</div></div>";

    document.body.innerHTML += promotionModal;

    this.promotionModal = document.querySelector(".promotion-modal");
  }
}
