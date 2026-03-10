// Atualiza para Versão 2.0: Adiciona sistema de transição, save/load e expansão da história
// Desenvolvedor: TheFlow English School
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
  choiceIndex: 0,  // NOVO: índice da seleção atual
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
    title: 'MEMÓRIA - Jerusalem, 33 d.C.',
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

// CONTROLE DE ENTRADA
window.addEventListener('keydown', (e) => {
  game.keys[e.key] = true;
  
  // Se está no estado CHOICE, processa navegação das escolhas
  if (game.state === GAME_STATE.CHOICE) {
    const current = dialogues[game.dialog];
    const numChoices = current.choices.length;
    
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      game.choiceIndex = (game.choiceIndex - 1 + numChoices) % numChoices;
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      game.choiceIndex = (game.choiceIndex + 1) % numChoices;
    } else if (e.key === 'Enter' || e.key === ' ') {
      handleChoice(game.choiceIndex);
    }
  }
});

window.addEventListener('keyup', (e) => {
  game.keys[e.key] = false;
});

// PROCESSA A ESCOLHA SELECIONADA
function handleChoice(choiceIndex) {
  const current = dialogues[game.dialog];
  if (current.choices.length > choiceIndex) {
    const choice = current.choices[choiceIndex];
    
    // Atualiza fé ou ciência
    if (choice.action === 'science') game.science++;
    if (choice.action === 'faith') game.faith++;
    
    // Move para próxima cena
    game.dialog = typeof choice.next === 'string' ? choice.next : choice.next;
    
    // Reinicia o índice de seleção
    game.choiceIndex = 0;
    
    // Vai para DIALOG (que depois detectará se há choices e entrará em CHOICE)
    game.state = GAME_STATE.DIALOG;
  }
}

// DESENHA O MENU
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

// DESENHA O DIÁLOGO E OPÇÕES
function drawDialog() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.fillRect(0, canvas.height - 200, canvas.width, 200);
  
  ctx.fillStyle = '#FFD700';
  ctx.font = 'bold 14px Arial';
  ctx.fillText(dialogues[game.dialog].title, 20, canvas.height - 180);
  
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 16px Arial';
  ctx.fillText(dialogues[game.dialog].character + ':', 20, canvas.height - 160);
  
  ctx.font = '14px Arial';
  ctx.fillText(dialogues[game.dialog].text, 20, canvas.height - 140);
  
  // NOVO: desenha as opções de escolha
  drawChoices();
}

// NOVO: DESENHA AS OPÇÕES COM SELEÇÃO VISUAL
function drawChoices() {
  const current = dialogues[game.dialog];
  if (!current.choices || current.choices.length === 0) return;
  
  const startY = canvas.height - 90;
  const lineHeight = 30;
  
  for (let i = 0; i < current.choices.length; i++) {
    const isSelected = i === game.choiceIndex;
    const x = 40;
    const y = startY + i * lineHeight;
    
    // Desenha fundo da opção selecionada
    if (isSelected) {
      ctx.fillStyle = 'rgba(255, 215, 0, 0.2)';
      ctx.fillRect(x - 20, y - 15, 500, 25);
    }
    
    // Desenha o marcador e o texto
    ctx.fillStyle = isSelected ? '#FFD700' : '#aaa';
    ctx.font = isSelected ? 'bold 14px Arial' : '14px Arial';
    ctx.fillText((isSelected ? '► ' : '  ') + current.choices[i].text, x, y);
  }
  
  ctx.fillStyle = '#888';
  ctx.font = '12px Arial';
  ctx.fillText('Use ↑/↓ ou ←/→ para escolher, ENTER para confirmar', 20, canvas.height - 10);
}

// DESENHA O FINAL
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
    ctx.fillText('Juntas, Sara e Lia comecaram uma nova era de compreensao.', canvas.width / 2, 180);
  }
  
  ctx.font = '12px Arial';
  ctx.fillText('Fé: ' + game.faith + ' | Ciência: ' + game.science, canvas.width / 2, canvas.height - 50);
}

// ATUALIZA O ESTADO DO JOGO
function update() {
  // Menu -> Diálogo
  if (game.state === GAME_STATE.MENU && game.keys[' ']) {
    game.state = GAME_STATE.DIALOG;
    game.choiceIndex = 0;
  }
  
  // Diálogo: verifica se tem opções para ir para CHOICE
  if (game.state === GAME_STATE.DIALOG) {
    const current = dialogues[game.dialog] || { choices: [] };
    if (current.choices && current.choices.length > 0) {
      game.state = GAME_STATE.CHOICE;
    }
  }
}

// DESENHA NA TELA
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (game.state === GAME_STATE.MENU) {
    drawMenu();
  } else if (game.state === GAME_STATE.CHOICE) {
    // Desenha como diálogo mas com choices visíveis
    ctx.fillStyle = 'rgba(10, 10, 20, 0.9)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawDialog();
  } else if (game.state === GAME_STATE.DIALOG) {
    ctx.fillStyle = 'rgba(10, 10, 20, 0.9)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawDialog();
  } else if (game.state === GAME_STATE.ENDING || typeof game.dialog === 'string') {
    drawEnding();
  }
}

// LOOP DO JOGO
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
