import { playerIsComputer, playerIsHuman } from "./helpers";
import { Board } from "./models/board";
import { Coord } from "./models/coord";
import { Color, PlayerType } from "./protocols";
import { View } from "./view";

export class GameController {
  private readonly board: Board;
  private readonly view: View;

  private selectedCoord: Coord | null = null;
  private possibleMoves: Coord[] = [];

  private currentShift: Color = "white";

  private whiteType: PlayerType = "human";
  private blackType: PlayerType = "computer";

  constructor() {
    this.board = new Board();
    this.view = new View(this.handleCellClick.bind(this));
  }

  public start(): void {
    this.update();
  }

  public update() {
    this.view.renderBoard(this.board);

    if(this.isHumanTurn()) {
      this.view.bindCellClick();
    } else {
      // TODO: here
    }
  }

  private handleCellClick(coord: Coord) {
    // TODO: shouldn't need this here
    if (this.isAiTurn()) return;

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
    } else if (this.board.isFriendly(coord, this.currentShift)) {
      this.selectCoord(coord);
    } else if (this.selectedCoord && this.board.canMove(this.selectedCoord, coord)) {
      this.moveSelectedPiece(this.selectedCoord, coord);
    } else {
      alert("Movimento inválido");
    }
  }

  private handleCellClickWhenNotSelected(coord: Coord) {
    if (this.board.isFriendly(coord, this.currentShift)) {
      this.selectCoord(coord);
    } else if (this.board.hasEnemy(coord,this.currentShift)) {
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

  private isHumanTurn() {
    return (
      (this.currentShift === "white" && playerIsHuman(this.whiteType)) ||
      (this.currentShift === "black" && playerIsHuman(this.blackType))
    );
  }

  private isAiTurn() {
    return (
      (this.currentShift === "white" && playerIsComputer(this.whiteType)) ||
      (this.currentShift === "black" && playerIsComputer(this.blackType))
    );
  }
}
