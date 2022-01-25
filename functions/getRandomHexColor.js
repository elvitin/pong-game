import { getRandomArbitrary } from './getRandomArbitrary.js';


const hexSymbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
const randomHexColor = ['#'];


export function getRandomHexColor() {

  while (randomHexColor.length > 1)
    randomHexColor.pop();

  while (randomHexColor.length <= 6)
    randomHexColor.push(hexSymbols[getRandomArbitrary(0, 15)]);

  return randomHexColor.join('');
}