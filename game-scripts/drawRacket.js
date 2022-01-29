export function drawRacket(brushTool, x, y, w, h, color) {
  brushTool.fillStyle = color;
  brushTool.fillRect(x, y, w, h);
}