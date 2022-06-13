let matrixScale = 4;

let indexMatrix2x2 = new Array(0, 2, 3, 1);

let indexMatrix4x4 = new Array(0, 8, 2, 10,
                               12, 4, 14, 6,
                               3, 11, 1, 9,
                               15, 7, 13, 5);

let indexMatrix8x8 = new Array(0, 32, 8, 40, 2, 34, 10, 42,
                               48, 16, 56, 24, 50, 18, 58, 26,
                               12, 44, 4, 36, 14, 46, 6, 38,
                               60, 28, 52, 20, 62, 30, 54, 22, 
                               3, 35, 11, 43, 1, 33, 9, 41, 
                               51, 19, 59, 27, 49, 17, 57, 25,
                               15, 47, 7, 39, 13, 45, 5,  37, 
                               63, 31, 55, 23, 61, 29, 53, 21);


function mod(x, y) {
  return (x - y*floor(x/y));
}
function indexValue(_x, _y) {
  let x = parseInt(mod(_x, matrixScale));
  let y = parseInt(mod(_y, matrixScale));
  let value = 0;
  if (matrixScale==2) {
    value = indexMatrix2x2[(x + y * matrixScale)] / 4.0;
  } else if (matrixScale==4) {
    value = indexMatrix4x4[(x + y * matrixScale)] / 16.0;
  }  
  else if (matrixScale==8) {
    value = indexMatrix8x8[(x + y * matrixScale)] / 64.0;
  }  
  return value;
}
function dither(_color, _x, _y) {
  let closestColor = (_color < 0.5) ? 0 : 1;
  let secondClosestColor = 1 - closestColor;
  let d = indexValue(_x, _y);
  let distance = abs(closestColor - _color);
  return (distance < d) ? closestColor : secondClosestColor;
}

