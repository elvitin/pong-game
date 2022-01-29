import { getRandomArbitrary } from '../functions/getRandomArbitrary.js';
import { getRandomHexColor } from '../functions/getRandomHexColor.js';
import { getCanvasLimit } from '../functions/getCanvasLimit.js';

import { drawCircle } from './drawCircle.js';
import { drawRacket } from './drawRacket.js';

function clear(){
  brushTool.fillStyle = "white";
  brushTool.fillRect(0, 0, canva.width, canva.height)
}
function render() { //responsavel por renderizar o layout
  clear()
  drawCircle(brushTool, xBallPos, yBallPos, ballRadius, 'red');
  drawRacket(
    brushTool,
    xRacketPos,
    yRacketPos,
    racketWidth,
    racketHeight,
    racketColor
  );
}

function moveBall() { //resposavel por movimentar a bola
  if (xBallPos > xBallMaxLimit || xBallPos < ballRadius) {
    xBallSteps = -xBallSteps;
  }
  if (yBallPos > yBallMaxLimit || yBallPos < ballRadius) {
    yBallSteps = -yBallSteps;
  }
  xBallPos += xBallSteps;
  yBallPos += yBallSteps;
}

function moveRacket() { //responsavel por movimentar a racket
  if (runRacketFlag) {
    console.log("movimentand")
    if (yRacketPos <= 10) {
      yRacketPos++;
    } else if (yRacketPos >= yRacketLimit) {
      yRacketPos--;
    } else yRacketPos += yRacketSteps;
  }
}

// function runBall() {
//   drawCircle(brushTool, xBallPos, yBallPos, ballRadius + 1, 'white');
//   if (xBallPos > xBallMaxLimit || xBallPos < ballRadius) {
//     xBallSteps = -xBallSteps;
//   }
//   if (yBallPos > yBallMaxLimit || yBallPos < ballRadius) {
//     yBallSteps = -yBallSteps;
//   }
//   xBallPos += xBallSteps;
//   yBallPos += yBallSteps;
//   drawCircle(brushTool, xBallPos, yBallPos, ballRadius, 'red'); // menor circulo
// }

// function runRacket() {
//   if (runRacketFlag) {
//     drawRacket(
//       brushTool,
//       xRacketPos,
//       yRacketPos,
//       racketWidth,
//       racketHeight,
//       'white'
//     );
//     if (yRacketPos <= 10) {
//       yRacketPos++;
//     } else if (yRacketPos >= yRacketLimit) {
//       yRacketPos--;
//     } else yRacketPos += yRacketSteps;
  
//     drawRacket(
//       brushTool,
//       xRacketPos,
//       yRacketPos,
//       racketWidth,
//       racketHeight,
//       racketColor
//     );
//   }

// }

document.onkeydown = (e) => {

  if (e.key == "ArrowUp" && runRacketFlag == false) { //tem como utilizar o nome da tecla precionada para executar uma ação

    if (yRacketSteps > 0) { //passada essa condição para dentro para não causar bug ao soltar a tecla
      yRacketSteps *= -1;
    }
    
    runRacketFlag = true;
    keyPress = e.key //Serve para verificar se a tecla que foi solta é igual a que está em movimento

  } 
  else if (e.key == "ArrowDown" && runRacketFlag == false) {

    if (yRacketSteps < 0) { //passada essa condição para dentro para não causar bug ao soltar a tecla
      yRacketSteps *= -1;
    }

    runRacketFlag = true;
    keyPress = e.key //Serve para verificar se a tecla que foi solta é igual a que está em movimento
  }

};

document.onkeyup = (e) => {

  if (e.key == keyPress) { //Não deixa desativar a tecla precionada e parar a Racket
    runRacketFlag = false;
    keyPress = null
  }
  
};

const canva = document.querySelector('canvas');
const brushTool = canva.getContext('2d');

const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;

const ballRadius = 15;
const xBallMaxLimit = canva.width - ballRadius;
const yBallMaxLimit = canva.height - ballRadius;

let xBallPos = canva.width / 2;
let yBallPos = canva.height / 2;
let xBallSteps = 2;
let yBallSteps = 1;

const racketColor = 'blue';
const racketWidth = 15;
const racketHeight = 60;
const xRacketPos = 10;    //fixa
const yRacketLimit = canva.height - racketHeight - 10;

let yRacketPos = canva.height / 2 - racketHeight / 2;
let runRacketFlag = false;
let keyPress = null //Serve para verificar se a tecla que foi solta é igual a que está em movimento
let yRacketSteps = 2;

// brushTool.fillStyle = 'white';
// brushTool.fillRect(0, 0, canva.width, canva.height);

// drawRacket(
//   brushTool,
//   xRacketPos,
//   yRacketPos,
//   racketWidth,
//   racketHeight,
//   racketColor
// );

// drawCircle(brushTool, xBallPos, yBallPos, ballRadius, 'red');

// const ballRunInterval = setInterval(runBall, 8);
// const racketRunInterval = setInterval(runRacket, 1);

const renderRunInterval = setInterval(render, 1)
const moveBallRunInterval = setInterval(moveBall, 8);
const moveRacketRunInterval = setInterval(moveRacket, 4);
