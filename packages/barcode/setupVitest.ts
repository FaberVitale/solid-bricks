import '@testing-library/jest-dom';

const base64img =
  'data,image/jpeg;base64,:V2h5IGFyZSB5b3UgZGVjb2RpbmcgdGhpcyBtb2NrPwo=';

/* eslint-disable */
function canvasMock(canvasCtor: typeof window.HTMLCanvasElement) {
  (canvasCtor.prototype as any).getContext = function () {
    return {
      fillRect: function () {},
      clearRect: function () {},
      getImageData: function (x: any, y: any, w: any, h: any) {
        return {
          data: new Array(w * h * 4),
        };
      },
      putImageData: function () {},
      createImageData: function () {
        return [];
      },
      setTransform: function () {},
      drawImage: function () {},
      save: function () {},
      fillText: function () {},
      restore: function () {},
      beginPath: function () {},
      moveTo: function () {},
      lineTo: function () {},
      measureText: function () {},
      closePath: function () {},
      stroke: function () {},
      translate: function () {},
      scale: function () {},
      rotate: function () {},
      arc: function () {},
      fill: function () {},
      toDataURL: function () {
        return base64img;
      },
    };
  };

  (canvasCtor.prototype as any).toDataURL = function () {
    return base64img;
  };
}
/* eslint-enable */

canvasMock(window.HTMLCanvasElement);
