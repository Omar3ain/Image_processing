import express from 'express';
import imagesNames from '../utilties/names';
import path from 'path';
import sharp from 'sharp';

const router = express.Router();

router.get('/images', (req, res) => {
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
  else if (!req.query.hasOwnProperty('filename')) {
    return res
      .status(200)
      .send('Put the image name and width-height that you want!');
  }

  // checks if the name exists in the avaliable images :
  else if (name === false) {
    return res.status(404).send('there is no image with that name');
  }

  // checks for the numbers of width and height so that the app don't crash:
  else if (+width < 0 || +width > 2000 || +height < 0 || +height > 2000) {
    return res
      .status(400)
      .send(
        'please put vaild numbers for width and height between 0 and 2000!'
      );
  }

  // doing the resizing opratortion:
  else {
    sharp(imgLocation)
      .resize(parseInt(width), parseInt(height))
      .toFile(
        `public/thumbnails/${fileName} width-${width} height-${height}.jpg`
      )
      .then(() => {
        const imgLocationResized = path.resolve(
          './',
          `public/thumbnails/${fileName} width-${width} height-${height}.jpg`
        );
        return res.sendFile(imgLocationResized);
      });
  }
});

export default router;
