class module {
    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.frame = this.canvas.getContext("2d");
        this.boat = new boat();
        this.bullet = new bullet();
        this.col = true;
        this.colbox = true;
        this.tim1 = new Date().getTime();
        this.tim = new Date().getTime();
        this.treasures = [];
        this.level = 1;
        this.score = 0;
        this.play = false;
        this.timeout = null;
    }
    reset(level) {
        this.bullet.reset(level);
        this.boat.reset(level);
        if (!level) {
            this.score = 0;
            this.level = 1;
            this.initLevel_1();
        }
    }
    endgame() {
        if (this.bullet.y + this.bullet.width > this.boat.y + 30 + this.bullet.speed) {
            return true;
        } else {
            return false;
        }
    }

    stopGame() {
        this.play = false;
        msgcheck = false;
        this.clearCanvas();
        this.clearCanvas();
        if (this.level == 1) {
            this.reset(false);
        }
        this.reset(true);
    }
    run() {
        this.play = true;
        this.update();
    }
    update() {
        this.render();
        this.boat.update(this.canvas);
        this.bullet.update(this.canvas);
        this.collisionBoatRun();
        this.collisionBoxRun();
        this.levelRun();
        this.updateLevel();
        if (this.play) {
            setTimeout(() => {
                this.update();
            }, 10);
        }
    }
    updateScore() {
        this.score += 1;
        document.getElementById("score").innerHTML = this.score;
    }

    updateLevel() {
        if (this.treasures.length == 0) {
            this.bullet.speed += 1;
            this.boat.speed += 2;
            this.level++;
            this.stopGame();
            setTimeout(() => {
                document.getElementById("level").innerHTML = this.level;
                switch (this.level) {
                    case 2:
                        this.initLevel_2();
                        this.render();
                        break;
                    case 3:
                        this.initLevel_3();
                        this.render();
                        break;
                    case 4:
                        this.initLevel_4();
                        this.render();
                        break;
                    case 5:
                        this.initLevel_5();
                        this.render();
                        break;

                    default:
                        break;
                }
                msgcheck = true;
                if (this.level > 5) {
                    message("Congratulation! You're better playing, play again after", 10)
                    this.timeout = setTimeout(() => {
                        this.run();

                    }, 10500);
                } else if (this.level > 1) {
                    message("Next level!", 3)
                    stopTime = true;
                    this.timeout = setTimeout(() => {
                        this.run();
                        stopTime = false;
                    }, 3500);
                }
            }, 700);

        }
        if (this.endgame()) {

            this.stopGame();
            msgcheck = true;
            setTimeout(() => {
                message("Game over! You're not lucky, play again after", 10)
                this.timeout = setTimeout(() => {
                    this.initFirstGame();
                }, 10500);
            }, 700);

        }

    }

    initFirstGame() {
        document.getElementById("level").innerHTML = this.level;
        this.level = 1;
        this.stopGame();
        setTimeout(() => {
            this.reset(false);
            this.render();
            msgcheck = true;
            message("Ready", 3);
            stopTime = true;
            this.timeout = setTimeout(() => {
                this.run();
                stopTime = false;
            }, 3500);
        }, 500);
    }
    levelRun(level) {
        let leng = this.treasures.length;
        switch (this.level) {
            case 3:
                for (let i = 0; i < leng; i++) {
                    if (this.treasures[i].label % 2 == 0) {
                        if (this.treasures[i].x > this.canvas.width - this.treasures[i].width / 2) {
                            this.treasures[i].x = this.treasures[i].width / 2;
                        } else {
                            this.treasures[i].x += 1;
                        }
                    } else {
                        if (this.treasures[i].x + this.treasures[i].width < -this.treasures[i].width / 2) {
                            this.treasures[i].x = this.canvas.width - this.treasures[i].width / 2;
                        } else {
                            this.treasures[i].x -= 1;
                        }

                    }
                }
                break;
            case 4:
                let h = this.canvas.height / 10;
                let w = this.canvas.width / 14;
                for (let i = 0; i < leng; i++) {
                    let x = this.treasures[i].x;
                    let y = this.treasures[i].y;
                    if (y <= h) {
                        this.treasures[i].x += 1;
                    }
                    if (y >= 4 * h) {
                        this.treasures[i].x -= 1;

                    }
                    if (x >= 12 * w + (w - 40) / 2) {
                        this.treasures[i].y += 1;
                    }
                    if (x <= w + (w - 40) / 2) {
                        this.treasures[i].y -= 1;
                    }

                }
                break;
            case 5:
                for (let i = 0; i < leng; i++) {
                    if (this.treasures[i].label == 2) {
                        if (this.treasures[i].x > this.canvas.width - this.treasures[i].width / 2) {
                            this.treasures[i].x = this.treasures[i].width / 2;
                        } else {
                            this.treasures[i].x += 1;
                        }
                    } else if (this.treasures[i].label == 3) {
                        if (this.treasures[i].x + this.treasures[i].width < -this.treasures[i].width / 2) {
                            this.treasures[i].x = this.canvas.width - this.treasures[i].width / 2;
                        } else {
                            this.treasures[i].x -= 1;
                        }

                    }
                }
                break;
            default:
                break;
        }
    }
    clearTimeoutMo() {
        clearTimeout(this.timeout);
    }
    collisionBoatRun() {
        if (
            this.collisionBoat(
                this.boat.x,
                this.boat.y,
                this.boat.width,
                this.boat.height,
                this.bullet.x,
                this.bullet.y,
                this.bullet.width
            )
        ) {

            this.boat.y += 3;
            if (soundcheck) {
                boatSound();
            }
            setTimeout(() => {
                this.boat.y -= 3;
            }, 100);
            let colPoint =
                this.bullet.x +
                this.bullet.width / 2 -
                this.boat.x -
                this.boat.width / 2;
            let x = colPoint / (this.boat.width / 2);

            //x is the angle

            this.bullet.dx = Math.sin((x * Math.PI) / 4) * this.bullet.speed;
            // Y always positive
            this.bullet.dy = -Math.abs(
                Math.cos((x * Math.PI) / 4) * this.bullet.speed
            );
        }
    }
    collisionBoxRun() {
        for (let i = 0; i < this.treasures.length; i++) {
            let check = this.collisionBox(this.bullet.x, this.bullet.y, this.treasures[i]);
            if (check == 2) {
                this.bullet.dy *= -1;
            } else if (check == 1) {
                this.bullet.dx *= -1;
            }

            if (check != 0) {
                if (soundcheck) {
                    eatSound();

                }

                if (this.treasures[i].value == 2) {
                    this.treasures.splice(i, 1);
                    this.updateScore();

                } else if (this.treasures[i].value == -1) {
                    this.treasures.splice(i, 1);
                    this.bullet.width += 7;
                }
            }

        }

    }

    render() {
        this.frame.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.boat.draw(this.frame);
        this.bullet.draw(this.frame);
        for (let i = 0; i < this.treasures.length; i++) {
            this.treasures[i].draw(this.frame);
        }
    }
    clearCanvas() {
        this.frame.clearRect(0, 0, this.canvas.width, this.canvas.height);

    }

    collisionBoat(x, y, width, height, xb, yb, widthb) {
        if (this.col == false) {
            let tim2 = new Date().getTime();
            if (tim2 - this.tim1 > 500) {
                this.tim1 = new Date().getTime();
                this.col = true;
            }
        }
        if (
            xb + widthb / 2 > x &&
            xb + widthb / 2 < x + width &&
            yb + widthb > y + 20 &&
            this.col
        ) {
            this.col = false;
            return true;
        }
        return false;
    }
    initLevel_2() {
        this.treasures = [];
        let h = this.canvas.height / 10;
        let w = this.canvas.width / 10;
        this.bullet.speed += 1;
        let ran = Math.floor(Math.random() * 10 + 1);

        for (let i = 0; i < 10; i++) {
            if (i == ran) {

                this.treasures.push(new treasure(i * w + (w - 40) / 2, h, 2));
                this.treasures.push(new treasure(i * w + (w - 40) / 2, 2 * h, -1));
            } else {
                this.treasures.push(new treasure(i * w + (w - 40) / 2, h, 2));
                this.treasures.push(new treasure(i * w + (w - 40) / 2, 2 * h, 2));
            }


        }
    }
    initLevel_1() {
        this.treasures = [];
        let h = this.canvas.height / 2;
        let w = this.canvas.width / 2;
        for (let i = 1; i < 2; i++) {
            this.treasures.push(new treasure(this.canvas.width * i / 7 - 30, h / 4, 2));
            this.treasures.push(new treasure(this.canvas.width * i / 7 - 30, h / 2, 2));
        }

    }
    initLevel_3() {
        this.treasures = [];
        let h = this.canvas.height / 2;
        let ran = Math.floor(Math.random() * 6 + 1);
        for (let i = 1; i < 7; i++) {
            if (i == ran) {
                this.treasures.push(new treasure(this.canvas.width * i / 7 - 30, h / 4, 2, 1));
                this.treasures.push(new treasure(this.canvas.width * i / 7 - 30, h / 2, -1, 2));
            } else {
                this.treasures.push(new treasure(this.canvas.width * i / 7 - 30, h / 4, 2, 1));
                this.treasures.push(new treasure(this.canvas.width * i / 7 - 30, h / 2, 2, 2));
            }
        }

    }
    initLevel_4() {
        this.treasures = [];
        this.bullet.speed += 1;
        let h = this.canvas.height / 10;
        let w = this.canvas.width / 14;
        let ran = Math.floor(Math.random() * 9 + 1);

        for (let i = 1; i < 13; i++) {
            if (i == ran) {
                this.treasures.push(new treasure(i * w + (w - 40) / 2, h, -1));
                this.treasures.push(new treasure(i * w + (w - 40) / 2, 4 * h, 2));

            } else {
                this.treasures.push(new treasure(i * w + (w - 40) / 2, h, 2));
                this.treasures.push(new treasure(i * w + (w - 40) / 2, 4 * h, 2));

            }


        }
        for (let i = 2; i < 4; i++) {
            this.treasures.push(new treasure(12 * w + (w - 40) / 2, h * i, 2));
            this.treasures.push(new treasure(1 * w + (w - 40) / 2, i * h, 2));

        }
    }
    initLevel_5() {
        this.treasures = [];
        this.bullet.speed += 1;
        let h = this.canvas.height / 10;
        let w = this.canvas.width / 10;
        let ran = Math.floor(Math.random() * 9 + 1);

        for (let i = 1; i < 9; i++) {
            if (i == ran) {
                this.treasures.push(new treasure(i * w + (w - 40) / 2, h, -1, 2));
                this.treasures.push(new treasure(i * w + (w - 40) / 2, 4 * h, 2, 3));

            } else {
                this.treasures.push(new treasure(i * w + (w - 40) / 2, h, 2, 2));
                this.treasures.push(new treasure(i * w + (w - 40) / 2, 4 * h, 2, 3));
            }
        }
        for (let i = 1; i < 9; i++) {
            if (i % 2 == 0) {
                this.treasures.push(new treasure(i * w + (w - 40) / 2, 2 * h, 3, 1));
            } else {
                this.treasures.push(new treasure(i * w + (w - 40) / 2, 3 * h, 3, 1));

            }


        }
    }
    collisionBox(x, y, box) {
        if (this.colbox == false) {
            let tim2 = new Date().getTime();
            if (tim2 - this.tim > 500) {
                this.tim = new Date().getTime();
                this.colbox = true;
            }
        }
        if (y < box.y + box.width && y + this.bullet.width > box.y && x + this.bullet.width > box.x && x < box.x + box.width) {
            if ((x + this.bullet.width < box.x + this.bullet.speed + 1) || (x > box.x + box.width - this.bullet.speed + 1)) {
                //dx*-1
                return 1;
            } else {
                //dx*-2
                return 2;
            }
        } else {
            return 0;
        }


    }
}
var m = new module();

function play() {
    document.getElementById("canvas").style.display = "block";
    if (soundcheck == true) {
        document.getElementById("wavesound").play();
        document.getElementById("wavesound").loop = true;

        document.getElementById("wavesound").volume = 0.2;
    }
    musiccheck = false;
    checkMusic();
    m.initFirstGame();
}

function backframe() {
    document.getElementById("canvas").style.display = "none";
    m.clearTimeoutMo();
    m.stopGame();

}

function playagain() {
    if (!stopTime) {
        m.clearTimeoutMo();
        m.stopGame();
        setTimeout(() => {
            m.initFirstGame();
        }, 500);

    }
}