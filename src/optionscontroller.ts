
import { GameController } from "./gamecontroller";
import { Options } from "./models/options";
import { View } from "./menuview";

export class OptionsController {
  private readonly options: Options;
  private readonly view: View;

  constructor() {
    this.options = new Options(1, 1);
    this.view = new View(
      this.chooseDifficulty.bind(this),
      this.chooseMode.bind(this),
      this.startGame.bind(this)
    );
  }

  public start(): void {
    this.view.renderOptions(this.options);
  }

  private chooseDifficulty(difficulty: Number) {
    this.options.setDifficulty(difficulty);
  }

  private chooseMode(mode: Number) {
    this.options.setMode(mode);
  }

  private startGame() {
    const gameController = new GameController(this.options);
    gameController.start();
  }
}
