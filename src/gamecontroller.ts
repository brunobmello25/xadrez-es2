import { RandomEngine } from "./engine/random";
import { Board } from "./models/board";
import { Coord } from "./models/coord";
import { Engine } from "./protocols";
import { ShiftController } from "./shiftcontroller";
import { View } from "./view";

export class GameController {
  private readonly board: Board;
  private readonly view: View;
  private readonly shiftController: ShiftController;
  private readonly engine: Engine;

  private selectedCoord: Coord | null = null;
  private possibleMoves: Coord[] = [];

  constructor() {
    this.board = new Board();
    this.shiftController = new ShiftController(this.board);
    this.view = new View(this.handleCellClick.bind(this));
    this.engine = new RandomEngine(this.board, this.shiftController);
  }

  public async start(): Promise<void> {
    await this.update();
  }

  public async update() {
    this.view.renderBoard(this.board);

    if (this.shiftController.isHumanTurn()) {
      this.view.bindBoardClickListeners();
    } else {
      await this.engine.playTurn();
      this.shiftController.updateShift();
      this.update();
    }
  }

  private handleCellClick(coord: Coord) {
    if (this.selectedCoord) {
      this.handleCellClickWhenSelected(coord);
    } else {
      this.handleCellClickWhenNotSelected(coord);
    }

    this.view.setHighlightedCells(this.possibleMoves);
    this.view.setSelectedCell(this.selectedCoord);

    this.update();
  }

  private handleCellClickWhenSelected(coord: Coord) {
    if (this.selectedCoord?.equals(coord)) {
      this.clearSelection();
    } else if (this.shiftController.hasAlly(coord)) {
      this.selectCoord(coord);
    } else if (
      this.selectedCoord &&
      this.shiftController.canMove(this.selectedCoord, coord)
    ) {
      this.moveSelectedPiece(this.selectedCoord, coord);
    } else {
      alert("Movimento inválido");
    }
  }

  private handleCellClickWhenNotSelected(coord: Coord) {
    if (this.shiftController.hasAlly(coord)) {
      this.selectCoord(coord);
    } else if (this.shiftController.hasOpponent(coord)) {
      alert("Não é possível selecionar uma peça inimiga");
    }
  }

  private clearSelection() {
    this.selectedCoord = null;
    this.possibleMoves = [];
  }

  private selectCoord(coord: Coord) {
    this.selectedCoord = coord;
    const piece = this.board.getFromCoord(coord);

    if (piece) {
      this.possibleMoves = this.shiftController.getPieceMoves(coord, piece);
    }
  }

  private moveSelectedPiece(from: Coord, to: Coord) {
    // TODO: move this and all of the player logic to a player engine class
    this.board.movePiece(from, to);
    this.clearSelection();
    this.shiftController.updateShift();
  }
}
