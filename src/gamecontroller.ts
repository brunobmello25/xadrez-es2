import { Board } from "./models/board";
import { Coord } from "./models/coord";
import { View } from "./view";

export class GameController {
  private readonly board: Board;
  private readonly view: View;

  private selectedCoord: Coord | null = null;
  private possibleMoves: Coord[] = [];

  constructor() {
    this.board = new Board();
    this.view = new View(this.board, this.handleCellClick.bind(this));
  }

  public start(): void {
    this.view.updateBoard();
  }

  private handleCellClick(coord: Coord) {
    if (!this.selectedCoord) {
      if (this.board.isFriendly(coord)) {
        this.selectedCoord = coord;
        this.possibleMoves = this.board.getPieceMoves(coord);
      }

      else if (this.board.hasEnemy(coord)) {
        alert("Não é possível selecionar uma peça inimiga");
      }
    }

    else if (this.selectedCoord) {
      if (this.selectedCoord.equals(coord)) {
        this.selectedCoord = null;
        this.possibleMoves = [];
      }

      else if (this.board.isFriendly(coord)) {
        this.selectedCoord = coord;
        this.possibleMoves = this.board.getPieceMoves(coord);
      }

      else if (this.board.canMove(this.selectedCoord, coord)) {
        this.board.movePiece(this.selectedCoord, coord);
        this.selectedCoord = null;
        this.possibleMoves = [];
      }
    }

    this.view.setHighlightedCells(this.possibleMoves);
    this.view.setSelectedCell(this.selectedCoord);
  }
}
