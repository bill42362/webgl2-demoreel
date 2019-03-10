// getMediaBlob.js
'use strict';
import EXIF from 'exif-js';

const loadImage = file =>
  new Promise((resolve, reject) => {
    const image = new Image();

    const handleEnd = () => {
      URL.revokeObjectURL(image.src);
      image.removeEventListener('error', handleError);
      image.removeEventListener('load', handleLoad);
    };
    const handleError = () => {
      reject(new Error('The image loading fail'));

      handleEnd();
    };

    const handleLoad = () => {
      resolve(image);
      handleEnd();
    };

    image.addEventListener('error', handleError);
    image.addEventListener('load', handleLoad);

    image.src = URL.createObjectURL(file);
  });

const loadExif = file =>
  new Promise(resolve => {
    EXIF.getData(file, function() {
      resolve(this);
    });
  });

const getMediaBlob = async file => {
  const exif = await loadExif(file);
  const image = await loadImage(file);
  const { naturalWidth, naturalHeight } = image;
  const width = naturalWidth;
  const height = naturalHeight;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const toBlob = (type = 'image/jpeg', quality = 0.95) =>
    new Promise(resolve => canvas.toBlob(resolve, type, quality));

  const transformCtx = orientation => {
    // Ref. https://stackoverflow.com/a/30242954
    switch (orientation) {
      case 2:
        // horizontal flip
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
        break;
      case 3:
        // 180° rotate left
        ctx.translate(width, height);
        ctx.rotate(Math.PI);
        break;
      case 4:
        // vertical flip
        ctx.translate(0, height);
        ctx.scale(1, -1);
        break;
      case 5:
        // vertical flip + 90 rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.scale(1, -1);
        break;
      case 6:
        // 90° rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.translate(0, -height);
        break;
      case 7:
        // horizontal flip + 90 rotate right
        ctx.rotate(0.5 * Math.PI);
        ctx.translate(width, -height);
        ctx.scale(-1, 1);
        break;
      case 8:
        // 90° rotate left
        ctx.rotate(-0.5 * Math.PI);
        ctx.translate(-width, 0);
        break;
    }
  };

  const orientation = EXIF.getTag(exif, 'Orientation');
  if ([5, 6, 7, 8].includes(orientation)) {
    canvas.width = height;
    canvas.height = width;
  } else {
    canvas.width = width;
    canvas.height = height;
  }

  transformCtx(orientation);
  ctx.drawImage(image, 0, 0, width, height);

  return toBlob('image/jpeg', 1);
};

export default getMediaBlob;
