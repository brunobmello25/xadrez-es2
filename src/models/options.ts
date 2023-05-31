export class Options {
  difficulty: Number;

  mode: Number;

  constructor(difficulty: Number, mode: Number) {
    this.difficulty = difficulty;
    this.mode = mode;
  }

  setDifficulty(difficulty: Number) {
    this.difficulty = difficulty;
  }

  setMode(mode: Number) {
    this.mode = mode;
  }

  getOptions() {
    return this;
  }
}
