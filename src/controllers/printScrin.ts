import Jimp from 'jimp';
import robot from 'robotjs';

async function printScrin(x:number, y:number){
  const scrin = robot.screen.capture(x, y, 200, 200);
  const jimpImg = new Jimp({ data: scrin.image, width: scrin.width, height: scrin.height }, async (err:Error, image:Buffer) => {
    if(err)console.log(err);
      return image;
    });
    const img = await jimpImg.getBufferAsync('image/png');
    const base64Config = img.toString("base64");
    return base64Config;
}

export {printScrin}