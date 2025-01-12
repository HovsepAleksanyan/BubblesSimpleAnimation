// getting html elements
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const btnAdd = document.getElementById("addBtn");
const btnReset = document.getElementById("resetBtn");

// here is balls data
const data = {
    balls: []
};

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// listnenner for Add button
btnAdd.addEventListener("click", function () {
    const ball = new Ball();
    data.balls.push(ball);
});

function Ball() {
    // debugger
    this.radius = random(5, 25);
    this.x = random(this.radius, canvas.width - this.radius);
    this.y = random(this.radius, canvas.height - this.radius);
    this.xDelta = random(-6, 4);
    this.yDelta = random(-6, 4);
    this.color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;

    this.update = function () {
        this.x += this.xDelta;
        this.y += this.yDelta;

        if (
            this.x + this.radius > canvas.width ||
            this.x - this.radius < 0
        ) {
            this.xDelta *= -1;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.yDelta *= -1;
        }
    }

    this.draw = function () {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }
}

// listenner for reseting
btnReset.addEventListener("click", function () {
    data.balls = [];
})


// update ballls info
function update() {
    data.balls.forEach((b) => {
        b.update(b);
    });
}

// drawing balls
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    data.balls.forEach((ball) => {
        ball.draw();
    });
}

// tf?
function loop() {
    requestAnimationFrame(loop);

    update()
    draw();
}

loop();
