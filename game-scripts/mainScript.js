import { getRandomArbitrary } from '../functions/getRandomArbitrary.js';
import { getRandomHexColor } from '../functions/getRandomHexColor.js';
import { getCanvasLimit } from '../functions/getCanvasLimit.js';

import { drawCircle } from './drawCircle.js';
import { drawRacket } from './drawRacket.js';

function clear() {
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
    
    //Calculo posição Racket
    const posicaoX = xRacketPos + racketWidth + ballRadius
    const inicioY = yRacketPos
    const finalY = inicioY + 60
    // ------------------------------------------

    if (xBallPos == posicaoX && yBallPos >= inicioY && yBallPos <= finalY) {
        xBallSteps =- xBallSteps;
    }
    if (xBallPos > xBallMaxLimit || xBallPos < ballRadius) {
        xBallSteps =- xBallSteps;
    }
    if (yBallPos > yBallMaxLimit || yBallPos < ballRadius) {
        yBallSteps =- yBallSteps;
    }
    xBallPos += xBallSteps;
    yBallPos += yBallSteps;
}

function moveRacket() { //responsavel por movimentar a racket
    console.log("Movendo hackete")
    if (runRacketFlag) {
        if (yRacketPos <= 10) {
            yRacketPos++;
        } else if (yRacketPos >= yRacketLimit) {
            yRacketPos--;
        } else yRacketPos += yRacketSteps;
    }
}

document.onkeydown = (e) => {
    if (e.key == "ArrowUp" && runRacketFlag == false) { //tem como utilizar o nome da tecla precionada para executar uma ação
        moveRacketRunInterval = setInterval(moveRacket, 4);
        if (yRacketSteps > 0) { //passada essa condição para dentro para não causar bug ao soltar a tecla
            yRacketSteps *= -1;
        }
        runRacketFlag = true;
        keyPress = e.key //Serve para verificar se a tecla que foi solta é igual a que está em movimento
    } 
    else if (e.key == "ArrowDown" && runRacketFlag == false) {
        moveRacketRunInterval = setInterval(moveRacket, 4);
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
        clearInterval(moveRacketRunInterval)
    }
};

const canva = document.querySelector('canvas');
const brushTool = canva.getContext('2d');

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
const xRacketPos = 10; //fixa
const yRacketLimit = canva.height - racketHeight - 10;
let moveRacketRunInterval = false

let yRacketPos = canva.height / 2 - racketHeight / 2;
console.log(yRacketPos)
let runRacketFlag = false;
let keyPress = null //Serve para verificar se a tecla que foi solta é igual a que está em movimento
let yRacketSteps = 2;

const renderRunInterval = setInterval(render)
const moveBallRunInterval = setInterval(moveBall, 8);