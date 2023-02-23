import robot from 'robotjs';

export function mouseLeft(x:number, y:number, comand:number):void{
  robot.setMouseDelay(5);
  const newWay = x - comand;
  robot.moveMouse(newWay, y);
}