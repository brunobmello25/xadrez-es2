import { RandomEngine } from "../engine/random";
import { makeInitialBoard } from "../helpers";
import { Board, Coord, Options } from "../models";
import { Color, Engine } from "../protocols";
import { BoardView } from "../view";
import { ShiftController } from "./shiftcontroller";

export class GameController {
  private readonly board: Board;
  private readonly view: BoardView;
  private readonly shiftController: ShiftController;
  private readonly engine: Engine;

  private selectedCoord: Coord | null = null;
  private possibleMoves: Coord[] = [];

  private checkMate = false;
  private staleMate = false;
  private winner: Color | null = null;

  constructor(options: Options) {
    this.board = new Board(makeInitialBoard());
    this.shiftController = new ShiftController(this.board, options);
    this.view = new BoardView(options, this.handleCellClick.bind(this));
    this.engine = new RandomEngine(this.board, this.shiftController);
  }

  public async start(): Promise<void> {
    await this.update();
  }

  public async restart(): Promise<void> {
    this.checkMate = false;
    this.staleMate = false;
    this.winner = null;
    this.board.reset();
    this.shiftController.reset();
    this.clearSelection();
    this.update();
  }

  public async update() {
    if (this.checkMate) {
      this.view.renderCheckMate(this.winner);
      this.restart();
      return;
    } else if (this.staleMate) {
      this.view.renderStaleMate();
      this.restart();
      return;
    }

    this.view.renderBoard(this.board);

    if (this.shiftController.isHumanTurn()) {
      this.view.bindBoardClickListeners();
    } else {
      await this.engine.playTurn();
      this.shiftController.updateShift();
      this.checkCheckMate();
      this.checkStaleMate();
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
    } else if (this.board.hasAlly(coord, this.shiftController.currentShift())) {
      this.selectCoord(coord);
    } else if (
      this.selectedCoord &&
      this.shiftController.canMove(this.selectedCoord, coord)
    ) {
      this.moveSelectedPiece(this.selectedCoord, coord);
    } else {
      this.clearSelection();
    }
  }

  private handleCellClickWhenNotSelected(coord: Coord) {
    if (this.board.hasAlly(coord, this.shiftController.currentShift())) {
      this.selectCoord(coord);
    } else if (
      this.board.hasOpponent(coord, this.shiftController.currentShift())
    ) {
      alert("Não é possível selecionar uma peça inimiga");
    }
  }

  private clearSelection() {
    this.selectedCoord = null;
    this.possibleMoves = [];
  }

  private selectCoord(coord: Coord) {
    this.selectedCoord = coord;

    this.possibleMoves = this.board.getValidMoves(coord);
  }

  private moveSelectedPiece(from: Coord, to: Coord) {
    // TODO: move this and all of the player logic to a player engine class
    this.board.movePiece(from, to);
    this.clearSelection();
    this.shiftController.updateShift();
    this.checkCheckMate();
    this.checkStaleMate();
  }

  private checkStaleMate() {
    if (this.board.isStaleMate(this.shiftController.currentShift())) {
      this.staleMate = true;
    }
  }

  private checkCheckMate() {
    if (this.board.isCheckMate("black")) {
      this.checkMate = true;
      this.winner = "white";
    } else if (this.board.isCheckMate("white")) {
      this.checkMate = true;
      this.winner = "black";
    }
  }
}
