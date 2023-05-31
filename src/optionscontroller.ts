import { GameController } from "./gamecontroller";
import { Options } from "./models/options";
import { View } from "./menuview";
import { Difficulty, Mode } from "./protocols";

export class OptionsController {
  private readonly options: Options;
  private readonly view: View;

  constructor() {
    this.options = new Options("easy", "human-computer");
    this.view = new View(
      this.chooseDifficulty.bind(this),
      this.chooseMode.bind(this),
      this.startGame.bind(this)
    );
  }

  public start(): void {
    this.view.renderOptions(this.options);
  }

  private chooseDifficulty(difficulty: Difficulty) {
    this.options.setDifficulty(difficulty);
  }

  private chooseMode(mode: Mode) {
    this.options.setMode(mode);
  }

  private startGame() {
    const gameController = new GameController(this.options);
    gameController.start();
  }
}
