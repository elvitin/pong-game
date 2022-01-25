import { getRandomArbitrary } from '../functions/getRandomArbitrary.js';
import { getRandomHexColor } from '../functions/getRandomHexColor.js';
import { getCanvasLimit } from '../functions/getCanvasLimit.js';

import { drawCircle } from './drawCircle.js';
import { drawBase } from './drawBase.js';


function runBall() {

  drawCircle(brushTool, xBallPos, yBallPos, radiusClear, 'white');

  if (xBallPos > widthMaxLimit || xBallPos < radius) 
  {
    xBallSteps = -xBallSteps;
    // ballColor = getRandomHexColor();
  }

  if (yBallPos > heightMaxLimit || yBallPos < radius) 
  {
    yBallSteps = -yBallSteps;
    // ballColor = getRandomHexColor();
  }

  xBallPos += xBallSteps;
  yBallPos += yBallSteps;

  drawCircle(brushTool, xBallPos, yBallPos, radius, ballColor);
}



/*
const widthBase = 15;
const heightBase = 65;
const xPosBase = 10;

let yBasePos = 10;
let yBaseSteps = 1;
let baseColor = 'red';
let baseMoveInterval;
*/

function runBase() {
  drawBase(brushTool, xPosBase, yBasePos, widthBase, heightBase, 'white');

  if (yBasePos >= 10 && yBasePos < yBallMaxPos) 
  {
    yBasePos += yBaseSteps;
  }
  drawBase(brushTool, xPosBase, yBasePos, widthBase, heightBase, baseColor);
}

document.onkeydown = e => {

  baseMoveInterval = setInterval(runBase, 10);

  // Ivert signal logic is here.
  if (e.keyCode == upKey && yBaseSteps < 0) {
    yBaseSteps *= -1;
    // yBasePos--;
  }

  if (e.keyCode == downKey && yBaseSteps > 0) {
    yBaseSteps *= -1;
    // yBasePos++;
  }
}

document.onkeyup = e => {

  if (e.keyCode == upKey || e.keyCode == downKey)
    clearInterval(baseMoveInterval);
}

// Keys variables
const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;

// Canvas variables
const canva = document.querySelector('canvas');
const brushTool = canva.getContext('2d');


/////////////////////////// BALL VALUES
// Ball variables
const radius = 15;
const radiusClear = radius + 1;
const widthMaxLimit = canva.width - radius;
const heightMaxLimit = canva.height - radius;

let ballColor = 'blue';
let xBallSteps = 2;
let yBallSteps = 1;
let xBallPos = getRandomArbitrary(radius, canva.width - radius);
let yBallPos = getRandomArbitrary(radius, canva.height - radius);
/////////////////////////// BALL VALUES


/////////////////////////// CANVAS CONSTRUCTOR
brushTool.fillStyle = 'white';
brushTool.fillRect(0, 0, canva.width, canva.height);
/////////////////////////// CANVAS CONSTRUCTOR


/////////////////////////// BALL INITIAL POSITION
drawCircle(brushTool, xBallPos, yBallPos, radius, ballColor);
/////////////////////////// BALL INITIAL POSITION


/////////////////////////// RUN BALL
const interval = setInterval(runBall, 10);
/////////////////////////// RUN BALL



/////////////////////////// BASE VALUES
let yBasePos = 10;
let yBaseStartPos = 50;
let yBaseSteps = 1;
let baseColor = 'red';
let baseMoveInterval;

const widthBase = 15;
const heightBase = 65;
const xPosBase = 10;
const yBallMaxPos = canva.height - heightBase - yBasePos;
/////////////////////////// BASE VALUES

/////////////////////////// BASE INITIAL POSITION
drawBase(brushTool, xPosBase, yBaseStartPos, widthBase, heightBase, baseColor);
/////////////////////////// BASE INITIAL POSITION



