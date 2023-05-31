import { Difficulty, Mode } from "../protocols";

export class Options {
  difficulty: Difficulty;

  mode: Mode;

  constructor(difficulty: Difficulty, mode: Mode) {
    this.difficulty = difficulty;
    this.mode = mode;
  }

  setDifficulty(difficulty: Difficulty) {
    this.difficulty = difficulty;
  }

  setMode(mode: Mode) {
    this.mode = mode;
  }

  getOptions() {
    return this;
  }
}
