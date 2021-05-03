var soundcheck = true;
var musiccheck = true;
var msgcheck = true;
var stopTime = false;
var click = false;

function checkMusic() {
    if (musiccheck) {
        document.getElementById("soundtrack").play();

        document.getElementById("soundtrack").volume = 0.6;
        document.getElementById("soundtrack").loop = true;
    } else {
        document.getElementById("soundtrack").pause();
        document.getElementById("soundtrack").loop = false;
    }
}
checkMusic();


function play() {
    document.getElementById("canvas").style.display = "block";
    if (soundcheck == true) {
        document.getElementById("wavesound").play();
        document.getElementById("wavesound").loop = true;

        document.getElementById("wavesound").volume = 0.2;
    }
    musiccheck = false;
    checkMusic();

}

function guide() {
    document.getElementById("frame-menu").style.display = "none";
    document.getElementById("guide").style.display = "block";
}

function setting() {
    document.getElementById("frame-menu").style.display = "none";
    document.getElementById("setting").style.display = "block";

}

function exit() {
    window.close();
}

function back(id) {
    console.log(id.id);
    if (id.id == "back-guide") {
        document.getElementById("frame-menu").style.display = "block";
        document.getElementById("guide").style.display = "none";
    } else if (id.id == "back-setting") {
        document.getElementById("frame-menu").style.display = "block";
        document.getElementById("setting").style.display = "none";
    }
}

function music() {
    if (musiccheck) {
        musiccheck = false;
        document.getElementById("musicbtn").innerHTML = "Music: off";
        document.getElementById("musicbtn").style.background = "#aeaeae";
    } else {
        musiccheck = true;
        document.getElementById("musicbtn").innerHTML = "Music: on";
        document.getElementById("musicbtn").style.background = "#ff9800";

    }
    checkMusic();
}




function sound() {
    if (soundcheck) {
        soundcheck = false;
        document.getElementById("soundbtn").innerHTML = "Sound: off";
        document.getElementById("soundbtn").style.background = "#aeaeae";

    } else {
        soundcheck = true;
        document.getElementById("soundbtn").innerHTML = "Sound: on";
        document.getElementById("soundbtn").style.background = "#ff9800";


    }
}

function eatSound() {
    document.getElementById("coinsound").load();
    document.getElementById("coinsound").play();
    document.getElementById("coinsound").loop = false;
}

function boatSound() {
    document.getElementById("boatsound").play();
    document.getElementById("boatsound").loop = false;
}

function waveSound() {
    document.getElementById("wavesound").play();
}

function musicLevel(time) {

    if (soundcheck && msgcheck) {
        document.getElementById("soundtrack").play();
        document.getElementById("soundtrack").volume = 0.4;
        setTimeout(() => {
            document.getElementById("soundtrack").pause();

        }, time * 1000 + 1000);
    } else {
        document.getElementById("soundtrack").pause();
    }
}

// function message(msg, time) {
//     musicLevel(time);
//     var frame = document.getElementById("center-canvas");
//     var ms = document.getElementById("msg");
//     var ti = document.getElementById("time-count");
//     if (time == 0) {
//         frame.style.display = "none"
//     } else {
//         frame.style.display = "block";
//         ms.innerHTML = msg;
//         ti.innerHTML = time;
//         setTimeout(() => {
//             message(msg, time - 1);
//         }, 1000);
//     }

// }


function message(msg, time) {
    let frame = document.getElementById("center-canvas");
    let ms = document.getElementById("msg");
    let ti = document.getElementById("time-count");
    musicLevel(time);
    if (time > 0 && msgcheck) {
        frame.style.display = "block";
        ms.innerHTML = msg;
        ti.innerHTML = time;
        setTimeout(() => {
            message(msg, time - 1);
        }, 1000);
    } else {
        frame.style.display = "none";
        return;
    }


}

function countTime(time, el) {

}