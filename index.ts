import robot from 'robotjs';
import { WebSocketServer } from 'ws';
import {httpServer} from './src/http_server/index';
import {mouseUp} from './src/controllers/mouseUp';
import {mouseDown} from './src/controllers/mouseDown';
import {mouseLeft} from './src/controllers/mouseLeft';
import {mouseRight} from './src/controllers/mouseRight';
import {mousePosition} from './src/controllers/mousePosit';
import {drawCircle} from './src/controllers/drawCircle';
import {drawRectangle} from './src/controllers/drawRectan';
import {drawSquare} from './src/controllers/drawSquare';
import {printScrin} from './src/controllers/printScrin';

const HTTP_PORT:number = 3000;

httpServer.listen(HTTP_PORT, ()=>console.log(`Start static http server on the ${HTTP_PORT} port!`));

const wss = new WebSocketServer({port:8080});

wss.on('connection', ws=>{

  ws.on('message', async data=>{
    const comands:Array<string|number> = data.toString().split(' ');
    const comand = comands[0];
    const comandInfo:number = +comands[1];
    const {x, y} = robot.getMousePos();

    if(comand === 'mouse_up'){
      ws.send(comand+'\0')
      mouseUp(x, y, +comandInfo);

    }else if(comand === 'mouse_left'){
      ws.send(comand+'\0')
      mouseLeft(x, y, +comandInfo);

    }else if(comand === 'mouse_right'){
      ws.send(comand+'\0')
      mouseRight(x, y, +comandInfo);

    }else if(comand === 'mouse_down'){
      ws.send(comand+'\0')
      mouseDown(x, y, +comandInfo);

    }else if(comand === 'mouse_position'){
      const str = mousePosition(x, y);
      ws.send(str);

    }else if(comand === 'draw_circle'){
      drawCircle(+x, +y, +comandInfo);
      ws.send(`${comand}\0`);

    }else if(comand === 'draw_rectangle'){
      drawRectangle(x, y, comands);
      ws.send(`${comand}\0`);

    }else if(comand === 'draw_square'){
      drawSquare(x, y, +comandInfo);
      ws.send(`${comand}\0`);
      
    }else if(comand === 'prnt_scrn'){
      const img = await printScrin(x, y);
      ws.send(`prnt_scrn ${img}\0`);
      
    }
  });

  ws.on('close', () => {
    console.log(`Client is closed`);
  });
});
