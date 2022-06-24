import robot from 'robotjs';

export function drawSquare(x:number, y:number, width:number):void{

  for(let i=0; i<=width*4; i++){
    if(i>=width+1 && i<=width*2){
      //write right
      robot.dragMouse(x + i-width, y+width);
      robot.mouseClick();
    }else if(i>=width*2+1 && i<=width*3){
      //write down
      robot.dragMouse(x+width, y-i+width*3);
      robot.mouseClick();
    }else if(i>=width*3+1 && i<=width*4){
      //write left
      robot.dragMouse(x - i+width*4, y);
      robot.mouseClick();
    }else{
      //write down
      robot.dragMouse(x, y + i);
      robot.mouseClick();
    }
  }
}