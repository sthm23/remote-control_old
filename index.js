import Jimp from 'jimp';
import {httpServer} from './src/http_server/index.js';
import robot from 'robotjs';
import { WebSocketServer } from 'ws';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({port:8080});

wss.on('connection', ws=>{

  ws.on('message', data=>{
    const comands = data.toString().split(' ');
    const comand = comands[0];
    const comandInfo = comands[1];
    const {x, y} = robot.getMousePos();

    if(comand === 'mouse_up'){
      ws.send(comand)
      robot.setMouseDelay(5);
      const newWay = y - comandInfo;
      robot.moveMouse(x, newWay);

    }else if(comand === 'mouse_left'){
      ws.send(comand)
      robot.setMouseDelay(5);
      const newWay = x - comandInfo;
      robot.moveMouse(newWay, y);

    }else if(comand === 'mouse_right'){
      ws.send(comand)
      robot.setMouseDelay(5);
      const newWay = x + +comandInfo;
      robot.moveMouse(newWay, y);

    }else if(comand === 'mouse_down'){
      ws.send(comand)
      robot.setMouseDelay(5);
      const newWay = y + +comandInfo;
      robot.moveMouse(x, newWay);

    }else if(comand === 'mouse_position'){

      ws.send(`${comand}_x:${x},y:${y}`);

    }else if(comand === 'draw_circle'){

      ws.send(`${comand}`);
      let mousePos = robot.getMousePos();
      const radius = comandInfo;

      for (let i = 0; i <= Math.PI * 2; i += 0.01) {
        const x = mousePos.x + (radius * Math.cos(i));
        const y = mousePos.y + (radius * Math.sin(i));
        robot.dragMouse(x-radius, y);
        robot.mouseClick();
      };

    }else if(comand === 'draw_rectangle'){
      ws.send(`${comand}`);
      const mousePos = robot.getMousePos();
      const width = +comands[1];
      const heigth = +comands[2];
      const s = (heigth+width)*2;

      for(let i=0; i<=s; i++){
        if(i>=heigth+1 && i<= width+heigth){
          //write right
          robot.dragMouse(mousePos.x-heigth + i, mousePos.y+heigth);
          robot.mouseClick();
        }else if(i>=width + heigth+1 && i<=width + 2*heigth){
          //write up
          robot.dragMouse(mousePos.x+width, mousePos.y-i+width + 2*heigth);
          robot.mouseClick();
        }else if(i>=width + 2*heigth+1 && i<=s){
          //write left
          robot.dragMouse(mousePos.x - i+s, mousePos.y);
          robot.mouseClick();
        }else{
          //write down
          robot.dragMouse(mousePos.x, mousePos.y + i);
          robot.mouseClick();
        }
      }
    }else if(comand === 'draw_square'){
      const mousePos = robot.getMousePos();
      const width = +comands[1];
      ws.send(`${comand}`);

      for(let i=0; i<=width*4; i++){
        if(i>=width+1 && i<=width*2){
          //write right
          robot.dragMouse(mousePos.x + i-width, mousePos.y+width);
          robot.mouseClick();
        }else if(i>=width*2+1 && i<=width*3){
          //write down
          robot.dragMouse(mousePos.x+width, mousePos.y-i+width*3);
          robot.mouseClick();
        }else if(i>=width*3+1 && i<=width*4){
          //write left
          robot.dragMouse(mousePos.x - i+width*4, mousePos.y);
          robot.mouseClick();
        }else{
          //write down
          robot.dragMouse(mousePos.x, mousePos.y + i);
          robot.mouseClick();
        }
      }

    }else if(comand === 'prnt_scrn'){
      // ws.send(`${comand}`);
      // const {x, y} = robot.getMousePos();
      // const scrin = robot.screen.capture([x], [y], [100], [100]);
      // const buff = new Buffer.from(JSON.stringify(scrin, null, 2));
      // const base64Config = buff.toString("base64");
      // // console.log(base64Config)
      // ws.send(base64Config)
      
    }     

  });

  ws.on('close', () => {
    console.log(`Client is closed`);
  });
});
