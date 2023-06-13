import { MinmaxEngine } from "../engine/minmax";
import { RandomEngine } from "../engine/random";
import { makeInitialBoard } from "../helpers";
import { Board, Coord, Options } from "../models";
import { Movement } from "../models";
import { Bishop, Knight, Queen, Rook } from "../models/pieces";
import { Color, Engine, PromotablePiece } from "../protocols";
import { BoardView } from "../view";
import { ShiftController } from "./shiftcontroller";

export class GameController {
  private readonly board: Board;
  private readonly view: BoardView;
  private readonly shiftController: ShiftController;
  private readonly engine: Engine;

  private selectedCoord: Coord | null = null;
  private possibleMoves: Movement[] = [];

  private checkMate = false;
  private staleMate = false;
  private winner: Color | null = null;

  constructor(options: Options) {
    this.board = new Board(makeInitialBoard());
    this.shiftController = new ShiftController(this.board, options);
    this.view = new BoardView(options, this.handleCellClick.bind(this));

    if (options.difficulty === "hard") {
      this.engine = new MinmaxEngine(this.board, this.shiftController);
    } else {
      this.engine = new RandomEngine(this.board, this.shiftController);
    }
  }

  public async start(): Promise<void> {
    await this.update();
  }

  public async restart(): Promise<void> {
    this.checkMate = false;
    this.staleMate = false;
    this.winner = null;
    this.board.reset(makeInitialBoard());
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

    if (this.board.pieceToPromote) {
      if (this.shiftController.isHumanTurn()) {
        this.view.showPromotionModal(this.handlePromotion.bind(this));
      } else {
        const promotion = await this.engine.pickPromotionPiece();
        this.handlePromotion(promotion);
      }
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

  private handlePromotion(promotion: PromotablePiece) {
    if (!this.board.pieceToPromote) throw new Error("No promotable piece");

    const piece = this.createPiece(
      promotion,
      this.board.pieceToPromote.piece.color
    );
    this.board.setInCoord(this.board.pieceToPromote.coord, piece);
    this.board.pieceToPromote = null;

    this.update();
  }

  private handleCellClick(coord: Coord) {
    if (this.selectedCoord) {
      this.handleCellClickWhenSelected(coord);
    } else {
      this.handleCellClickWhenNotSelected(coord);
    }

    this.view.setHighlightedCells(this.possibleMoves.map((m) => m.destination));
    this.view.setSelectedCell(this.selectedCoord);

    this.update();
  }

  private handleCellClickWhenSelected(coord: Coord) {
    const selectedCoord = this.selectedCoord;

    if (!selectedCoord || selectedCoord.equals(coord)) {
      this.clearSelection();
      return;
    }

    const movement = this.possibleMoves.find((m) =>
      m.destination.equals(coord)
    );

    if (movement) {
      this.moveSelectedPiece(movement);
    } else if (this.board.hasAlly(coord, this.shiftController.currentShift())) {
      this.selectCoord(coord);
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

  private moveSelectedPiece(movement: Movement) {
    // TODO: move this and all of the player logic to a player engine class
    this.board.movePiece(movement);
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

  private createPiece(type: PromotablePiece, color: Color) {
    const constructors = {
      bishop: Bishop,
      knight: Knight,
      queen: Queen,
      rook: Rook,
    };

    const PieceConstructor = constructors[type];

    return new PieceConstructor(color);
  }
}
