import './styles'

export function main() {
  atualizaTabuleiro();
}



function criaPeca(cor, tipo) {
  return {
    cor,
    tipo
  }
}

function criaTabuleiro() {
  const tabuleiro = Array(8).fill([]).map(() => Array(8).fill(null));

  tabuleiro[0][0] = criaPeca('preto', 'torre');
  tabuleiro[0][1] = criaPeca('preto', 'cavalo');
  tabuleiro[0][2] = criaPeca('preto', 'bispo');
  tabuleiro[0][3] = criaPeca('preto', 'rei');
  tabuleiro[0][4] = criaPeca('preto', 'rainha');
  tabuleiro[0][5] = criaPeca('preto', 'bispo');
  tabuleiro[0][6] = criaPeca('preto', 'cavalo');
  tabuleiro[0][7] = criaPeca('preto', 'torre');

  for (let i = 0; i < 8; i++) {
    tabuleiro[1][i] = criaPeca('preto', 'peao');
  }

  tabuleiro[7][0] = criaPeca('branco', 'torre');
  tabuleiro[7][1] = criaPeca('branco', 'cavalo');
  tabuleiro[7][2] = criaPeca('branco', 'bispo');
  tabuleiro[7][3] = criaPeca('branco', 'rei');
  tabuleiro[7][4] = criaPeca('branco', 'rainha');
  tabuleiro[7][5] = criaPeca('branco', 'bispo');
  tabuleiro[7][6] = criaPeca('branco', 'cavalo');
  tabuleiro[7][7] = criaPeca('branco', 'torre');

  for (let i = 0; i < 8; i++) {
    tabuleiro[6][i] = criaPeca('branco', 'peao');
  }

  return tabuleiro;
}

function criaElementoCasa(peca, x, y) {
  let html = "";

  html += `<div class='casa' data-x='${x}' data-y='${y}'>`;

  if (peca != null) {
    html += `<div class='peca'><img src="images/${peca.tipo}-${peca.cor}.png" alt="" srcset=""></div>`;
  }

  html += `</div>`;

  return html;
}

function criaConteudoElementoTabuleiro(tabuleiro) {
  let html = '';

  tabuleiro.forEach((linha, y) => {
    html += `<div class='linha linha-${y % 2 == 0 ? 'par' : 'impar'}'>`;
    linha.forEach((casa, x) => {
      html += criaElementoCasa(casa, x, y);
    })
    html += "</div>";
  })

  return html;
}

function atualizaTabuleiro() {
  const tabuleiro = document.querySelector('.tabuleiro');

  tabuleiro.innerHTML = criaConteudoElementoTabuleiro(criaTabuleiro());
}
