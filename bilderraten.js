// ==========================================
// Bilder
// ==========================================

const originalPictures = [
    {
        image: "images/auto.jpg",
        answers: ["auto", "car", "pkw"]
    },
    {
        image: "images/hund.jpg",
        answers: ["hund", "dog"]
    },
    {
        image: "images/katze.jpg",
        answers: ["katze", "cat"]
    },
    {
        image: "images/apfel.jpg",
        answers: ["apfel", "apple"]
    }
];

let pictures = [];


// ==========================================
// Einstellungen
// ==========================================

const GAME_TIME = 15;
const START_BLUR = 25;

// ==========================================
// Variablen
// ==========================================

let current = 0;
let score = 0;

let highscore = localStorage.getItem("bilderHighscore");

if (highscore === null) {
    highscore = 0;
} else {
    highscore = Number(highscore);
}

let timer = GAME_TIME;
let blur = START_BLUR;

let timerInterval;
let blurInterval;

let gameSummary = [];

// ==========================================
// Spiel starten
// ==========================================


// ==========================================
// Bild laden
// ==========================================
function shufflePictures() {

    // Kopie des Original-Arrays erstellen
    pictures = [...originalPictures];

    // Fisher-Yates Shuffle
    for (let i = pictures.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [pictures[i], pictures[j]] = [pictures[j], pictures[i]];
    }
}


function loadPicture() {

    clearInterval(timerInterval);
    clearInterval(blurInterval);

    timer = GAME_TIME;
    blur = START_BLUR;

    document.getElementById("pictureImage").src =
        pictures[current].image;

    document.getElementById("pictureProgress").innerHTML =
    `📷 Bild ${current + 1} / ${pictures.length}`;

    document.getElementById("pictureImage").style.filter =
        `blur(${blur}px)`;

    document.getElementById("pictureAnswer").value = "";

    document.getElementById("pictureTimer").innerHTML =
        `⏱️ ${timer}`;

    startTimer();
    startBlur();
}

// ==========================================
// Timer
// ==========================================

function startTimer() {

    timerInterval = setInterval(() => {

        timer--;

        document.getElementById("pictureTimer").innerHTML =
            `⏱️ ${timer}`;

        if (timer <= 0) {

            clearInterval(timerInterval);
            clearInterval(blurInterval);

            gameSummary.push(
                `Bild ${current + 1}: ⏰ Zeit abgelaufen`
            );

            nextPicture();
        }

    }, 1000);

}

// ==========================================
// Blur
// ==========================================

function startBlur() {

    blurInterval = setInterval(() => {

        blur -= 2;

        if (blur < 0)
            blur = 0;

        document.getElementById("pictureImage").style.filter =
            `blur(${blur}px)`;

    }, 1000);

}

// ==========================================
// Antwort prüfen
// ==========================================

function checkPicture() {

    clearInterval(timerInterval);
    clearInterval(blurInterval);

    const input =
        document.getElementById("pictureAnswer")
        .value
        .trim()
        .toLowerCase();

    if (pictures[current].answers.includes(input)) {

        let points = timer * 100;

        score += points;

        gameSummary.push(
            `Bild ${current + 1}: ✅ Richtig (+${points} Punkte)`
        );

        alert(`✅ Richtig!\n+${points} Punkte`);

    }
    else {

        gameSummary.push(
            `Bild ${current + 1}: ❌ Falsch`
        );

        alert(
            `❌ Falsch!\n\nRichtige Antworten:\n${pictures[current].answers.join(", ")}`
        );

    }

    nextPicture();

}

// ==========================================
// Nächstes Bild
// ==========================================

function nextPicture() {

    current++;

    if (current >= pictures.length) {

        let richtig = gameSummary.filter(e => e.includes("Richtig")).length;

        let message = "🏁 SPIEL BEENDET\n\n";

        message += "━━━━━━━━━━━━━━━━━━━━━━\n\n";

        gameSummary.forEach(entry => {

            message += entry + "\n";

        });

        message += "\n━━━━━━━━━━━━━━━━━━━━━━\n\n";

        message += `🏆 Gesamtpunkte: ${score}\n`;
        message += `✅ Richtige Bilder: ${richtig}/${pictures.length}\n`;
        message += `📷 Bilder insgesamt: ${pictures.length}\n`;

        let neuerHighscore = false;

        if (score > highscore) {

            highscore = score;

            localStorage.setItem("bilderHighscore", highscore);

            neuerHighscore = true;
        }

        message += `🥇 Highscore: ${highscore}\n`;

        if(neuerHighscore)
        {
            message += "\n🎉 NEUER HIGHSCORE!";
        }

        document.getElementById("endSummary").textContent = message;

        document.getElementById("endScreen").style.display = "flex";

        return;


    }
    loadPicture();

}


function restartGame()
{
    current = 0;
    score = 0;
    gameSummary = [];

    shufflePictures();

    document.getElementById("endScreen").style.display = "none";

    loadPicture();
}

function goHome()
{
    window.location.href = "index.html";
}

shufflePictures();
loadPicture();

// ==========================================
// Enter-Taste
// ==========================================

document.getElementById("pictureAnswer").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        checkPicture();
    }

});