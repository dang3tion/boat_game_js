class bullet {
    constructor() {
        this.x = 405;
        this.y = 250;
        this.dx = 0;
        this.speed = 4;
        this.dy = this.speed;
        this.width = 25;
        this.img = new Image();
        this.img.src = "/img/bullet.png";

    }
    reset(level) {
        this.x = 405;
        this.y = 300;
        this.dx = 0;
        this.dy = Math.abs(this.speed);
        if (!level) {
            this.speed = 4;
        }
    }
    update(canvas) {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x + this.width > canvas.width || this.x < 0) {
            this.dx *= -1;
        }
        if (this.y + this.width > canvas.height || this.y < 0) {
            this.dy *= -1;
        }
    }
    collision() {
        this.dy *= -1;
    }

    draw(frame) {
        frame.drawImage(this.img, this.x, this.y, this.width, this.width);
    }
}