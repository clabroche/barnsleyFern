
const canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function next(x, y) {
    const random = Math.random();
    console.log(random)
    if (random < 0.01){
        return {
            x: 0,
            y: 0.16 * y
        }
    }
    else if (random < 0.86) {
        return {
            x: 0.85 * x + 0.04 * y,
            y: -0.04 * x + 0.85 * y + 1.6
        }
    }
    else if (random < 0.93) {
        return {
            x: 0.2 * x + 0.26 * y,
            y: 0.23 * x + 0.22 * y + 1.6
        }
    }
    else {
        return {
            x: -0.15 * x + 0.28 * y,
            y: -0.26 * x + 0.24 * y + 0.44
        }
    }
}
const transformation = {
}
function draw(point) {
    console.log(point)
}
let interval;
let currentXY = {
    x:0,y:0
}
function loop() {
    interval = setInterval(_=>{
        currentXY = next(currentXY.x,currentXY.y);
        draw(currentXY);

    })
}
loop()
