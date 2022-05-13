import  express  from "express";
import imagesNames from '../utilties/names'
import path from 'path';
import sharp from 'sharp';
import  fs  from 'fs';

const router = express.Router();

router.get('/images' ,(req , res) => {
    const fileName  = req.query.filename as string;
    const width = req.query.width as string;
    const height = req.query.height as string;
    const name = imagesNames.includes(fileName);
    const imgLocation = path.resolve('./' , `public/images/${fileName}.jpg`) 

    if(imagesNames === undefined){
       return res.status(400)
        .send('there is no image with that name');
    }
    else if(name === false){
        return res.status(404);
        res.send('there is no image with that name');
    }
    else{
         sharp(imgLocation)
        .resize(parseInt(width) , parseInt(height))
        .toFile(`public/thumbnails/${fileName} width-${width} height-${height}.jpg`)
        .then(() => {
            const imgLocation2 = path.resolve('./' , `public/thumbnails/${fileName} width-${width} height-${height}.jpg`)
        return res.sendFile(imgLocation2)
        })
    }

})

export default router