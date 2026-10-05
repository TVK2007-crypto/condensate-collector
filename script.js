/* =====================================
   VARIABLES
===================================== */

let running = false;

let collected = 0;

let seconds = 0;

let timerInterval = null;

let steamInterval = null;

let dropletInterval = null;


/* Maximum collection capacity */

const MAX_CAPACITY = 200;


/* =====================================
   START ANIMATION
===================================== */

function startAnimation() {

    if (running) {

        return;

    }


    running = true;


    /* Change status */

    document.getElementById("status").innerText =
        "Collecting";


    /* Create steam */

    steamInterval = setInterval(
        createSteam,
        450
    );


    /* Create condensate droplets */

    dropletInterval = setInterval(
        createDroplet,
        2200
    );


    /* Timer */

    timerInterval = setInterval(
        function () {

            seconds++;

            document.getElementById(
                "timeElapsed"
            ).innerText = seconds;

        },
        1000
    );

}


/* =====================================
   CREATE STEAM
===================================== */

function createSteam() {

    const container =
        document.getElementById(
            "steamContainer"
        );


    const steam =
        document.createElement("div");


    steam.classList.add("steam");


    /*
       Random steam position
       above the water
    */

    const x =
        330 +
        Math.random() * 220;


    const y =
        320 +
        Math.random() * 40;


    steam.style.left =
        x + "px";


    steam.style.top =
        y + "px";


    container.appendChild(
        steam
    );


    /*
       Remove after animation
    */

    setTimeout(
        function () {

            steam.remove();

        },
        4000
    );

}


/* =====================================
   CREATE CONDENSATE DROPLET
===================================== */

function createDroplet() {

    /*
       Stop if cup is full
    */

    if (collected >= MAX_CAPACITY) {

        return;

    }


    const container =
        document.getElementById(
            "dropletContainer"
        );


    const droplet =
        document.createElement("div");


    droplet.classList.add(
        "droplet"
    );


    container.appendChild(
        droplet
    );


    /*
       Each droplet represents
       approximately 5 ml
    */

    collected += 5;


    if (collected >
        MAX_CAPACITY) {

        collected =
            MAX_CAPACITY;

    }


    updateDisplay();


    /*
       Remove visual droplet
       after it reaches cup
    */

    setTimeout(
        function () {

            droplet.remove();

        },
        2500
    );


    /*
       If cup becomes full
    */

    if (collected >=
        MAX_CAPACITY) {

        document.getElementById(
            "status"
        ).innerText =
            "Cup Full";

    }

}


/* =====================================
   UPDATE DISPLAY
===================================== */

function updateDisplay() {

    /*
       Update ml value
    */

    document.getElementById(
        "collectedAmount"
    ).innerText =
        collected;


    /*
       Convert collected water
       into percentage
    */

    let percentage =
        (collected /
        MAX_CAPACITY) * 100;


    if (percentage > 100) {

        percentage = 100;

    }


    /*
       Fill collection cup
    */

    document.getElementById(
        "cupWater"
    ).style.height =
        percentage + "%";

}


/* =====================================
   RESET EVERYTHING
===================================== */

function resetAnimation() {

    /*
       Stop animation
    */

    running = false;


    clearInterval(
        steamInterval
    );

    clearInterval(
        dropletInterval
    );

    clearInterval(
        timerInterval
    );


    /*
       Reset values
    */

    collected = 0;

    seconds = 0;


    /*
       Reset display
    */

    document.getElementById(
        "collectedAmount"
    ).innerText = "0";


    document.getElementById(
        "timeElapsed"
    ).innerText = "0";


    document.getElementById(
        "status"
    ).innerText = "Ready";


    /*
       Empty cup
    */

    document.getElementById(
        "cupWater"
    ).style.height = "0%";


    /*
       Remove steam
    */

    document.getElementById(
        "steamContainer"
    ).innerHTML = "";


    /*
       Remove droplets
    */

    document.getElementById(
        "dropletContainer"
    ).innerHTML = "";

}


/* =====================================
   EMPTY COLLECTION CUP
===================================== */

function emptyCup() {

    collected = 0;


    /*
       Update display
    */

    document.getElementById(
        "collectedAmount"
    ).innerText = "0";


    /*
       Empty cup visually
    */

    document.getElementById(
        "cupWater"
    ).style.height = "0%";


    /*
       Update status
    */

    if (running) {

        document.getElementById(
            "status"
        ).innerText =
            "Collecting";

    }

    else {

        document.getElementById(
            "status"
        ).innerText =
            "Ready";

    }

}


/* =====================================
   INITIAL STATE
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        document.getElementById(
            "collectedAmount"
        ).innerText = "0";


        document.getElementById(
            "timeElapsed"
        ).innerText = "0";


        document.getElementById(
            "status"
        ).innerText = "Ready";

    }
);
