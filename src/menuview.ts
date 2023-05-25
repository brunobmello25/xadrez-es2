import { Options } from "./models/options";

export class View {
  constructor(
    private readonly chooseDifficulty: (id: Number) => void,
    private readonly chooseMode: (id: Number) => void
  ) {}

  renderOptions(options: Options) {
    const target = document.querySelector(".board");

    if (!target) {
      alert("Falha ao inicializar o jogo, Por favor recarregue a página.");
      return;
    }

    target.innerHTML = this.makeInnerMenuElement(options.getOptions());
  }

  private makeInnerMenuElement(options: Options) {
    let html = "";

    html += `<div class='a'>${options.difficulty} ${options.mode} </div>`;

    return html;
  }
}
