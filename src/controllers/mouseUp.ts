import robot from 'robotjs';

export function mouseUp(x:number, y:number, comand:number):void{
  robot.setMouseDelay(5);
  const newWay = y - comand;
  robot.moveMouse(x, newWay);
}