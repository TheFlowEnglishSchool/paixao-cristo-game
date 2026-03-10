<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>Ecos do Gólgota</title>

<style>

body{
margin:0;
background:#000;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
font-family:Arial;
}

canvas{
border:3px solid gold;
background:#0a0a0a;
}

</style>
</head>

<body>

<canvas id="gameCanvas" width="900" height="500"></canvas>

<script>

const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')

const GAME_STATE={
MENU:"menu",
LABORATORY:"lab",
DIALOG:"dialog",
CHOICE:"choice",
ENDING:"ending"
}

const game={
state:GAME_STATE.MENU,
dialog:0,
choiceIndex:0,
faith:0,
science:0,
playerX:200,
playerY:250,
speed:3,
keys:{}
}

function saveGame(){
localStorage.setItem("golgota_save",JSON.stringify(game))
}

function loadGame(){
let save=localStorage.getItem("golgota_save")
if(save){
Object.assign(game,JSON.parse(save))
}
}

loadGame()

const dialogues=[

{
title:"LAB - 3500 d.C.",
character:"Dra. Sara",
text:"O cérebro é apenas química. A alma uma ilusão neuronal.",
choices:[
{text:"Continuar experimento",next:1,action:"science"},
{text:"Parar experimento",next:2,action:"faith"}
]
},

{
title:"LAB",
character:"Lia",
text:"Doutora, os dados não fazem sentido.",
choices:[
{text:"Aumentar potência",next:3,action:"science"},
{text:"Reconhecer anormal",next:3,action:"faith"}
]
},

{
title:"LAB",
character:"Sara",
text:"Talvez exista algo além do que podemos medir.",
choices:[
{text:"Voltar aos dados",next:3,action:"science"},
{text:"Investigar memória",next:3,action:"faith"}
]
},

{
title:"MEMÓRIA - Jerusalém",
character:"Mulher",
text:"Você também veio ver o homem chamado Jesus?",
choices:[
{text:"Observar cientificamente",next:4,action:"science"},
{text:"Sentir a experiência",next:4,action:"faith"}
]
},

{
title:"Calvário",
character:"Centurião",
text:"Verdadeiramente este homem era justo.",
choices:[
{text:"Fenômeno psicológico",next:5,action:"science"},
{text:"Algo divino aconteceu",next:5,action:"faith"}
]
},

{
title:"EPIFANIA",
character:"Sara",
text:"Ciência mede o universo, mas não mede o amor que vi naquela cruz.",
choices:[
{text:"Negar transcendência",next:"ending_science",action:"science"},
{text:"Aceitar fé",next:"ending_faith",action:"faith"},
{text:"Unir fé e ciência",next:"ending_synthesis",action:"faith"}
]
}

]

window.addEventListener("keydown",e=>{

game.keys[e.key]=true

if(game.state===GAME_STATE.CHOICE){

let current=dialogues[game.dialog]
let total=current.choices.length

if(e.key==="ArrowUp") game.choiceIndex=(game.choiceIndex-1+total)%total
if(e.key==="ArrowDown") game.choiceIndex=(game.choiceIndex+1)%total

if(e.key==="Enter") handleChoice(game.choiceIndex)

}

})

window.addEventListener("keyup",e=>{
game.keys[e.key]=false
})

function handleChoice(i){

let current=dialogues[game.dialog]
let choice=current.choices[i]

if(choice.action==="science") game.science++
if(choice.action==="faith") game.faith++

if(typeof choice.next==="string"){
game.dialog=choice.next
game.state=GAME_STATE.ENDING
}else{
game.dialog=choice.next
game.state=GAME_STATE.DIALOG
}

game.choiceIndex=0
saveGame()

}

function drawMenu(){

ctx.fillStyle="#000"
ctx.fillRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="gold"
ctx.font="50px Arial"
ctx.textAlign="center"

ctx.fillText("ECOS DO GÓLGOTA",450,150)

ctx.fillStyle="#fff"
ctx.font="20px Arial"

ctx.fillText("Pressione ESPAÇO",450,300)

}

function drawLab(){

ctx.fillStyle="#1a1a2e"
ctx.fillRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="#333"
ctx.fillRect(450,200,120,80)

ctx.fillStyle="cyan"
ctx.fillRect(490,230,30,30)

ctx.fillStyle="white"
ctx.fillRect(game.playerX,game.playerY,25,25)

ctx.fillStyle="#fff"
ctx.font="14px Arial"

ctx.fillText("Use as setas para andar até o computador",20,30)

}

function wrapText(text,x,y,maxWidth,lineHeight){

let words=text.split(" ")
let line=""

for(let n=0;n<words.length;n++){

let testLine=line+words[n]+" "
let width=ctx.measureText(testLine).width

if(width>maxWidth && n>0){
ctx.fillText(line,x,y)
line=words[n]+" "
y+=lineHeight
}else{
line=testLine
}

}

ctx.fillText(line,x,y)

}

function drawDialog(){

let d=dialogues[game.dialog]

ctx.fillStyle="rgba(0,0,0,0.8)"
ctx.fillRect(0,350,900,150)

ctx.fillStyle="gold"
ctx.font="bold 16px Arial"
ctx.fillText(d.title,20,380)

ctx.fillStyle="#fff"
ctx.font="bold 18px Arial"
ctx.fillText(d.character+":",20,405)

ctx.font="16px Arial"
wrapText(d.text,20,430,800,20)

drawChoices()

}

function drawChoices(){

let current=dialogues[game.dialog]

let startY=450

for(let i=0;i<current.choices.length;i++){

let y=startY+i*25
let selected=i===game.choiceIndex

ctx.fillStyle=selected?"gold":"#aaa"
ctx.font=selected?"bold 16px Arial":"16px Arial"

ctx.fillText((selected?"► ":"  ")+current.choices[i].text,40,y)

}

}

function drawEnding(){

ctx.fillStyle="#000"
ctx.fillRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="gold"
ctx.font="40px Arial"
ctx.textAlign="center"

if(game.dialog==="ending_science"){
ctx.fillText("FINAL: A NEGAÇÃO",450,200)
}

if(game.dialog==="ending_faith"){
ctx.fillText("FINAL: A FÉ",450,200)
}

if(game.dialog==="ending_synthesis"){
ctx.fillText("FINAL: A SÍNTESE",450,200)
}

ctx.fillStyle="#fff"
ctx.font="18px Arial"

ctx.fillText("Fé: "+game.faith+" | Ciência: "+game.science,450,260)
ctx.fillText("Atualize a página para jogar novamente",450,320)

}

function update(){

if(game.state===GAME_STATE.MENU && game.keys[" "]){
game.state=GAME_STATE.LABORATORY
}

if(game.state===GAME_STATE.LABORATORY){

if(game.keys["ArrowLeft"]) game.playerX-=game.speed
if(game.keys["ArrowRight"]) game.playerX+=game.speed
if(game.keys["ArrowUp"]) game.playerY-=game.speed
if(game.keys["ArrowDown"]) game.playerY+=game.speed

if(game.playerX>450){
game.state=GAME_STATE.DIALOG
}

}

if(game.state===GAME_STATE.DIALOG){
game.state=GAME_STATE.CHOICE
}

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

if(game.state===GAME_STATE.MENU) drawMenu()

if(game.state===GAME_STATE.LABORATORY) drawLab()

if(game.state===GAME_STATE.DIALOG || game.state===GAME_STATE.CHOICE) drawDialog()

if(game.state===GAME_STATE.ENDING) drawEnding()

}

function loop(){

update()
draw()

requestAnimationFrame(loop)

}

loop()

</script>

</body>
</html>
