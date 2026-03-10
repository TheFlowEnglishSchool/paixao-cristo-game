Atualiza para Versão 2.0: Adiciona sistema de transição, save/load e expansão da história// Desenvolvedor: TheFlow English School
// Narrativa: Uma jornada científica que desafia a razão

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// ESTADOS DO JOGO
const GAME_STATE = {
  MENU: 'menu',
  LABORATORY: 'laboratory',
  DIALOG: 'dialog',
  MEMORY: 'memory',
  CHOICE: 'choice',
  ENDING: 'ending'
};

// DADOS GLOBAIS
const game = {
  state: GAME_STATE.MENU,
  scene: 0,
  dialog: 0,
  faith: 0,
  science: 0,
  playerX: 400,
  playerY: 225,
  keys: {}
};

// CENAS DE DIÁLOGO
const dialogues = [
  {
    title: 'LAB - 3500 d.C.',
    character: 'Dra. Sara',
    text: 'O cérebro é apenas química. A alma, uma ilusao neuronal.',
    choices: [
      { text: 'Continuar a sessao', next: 1, action: 'science' },
      { text: 'Parar o experimento', next: 'menu', action: 'faith' }
    ]
  },
  {
    title: 'LAB - 3500 d.C.',
    character: 'Lia (Assistente)',
    text: 'Doutora, os dados... não fazem sentido. É como se...',
    choices: [
      { text: 'Aumentar a potencia', next: 2, action: 'science' },
      { text: 'Reconhecer o anormal', next: 3, action: 'faith' }
    ]
  },
  {
    title: 'MEMÓRIA - Jeru salém, 33 d.C.',
    character: 'Mulher de Jer. (Sara vivenciando)',
    text: 'Seu rosto... não é como os pregadores descrevem... É uma dor infinita.',
    choices: [
      { text: 'Tentar manter distância científica', next: 4, action: 'science' },
      { text: 'Deixar as lágrimas caírem', next: 5, action: 'faith' }
    ]
  },
  {
    title: 'MEMÓRIA - Calvário',
    character: 'Centurião (Sara vivenciando)',
    text: 'Nenhum homem morre desse jeito... A escuridão não é natural.',
    choices: [
      { text: 'Explicar como fenômeno solar', next: 6, action: 'science' },
      { text: 'Aceitar que é divino', next: 7, action: 'faith' }
    ]
  },
  {
    title: 'MEMÓRIA - A Cruz',
    character: 'Maria (Sara vivenciando)',
    text: 'Meu filho... Não há palavras. Só dor que cria vida nova.',
    choices: [
      { text: 'Isso é apenas tristeza biológica', next: 8, action: 'science' },
      { text: 'Isso é amor redentor', next: 9, action: 'faith' }
    ]
  },
  {
    title: 'EPIFANIA',
    character: 'Dra. Sara (De volta ao Lab)',
    text: 'A máquina desligou. Meus sensores... estão danificados. Mas minha mente...',
    choices: [
      { text: 'Negar tudo - Retornar aos dados', next: 'ending_science', action: 'science' },
      { text: 'Aceitar a transcendência', next: 'ending_faith', action: 'faith' },
      { text: 'Buscar uma síntese', next: 'ending_synthesis', action: 'faith' }
    ]
  }
];

// CONTROLE
window.addEventListener('keydown', (e) => {
  game.keys[e.key] = true;
  if (game.state === GAME_STATE.CHOICE) handleChoice(e);
});

window.addEventListener('keyup', (e) => {
  game.keys[e.key] = false;
});

function handleChoice(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    const current = dialogues[game.dialog];
    if (current.choices.length > 0) {
      const choice = current.choices[0];
      if (choice.action === 'science') game.science++;
      if (choice.action === 'faith') game.faith++;
      game.dialog = typeof choice.next === 'string' ? choice.next : choice.next;
      game.state = GAME_STATE.DIALOG;
    }
  }
}

// RENDERIZAÇÃO
function drawMenu() {
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#FFD700';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('ECOS DO GÓLGOTA', canvas.width / 2, 100);
  
  ctx.fillStyle = '#fff';
  ctx.font = '16px Arial';
  ctx.fillText('Um jogo de Fé e Ciência', canvas.width / 2, 140);
  ctx.fillText('Pressione ESPAÇO para começar', canvas.width / 2, 380);
  
  ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
  ctx.fillRect(canvas.width / 2 - 100, 220, 200, 120);
  ctx.fillStyle = '#FFD700';
  ctx.font = 'italic 14px Arial';
  ctx.fillText('A Doutora Sara pensava que sabia', canvas.width / 2, 260);
  ctx.fillText('tudo sobre a história.', canvas.width / 2, 280);
  ctx.fillText('Até descobrir que a história', canvas.width / 2, 300);
  ctx.fillText('a conhecia primeiro.', canvas.width / 2, 320);
}

function drawDialog() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.fillRect(0, canvas.height - 150, canvas.width, 150);
  
  ctx.fillStyle = '#FFD700';
  ctx.font = 'bold 14px Arial';
  ctx.fillText(dialogues[game.dialog].title, 20, canvas.height - 130);
  
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 16px Arial';
  ctx.fillText(dialogues[game.dialog].character + ':', 20, canvas.height - 110);
  
  ctx.font = '14px Arial';
  ctx.fillText(dialogues[game.dialog].text, 20, canvas.height - 90);
  ctx.fillText('\u25b6 Pressione ENTER para continuar', 20, canvas.height - 30);
}

function drawEnding() {
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#FFD700';
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  
  if (game.dialog === 'ending_science') {
    ctx.fillText('A NEGACAO', canvas.width / 2, 100);
    ctx.font = '14px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText('Sara voltou aos dados. Negou tudo.', canvas.width / 2, 150);
    ctx.fillText('Seu laboratório agora é um túmulo de certezas.', canvas.width / 2, 180);
  } else if (game.dialog === 'ending_faith') {
    ctx.fillText('A TRANSCENDENCIA', canvas.width / 2, 100);
    ctx.font = '14px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText('Lia a encontrou chorando no chão do laboratório.', canvas.width / 2, 150);
    ctx.fillText('Pela primeira vez, a Doutora Sara rendeu-se ao impossível.', canvas.width / 2, 180);
  } else if (game.dialog === 'ending_synthesis') {
    ctx.fillText('A SINTESE', canvas.width / 2, 100);
    ctx.font = '14px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText('Sara compreendeu: ciência não nega fé, apenas a nao mede.', canvas.width / 2, 150);
    ctx.fillText('Juntas, Sara e Lia comeraum nova era de compreensao.', canvas.width / 2, 180);
  }
  
  ctx.font = '12px Arial';
  ctx.fillText('Fé: ' + game.faith + ' | Ciência: ' + game.science, canvas.width / 2, canvas.height - 50);
}

function update() {
  if (game.state === GAME_STATE.MENU && game.keys[' ']) {
    game.state = GAME_STATE.DIALOG;
  }
  if (game.state === GAME_STATE.DIALOG && game.keys['Enter']) {
    handleChoice({ key: 'Enter' });
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (game.state === GAME_STATE.MENU) {
    drawMenu();
  } else if (game.state === GAME_STATE.DIALOG) {
    ctx.fillStyle = 'rgba(10, 10, 20, 0.9)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawDialog();
  } else if (game.state === GAME_STATE.ENDING || typeof game.dialog === 'string') {
    drawEnding();
  }
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
