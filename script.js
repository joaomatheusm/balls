const objects_num = document.getElementById('objects-num');
const amount_text = document.getElementById('amount-text');
const add_btn = document.getElementById('add-btn');
const remove_btn = document.getElementById('remove-btn');
const stage = document.getElementById('stage');


class Ball {
    constructor() {
        this.size = Math.floor(Math.random() * 20) + 15;

        this.colorR = Math.floor(Math.random() * 257);
        this.colorG = Math.floor(Math.random() * 257);
        this.colorB = Math.floor(Math.random() * 257);

        this.positionX = Math.floor(Math.random() * (stageWidth - this.size));
        this.positionY = Math.floor(Math.random() * (stageHeight - this.size));

        this.speedX = Math.floor(Math.random() * 2) + 0.4;
        this.speedY = Math.floor(Math.random() * 2) + 0.4;

        // Sorteia um valor positivo ou negativo para a direção da bola
        this.directionX = Math.floor(Math.random() * 10) > 5 ? 1 : -1;
        this.directionY = Math.floor(Math.random() * 10) > 5 ? 1 : -1;

        this.id = Date.now() + '-' + Math.floor(Math.random() * 10000000000000000);
        
        this.draw();
        
        this.element = document.getElementById(this.id);
        this.interval = setInterval(this.move.bind(this), 10);
        
        ballCount++;
        objects_num.innerHTML = ballCount;
    }

    draw() {
        const div = document.createElement('div');
        div.setAttribute('id', this.id);
        div.setAttribute('class', 'ball');

        div.setAttribute('style', `width: ${this.size}px; height: ${this.size}px; left: ${this.positionX}px; top: ${this.positionY}px; background-color: rgb(${this.colorR}, ${this.colorG}, ${this.colorB});`);

        stage.appendChild(div);

        div.addEventListener('click', (evt) => {
            evt.target.remove();
            ballCount--;
            objects_num.innerHTML = ballCount;
        });
    }

    borderControl() {
        if (this.positionX + this.size >= stageWidth) {
            this.directionX = -1;
        } else if (this.positionX <= 0) {
            this.directionX = 1;
        }

        if (this.positionY + this.size >= stageHeight) {
            this.directionY = -1;
        } else if (this.positionY <= 0) {
            this.directionY = 1;
        }

        if (this.positionX > stageWidth || this.positionY > stageHeight) {
            this.remove();
        }
    }

    move() {
        this.borderControl();
        
        this.positionX += this.speedX * this.directionX;
        this.positionY += this.speedY * this.directionY;

        this.element.setAttribute('style', `width: ${this.size}px; height: ${this.size}px; left: ${this.positionX}px; top: ${this.positionY}px; background-color: rgb(${this.colorR}, ${this.colorG}, ${this.colorB});`);
    }

    remove() {
        clearInterval(this.interval);
        balls = balls.filter(b => b.id !== this.id);
        this.element.remove();

        ballCount--;
        objects_num.innerHTML = ballCount;
    }
}

let stageWidth = stage.offsetWidth;
let stageHeight = stage.offsetHeight;
let balls = [];
let ballCount = 0;

window.addEventListener('resize', () => {
    stageWidth = stage.offsetWidth;
    stageHeight = stage.offsetHeight;
});

add_btn.addEventListener('click', () => {
    for (let i = 0; i < amount_text.value; i++) {
        balls.push(new Ball());
    }
});

remove_btn.addEventListener('click', () => {
    balls.forEach(b => b.remove());
});