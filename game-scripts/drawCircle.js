export function drawCircle(brushTool, x, y, radius, color) {

  brushTool.fillStyle = color;
  brushTool.beginPath();
  brushTool.arc(x, y, radius, 0, 7);
  brushTool.fill();
}