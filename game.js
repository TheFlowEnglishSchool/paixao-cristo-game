const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = { x: 100, y: 300, width: 40, height: 60, speed: 3 };
const keys = {};

window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

function update() {
  if (keys['ArrowRight']) player.x += player.speed;
  if (keys['ArrowLeft']) player.x -= player.speed;
  if (keys['ArrowUp']) player.y -= player.speed;
  if (keys['ArrowDown']) player.y += player.speed;
  
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
  if (player.y < 0) player.y = 0;
  if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#FFD700';
  ctx.fillRect(player.x, player.y, player.width, player.height);
  
  ctx.fillStyle = 'white';
  ctx.font = '16px Arial';
  ctx.fillText('Use as setas para mover', 10, 30);
  ctx.fillText('Paísao de Cristo - Game', canvas.width / 2 - 100, 30);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
