import { Board } from "./models/board";
import { View } from "./view";

export class GameController {
  private readonly board: Board;
  private readonly view: View;

  constructor() {
    this.board = new Board();
    this.view = new View(this.board);
  }

  public start(): void {
    this.view.updateBoard();
  }
}
