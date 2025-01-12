// getting html elements
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const btnAdd = document.getElementById("addBtn");
const btnReset = document.getElementById("resetBtn");

// listnenner for Add button
btnAdd.addEventListener("click", function () {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    data.bublles.push(
        {
            x: getRandomInt(31, canvas.width - 25),
            y: getRandomInt(31, canvas.height - 25),
            radius: getRandomInt(5, 25),
            xDelta: 2,
            yDelta: 2,
            fillColor: `rgb(${getRandomInt(255, 0)}, ${getRandomInt(255, 0)}, ${getRandomInt(255, 0)})`
        }
    );

});

// listenner for reseting
btnReset.addEventListener("click", function () {
    data.bublles = [];
})

// here is bubbles data
const data = {
    bublles: []
};

// update bubbles' info
function update() {

    data.bublles.forEach((bub) => {
        bub.x += bub.xDelta;
        bub.y += bub.yDelta;
    });

    data.bublles.forEach((bub) => {

        if (
            bub.x + bub.radius > canvas.width ||
            bub.x - bub.radius < 0
        ) {
            bub.xDelta *= -1;
        }
        if (
            bub.y + bub.radius > canvas.height ||
            bub.y - bub.radius < 0
        ) {
            bub.yDelta *= -1;
        }
    })
}

// drawing bubbles
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    data.bublles.forEach((bub) => {
        context.fillStyle = bub.fillColor;

        context.beginPath();
        context.arc(bub.x, bub.y, bub.radius, 0, Math.PI * 2);
        context.fill();
    })
}

// tf?
function loop() {
    requestAnimationFrame(loop);

    update()
    draw();

}

loop();
