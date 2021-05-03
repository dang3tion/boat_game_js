class boat {
    constructor() {
        this.x = 325;
        this.y = 450;
        this.width = 200;
        this.height = 70;
        this.speed = 5;
        this.boatImg = new Image();
        this.boatImg.src = "/img/boat2.png";
        this.sailImg = new Image();
        this.sailImg.src = "/img/sail.png"
        this.tim1 = new Date().getTime();
        this.click = true;
        this.left = false;
        this.right = false;
    }
    updatex(x) {
        this.x = x;
    }
    reset(level) {
        this.x = 325;
        this.y = 450;
        this.width = 200;
        this.height = 70;
        if (!level) {
            this.speed = 5;
        }
    }
    update(canvas) {

        window.addEventListener(
            "keydown",
            function(e) {
                // space and arrow keys
                if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                    e.preventDefault();
                }
            },
            false
        );

        document.addEventListener("keydown", e => {
            switch (e.keyCode) {
                case 37:
                    this.left = true;
                    this.right = false;
                    break;

                case 39:
                    this.left = false;
                    this.right = true;
                    break;
            }
        });
        document.addEventListener("keyup", e => {
            switch (e.keyCode) {
                case 37:
                    this.left = false;
                    this.right = false;
                    break;

                case 39:
                    this.left = false;
                    this.right = false;
                    break;
            }
        });

        if (this.left && this.x + this.speed > 0) {
            this.x -= this.speed;
        } else if (this.right && this.x + this.width - this.speed < canvas.width) {
            this.x += this.speed;
        }
    }

    draw(frame) {
        frame.drawImage(this.boatImg, this.x, this.y, this.width, this.height);
        frame.drawImage(this.sailImg, this.x + 50, this.y - 140, 100, 150);

    }
}