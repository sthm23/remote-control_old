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
    // ws.send(comand[0]);
    if(comand === 'mouse_up'){
      ws.send(comand)
    }else if(comand === 'mouse_left'){
      ws.send(comand)
    }else if(comand === 'mouse_right'){
      ws.send(comand)
    }else if(comand === 'mouse_down'){
      ws.send(comand)
    }else if(comand === 'mouse_position'){
      ws.send(`${comand}`);
    }else if(comand === 'draw_circle'){
      ws.send(`${comand}`);
    }else if(comand === 'draw_rectangle'){
      ws.send(`${comand}`);
    }else if(comand === 'draw_square'){
      ws.send(`${comand}`);
    }else if(comand === 'prnt_scrn'){
      ws.send(`${comand}`);
    }
    
    
    
    console.log(comand, comandInfo);
  });

  ws.on('close', () => {
    console.log(`Client is closed`);
})
})
