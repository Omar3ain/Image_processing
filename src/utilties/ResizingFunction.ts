import sharp, { OutputInfo } from 'sharp';

const resize = (
  imgLocation: string,
  width: string,
  height: string,
  fileName: string
): Promise<OutputInfo> => {
  return sharp(imgLocation)
    .resize(parseInt(width), parseInt(height))
    .toFile(`thumbnails/${fileName} width-${width} height-${height}.jpg`);
};

export default resize;
