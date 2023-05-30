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
    this.view = new View(this.handleCellClick.bind(this));
  }

  public start(): void {
    this.updateView();
  }

  public updateView(): void {
    this.view.renderBoard(this.board);
    this.view.bindCellClick();
  }

  private handleCellClick(coord: Coord) {
    // TODO: shouldn't need this here
    if (this.board.isAiTurn()) return;

    if (this.selectedCoord) {
      this.handleCellClickWhenSelected(coord);
    } else {
      this.handleCellClickWhenNotSelected(coord);
    }
  
    this.view.setHighlightedCells(this.possibleMoves);
    this.view.setSelectedCell(this.selectedCoord);

    this.updateView();
  }

  private handleCellClickWhenSelected(coord: Coord) {
    if (this.selectedCoord?.equals(coord)) {
      this.clearSelection();
    } else if (this.board.isFriendly(coord)) {
      this.selectCoord(coord);
    } else if (this.selectedCoord && this.board.canMove(this.selectedCoord, coord)) {
      this.moveSelectedPiece(this.selectedCoord, coord);
    } else {
      alert("Movimento inválido");
    }
  }

  private handleCellClickWhenNotSelected(coord: Coord) {
    if (this.board.isFriendly(coord)) {
      this.selectCoord(coord);
    } else if (this.board.hasEnemy(coord)) {
      alert("Não é possível selecionar uma peça inimiga");
    }
  }

  private clearSelection() {
    this.selectedCoord = null;
    this.possibleMoves = [];
  }

  private selectCoord(coord: Coord) {
    this.selectedCoord = coord;
    this.possibleMoves = this.board.getPieceMoves(coord);
  }

  private moveSelectedPiece(from: Coord, to: Coord) {
    this.board.movePiece(from, to);
    this.clearSelection();
  }
}
