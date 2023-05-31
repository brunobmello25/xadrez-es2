export class Options {
  difficulty: number;

  mode: number;

  constructor(difficulty: number, mode: number) {
    this.difficulty = difficulty;
    this.mode = mode;
  }

  setDifficulty(difficulty: number) {
    this.difficulty = difficulty;
  }

  setMode(mode: number) {
    this.mode = mode;
  }

  getOptions() {
    return this;
  }
}
