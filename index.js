
const canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
const nbIteration = document.getElementById('nbIteration');
nbIteration.value = 100000;
let scaleFactor = document.documentElement.clientHeight / 10;

const Fern = function () {
  this.currentXY = {x: 0, y: 0};
  this.allPoint = [];
};
Fern.prototype.next = function () {
  const random = Math.random() * 100;
  let nextXY = {};
  if (random < 1) {
    nextXY.x = 0;
    nextXY.y = 0.16 * this.currentXY.y;
  } else if (random < 86) {
    nextXY.x = 0.85 * this.currentXY.x + 0.04 * this.currentXY.y;
    nextXY.y = -0.04 * this.currentXY.x + 0.85 * this.currentXY.y + 1.6;
  } else if (random < 94) {
    nextXY.x = 0.2 * this.currentXY.x - 0.26 * this.currentXY.y;
    nextXY.y = 0.23 * this.currentXY.x + 0.22 * this.currentXY.y + 1.6;
  } else {
    nextXY.x = -0.15 * this.currentXY.x + 0.28 * this.currentXY.y;
    nextXY.y = 0.26 * this.currentXY.x + 0.24 * this.currentXY.y + 0.44;
  }
  this.currentXY = nextXY;
  this.allPoint.push(this.currentXY);
};
Fern.prototype.reinitCanvas = function () {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
  ctx.translate(ctx.canvas.width / 2, ctx.canvas.height);
  ctx.rotate(180 * Math.PI / 180);
};
Fern.prototype.draw = function () {
  this.reinitCanvas();
  // Draw
  for (let i = 0; i < this.allPoint.length; i++) {
    ctx.fillStyle = `rgb(
      ${255 - Math.floor(this.allPoint[i].y * 170 / 9.9983)},
      ${Math.floor(this.allPoint[i].y * 100 / 9.9983)},
      ${Math.floor(this.allPoint[i].y * 255 / 9.9983)}
    )`;
    ctx.fillRect(this.allPoint[i].x * scaleFactor, this.allPoint[i].y * scaleFactor, 1, 1);
  }
};

Fern.prototype.calculation = function (nbIteration) {
  this.allPoint = [];
  for (let i = 0; i < nbIteration; i++) {
    this.next();
  }
};

const fern = new Fern();
fern.calculation(100000);
fern.draw();

window.addEventListener('resize', debounce(function (ev) {
  scaleFactor = document.documentElement.clientHeight / 10;
  fern.draw();
}, 50));

nbIteration.addEventListener('change', ({target}) => {
  if (target.value > 1000000) return;
  fern.calculation(target.value);
  fern.draw();
});

function debounce (func, wait, immediate) {
  var timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
