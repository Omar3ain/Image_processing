import express, { Response } from 'express';
import imagesNames from '../utilties/names';
import path from 'path';
import fs from 'fs';
import resize from '../utilties/ResizingFunction';

const router = express.Router();

router.get(
  '/images',
  (req: express.Request, res: express.Response): void | Response => {
    const fileName = req.query.filename as string;
    const width = req.query.width as string;
    const height = req.query.height as string;
    const name = imagesNames.includes(fileName);
    const imgLocation = path.resolve('./', `public/images/${fileName}.jpg`);

    // checks if the name exists:
    if (imagesNames === undefined) {
      return res.status(400).send('there is no image with that name');
    }

    // checks if the name exists in the request query:
    else if (!Object.prototype.hasOwnProperty.call(req.query, 'filename')) {
      return res
        .status(200)
        .send('Put the image name and width-height that you want!');
    }

    // checks if the name exists in the avaliable images :
    else if (name === false) {
      return res.status(404).send('there is no image with that name');
    }

    // checks for the numbers of width and height so that the app don't crash:
    else if (
      +width < 1 ||
      +width > 2000 ||
      +height < 1 ||
      +height > 2000 ||
      isNaN(+height) ||
      isNaN(+width)
    ) {
      return res
        .status(400)
        .send(
          'please put vaild numbers for width and height between 0 and 2000!'
        );
    }

    // doing the resizing opratortion:
    else {
      fs.stat('thumbnails', (err) => {
        if (!err) {
          console.log('folder exists');
        } else if (err.code === 'ENOENT') {
          fs.mkdir('thumbnails', (err) => {
            console.log(err);
          });
        }
      });
      // location of the image
      const imageExists = path.resolve(
        './',
        `thumbnails/${fileName} width-${width} height-${height}.jpg`
      );
      //checks if the image already exists if not create new one
      fs.stat(imageExists, (err) => {
        //if file exsits return the file
        if (!err) {
          const imgLocationResized = path.resolve(
            './',
            `thumbnails/${fileName} width-${width} height-${height}.jpg`
          );
          return res.sendFile(imgLocationResized);
          //if file does not exist make one and return it
        } else if (err.code === 'ENOENT') {
          resize(imgLocation, width, height, fileName).then(() => {
            const imgLocationResized = path.resolve(
              './',
              `thumbnails/${fileName} width-${width} height-${height}.jpg`
            );
            return res.sendFile(imgLocationResized);
          });
        }
      });
    }
  }
);

export default router;
