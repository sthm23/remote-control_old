import robot from 'robotjs';

export function drawRectangle( x:number, y:number, comands:Array<number|string>):void{
  const width = +comands[1];
  const heigth = +comands[2];
  const s = (heigth+width)*2;

  for(let i=0; i<=s; i++){
    if(i>=heigth+1 && i<= width+heigth){
      //write right
      robot.dragMouse(x-heigth + i, y+heigth);
      robot.mouseClick();
    }else if(i>=width + heigth+1 && i<=width + 2*heigth){
      //write up
      robot.dragMouse(x+width, y-i+width + 2*heigth);
      robot.mouseClick();
    }else if(i>=width + 2*heigth+1 && i<=s){
      //write left
      robot.dragMouse(x - i+s, y);
      robot.mouseClick();
    }else{
      //write down
      robot.dragMouse(x, y + i);
      robot.mouseClick();
    }
  }
}