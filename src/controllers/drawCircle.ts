import robot from 'robotjs';

export function drawCircle(x:number, y:number, radius:number):void{
  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    const newX = x + (radius * Math.cos(i));
    const newY = y + (radius * Math.sin(i));
    robot.dragMouse(newX-radius, newY);
    robot.mouseClick();
  };
}