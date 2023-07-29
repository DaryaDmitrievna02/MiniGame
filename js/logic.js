// game display elements
const grid = document.querySelector(".grid");
const startBtn = document.querySelector(".start-btn");
const keyBtns = document.querySelectorAll(".keys-container button");
let hp = document.getElementById("HP");
let hearts = document.getElementById("hearts");
let timer = document.getElementById("timer");
let gameOver = document.getElementById("game-over");
let restart = document.getElementById("restart");


hearts.classList.add("heart");

restart.addEventListener("click", function(){
    location.href = location.href;
})


const width = 30;
const numCells = width * width;


// create grid cells
for (let i = 0; i < 289; i++) {
  const cell = document.createElement("div");
  cell.style.width = `${width * 2}px`;
  cell.style.height = `${width * 2}px`;
  grid.appendChild(cell);
}
const cells = document.querySelectorAll(".grid div");

let direction = 1;
let intervalTime = 500; // determines speed - frequency of game loop calls
let interval = 0;
let vampLife = 0;


//Vamp

let currentVamp = [0];
let currentVill = [0];

let Vill = "true"; // if have vill
let Vamp = "false";
let counterSpawn = 0;
let counterVampLife =0;

function startGame() {
  currentVamp = [0];
  currentVamp.forEach((i) => {
    cells[i].classList.add("vamp");
  });

  currentVill = [108];
  cells[108].classList.add("vill");

  interval = setInterval(gameLoop, intervalTime);

  vampLife = setInterval(vampLifes, 1000);
  Vamp = "true";

}


function vampLifes(){
    if(hp.textContent== 1) { 
        dieVamp();
        hp.textContent =  +hp.textContent -1;}
    else if(counterVampLife == 10){   hp.textContent =  +hp.textContent -1;
    counterVampLife = 0}
 counterVampLife +=1;
 console.log(counterVampLife);
 timer.textContent = counterVampLife;

   

}

function clearVamp(currentVamp) {
  cells[currentVamp].style.background = "none";
  cells[currentVamp].classList.remove("vamp");
  cells[currentVamp].innerText = "";
}

function drawVamp(position) {
  cells[position].style.removeProperty("background");
  cells[position].classList.add("vamp");
  currentVamp = [position];
}


function dieVamp(){
    gameOver.style.display = "flex";
    clearInterval(interval);
    clearInterval(vampLife);
    Vamp = "false";
}

function drawVill(currentVill) {
  cells[currentVill].style.removeProperty("background");
  cells[currentVill].classList.add("vill");
}

function spawnVill(){
let RAND = randomInt(10,280);
    currentVill = [RAND];
    cells[RAND].classList.add("vill");
    drawVill(currentVill);
    Vill = 'true';
 

}

function clearVill(currentVill) {
  cells[currentVill].style.background = "none";
  cells[currentVill].classList.remove("vill");
  cells[currentVill].innerText = "";
}

function dieVill(currentVill) {
  cells[currentVill].style.removeProperty("background");
  cells[currentVill].classList.remove("vill");
  

  if(hp.textContent < 10){
  hp.textContent =  +hp.textContent +1;}
  counterVampLife = 0;
  
}




function randomInt(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function eatVamp(currentVamp, currentVill) {
  if (currentVamp == currentVill && Vill == "true") {
    drawVill(currentVamp);
    dieVill(currentVill);
    Vill = "false";

  }
}


function gameLoop() {
  eatVamp(currentVamp, currentVill);

  if (Vill === "true") {
    clearVill(currentVill);
    let RAND = randomInt(1, 16);
  console.log(RAND);
    switch (RAND) {
      case 1: case 9: {
        try{
            cells[+currentVill + width].nodeType;
            currentVill = +currentVill + width -8;
            drawVill(currentVill);
        }catch(err){
            drawVill(currentVill);
        }
        
        break;
      }

      case 2: case 10: {
     


        try{
            cells[+currentVill - (width - 1)].nodeType;
            currentVill = +currentVill - (width -13);
            drawVill(currentVill);
        }catch(err){
            drawVill(currentVill);
        }
        break;
      }

      case 3: case 11: {
       
        try{
            cells[+currentVill + 1].nodeType;
            currentVill = +currentVill + 1;
            drawVill(currentVill);
        }catch(err){
            drawVill(currentVill);
        }
        break;
      }

      case 4: case 12: {
       
        try{
            cells[+currentVill + (width + 1)].nodeType;
            currentVill = +currentVill + (width -13);
            drawVill(currentVill);
        }catch(err){
            drawVill(currentVill);
        }
        break;
      }

      case 5: case 13: {
      
        try{
            cells[+currentVill + width].nodeType;
            currentVill = +currentVill + width-13;
            drawVill(currentVill);
        }catch(err){
            drawVill(currentVill);
        }
        break;
      }

      case 6: case 14: {
        
        try{
            cells[+currentVill + (width - 1)].nodeType;
            currentVill = +currentVill + (width -13);
            drawVill(currentVill);
        }catch(err){
            drawVill(currentVill);
        }
        break;
      }
      case 7: case 15: {
       
        try{
            cells[+currentVill - 1].nodeType;
            currentVill = +currentVill - 1;
            drawVill(currentVill);
        }catch(err){
            drawVill(currentVill);
        }
        break;
      }
      case 8: case 16: {
      
        try{
            cells[+currentVill - (width + 1)].nodeType;
            currentVill = +currentVill - (width -13);
            drawVill(currentVill);
        }catch(err){
            drawVill(currentVill);
        }
        break;
      }
    }
  }
  else if(Vill === "false"){
    
    counterSpawn++;

  }

  if(Vill === "false" && counterSpawn ==3){
    spawnVill();
    counterSpawn = 0;
  }
}



function movevamp(moveDirection) {
  console.log("Current  " + currentVamp);

  let position;
  if (moveDirection === "ArrowRight" && Vamp=="true") {
    direction = 1;
    position = currentVamp[0] + direction;
    try{
        cells[position].style;
        clearVamp(currentVamp);
        drawVamp(position);
       
       }catch(err){
       console.log(err);
       }
  }
  if (moveDirection === "ArrowLeft"  && Vamp=="true") {
    direction = -1;
    position = currentVamp[0] + direction;

    try{
        cells[position].style;
        clearVamp(currentVamp);
        drawVamp(position);
       
       }catch(err){
       console.log(err);
       }
  }
  if (moveDirection === "ArrowUp"  && Vamp=="true") {
    direction = -width+13;
    position = currentVamp[0] + direction;
   
    try{
        cells[position].style;
        clearVamp(currentVamp);
        drawVamp(position);
       
       }catch(err){
       console.log(err);
       }
  }
  if (moveDirection === "ArrowDown"  && Vamp=="true") {
    
    direction = width-13;
    console.log("csadwdwdawdawd" + direction);
    position = currentVamp[0] + direction;
    
try{
 cells[position].style;
 clearVamp(currentVamp);
 drawVamp(position);

}catch(err){
console.log(err);
}

  }
}

document.addEventListener("keydown", handleKeyMove);

function handleKeyMove(e) {
  if (!["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key))
    return;
  movevamp(e.key);
}

// interval = setInterval(gameLoop, intervalTime);
startBtn.addEventListener("click", startGame);
