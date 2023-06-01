import { Options } from "../models";
import { Difficulty, Mode } from "../protocols";

export class MenuView {
  constructor(
    private readonly chooseDifficulty: (difficulty: Difficulty) => void,
    private readonly chooseMode: (mode: Mode) => void,
    private readonly startGame: () => void
  ) {}

  renderOptions(options: Options) {
    const target = document.querySelector(".board");

    if (!target) {
      alert("Falha ao inicializar o jogo, Por favor recarregue a página.");
      return;
    }

    target.innerHTML = this.makeInnerMenuElement();
    this.bindDifficultyClick(options.getOptions());
    this.bindModeButtonClick(options.getOptions());
    this.bindStartButtonClick();
  }

  private makeInnerMenuElement() {
    let html = "";

    html += `
    <div class="options-box">
      <p class="option-title">Dificuldade</p>
      <div class="container">
        <button class="option difficulty" value="easy">Fácil (modo aprendizado)</button>
        <button class="option difficulty" value="medium">Normal</button>
        <button class="option difficulty" value="hard">Difícil</button>
      </div>
      <p class="option-title">Modo</p>
      <div class="container">
        <button class="option mode" value="human-computer">Jogador vs. IA</button>
        <button class="option mode" value="human-human">Jogador vs. Jogador</button>
      </div>
      <div class="container">
        <button class="start">Jogar!</button>
      </div>
    </div>`;

    return html;
  }

  private bindStartButtonClick() {
    const button = document.querySelector(".start");
    button?.addEventListener("click", () => {
      this.startGame();
    });
  }

  private bindDifficultyClick(options: Options) {
    const buttons = document.querySelectorAll(
      ".difficulty"
    ) as NodeListOf<HTMLInputElement>;

    buttons.forEach((button) => {
      if (button.value === options.difficulty) button.classList.add("selected");

      button?.addEventListener("click", () => {
        this.chooseDifficulty(button.value as Difficulty);
        buttons.forEach((button) => {
          button.classList.remove("selected");
        });
        button.classList.add("selected");
      });
    });
  }

  private bindModeButtonClick(options: Options) {
    const buttons = document.querySelectorAll(
      ".mode"
    ) as NodeListOf<HTMLInputElement>;

    buttons.forEach((button) => {
      if (button.value === options.mode) button.classList.add("selected");

      button?.addEventListener("click", () => {
        this.chooseMode(button.value as Mode);
        buttons.forEach((button) => {
          button.classList.remove("selected");
        });
        button.classList.add("selected");
      });
    });
  }
}
