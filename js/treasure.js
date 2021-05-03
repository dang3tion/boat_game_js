class treasure {
    constructor(x, y, level, label) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.img = new Image();
        this.value = level;
        this.label = label;
        if (this.value == 2) {
            this.img.src = "img/treasure.png";
        } else if (this.value == -1) {
            this.img.src = "img/banana.png";
        } else {
            this.img.src = "img/cloud.png";
        }


    }

    draw(frame) {
        frame.drawImage(this.img, this.x, this.y, this.width, this.width);
    }
    update(dx, dy) {
        // if (dx < 0) {
        //     if (this.x + this.width / 2 < 0) {
        //         this.x = canvas.width - this.width / 2;
        //     } else {
        //         this.x += dx;
        //     }

        // } else if (dx > 0) {
        //     if (this.x + this.width / 2 > canvas.width) {
        //         this.x = -this.width / 2;
        //     } else {
        //         this.x += dx;
        //     }
        // }
        this.x += dx;
        this.y += dy;




    }
}