/* =========================
   AUDIO (wie Quiz & Memory)
========================= */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let soundEnabled = localStorage.getItem("soundEnabled") !== "false";

function playTone(freq, dur, type = "sine", vol = 0.2) {
    if (!soundEnabled) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = vol;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
}

function playCorrectSound() {
    playTone(880, 0.15);
    setTimeout(() => playTone(1320, 0.1), 120);
}

function playWrongSound() {
    playTone(220, 0.35, "square");
}

/* =========================
   FRAGEN
========================= */
const questions = [
    { text: "Der Mount Everest ist höher als 9000 Meter.", correct: false },
    { text: "Ein Oktopus hat drei Herzen.", correct: true },
    { text: "Die Sonne ist ein Planet.", correct: false },
    { text: "Blitze sind heißer als die Oberfläche der Sonne.", correct: true },
    { text: "Der Mensch hat mehr als 300 Knochen bei der Geburt.", correct: true },
    { text: "Gold ist schwerer als Eisen.", correct: true },
    { text: "Ein Jahr hat immer genau 365 Tage.", correct: false },
    { text: "Haie müssen ständig schwimmen, um nicht zu ersticken.", correct: true },
    { text: "Der Amazonas ist der längste Fluss der Welt.", correct: false },
    { text: "Licht ist schneller als Schall.", correct: true },

    { text: "Bananen sind Beeren.", correct: true },
    { text: "Der menschliche Körper hat mehr als 600 Muskeln.", correct: true },
    { text: "Der Eiffelturm ist im Sommer höher als im Winter.", correct: true },
    { text: "Wasser kocht auf dem Mount Everest bei über 100°C.", correct: false },
    { text: "Ein Blitz schlägt nie zweimal an derselben Stelle ein.", correct: false },
    { text: "Der menschliche Magen kann Plastik verdauen.", correct: false },
    { text: "Ein Schaltjahr hat 366 Tage.", correct: true },
    { text: "Der Mars ist größer als die Erde.", correct: false },
    { text: "Katzen können keinen süßen Geschmack wahrnehmen.", correct: true },
    { text: "Der Blutkreislauf des Menschen ist über 100.000 km lang.", correct: true },

    { text: "Ein Regenbogen hat sieben Farben.", correct: true },
    { text: "Pinguine leben nur auf der Südhalbkugel.", correct: true },
    { text: "Der Mensch nutzt nur 10 % seines Gehirns.", correct: false },
    { text: "Vulkane gibt es nur an Land.", correct: false },
    { text: "Der schnellste Vogel der Welt ist der Wanderfalke.", correct: true },
    { text: "Spinnen sind Insekten.", correct: false },
    { text: "Der Nil fließt von Süden nach Norden.", correct: true },
    { text: "Die Chinesische Mauer ist vom Mond aus sichtbar.", correct: false },
    { text: "Der menschliche Körper erneuert sich komplett alle 7 Jahre.", correct: false },
    { text: "Ein Tag auf der Venus ist länger als ein Jahr auf der Venus.", correct: true }
];


/* =========================
   VARIABLEN
========================= */
let streak = 0;
let currentQuestion = null;
let timer = 15;
let timerInterval = null;
let highscore =
parseInt(localStorage.getItem("tf_best_streak")) || 0;
let questionPool = [];
let questionIndex = 0;
let locked = false;



/* =========================
   DOM
========================= */
const qEl = document.getElementById("tfQuestion");
const streakEl = document.getElementById("tfStreak");
const timerEl = document.getElementById("tfTimer");
const feedbackEl = document.getElementById("tfFeedback");
const endEl = document.getElementById("tfEnd");
const resultEl = document.getElementById("tfResult");
const endTitleEl = document.getElementById("tfEndTitle");


/* =========================
   START
========================= */
startTF();

function startTF() {
    streak = 0;
    questionIndex = 0;
    locked = false;

    // Fragen mischen & kopieren
    questionPool = [...questions];
    shuffle(questionPool);

    endEl.style.display = "none";
    feedbackEl.innerText = "";
    streakEl.innerText = "Streak: 0";

    nextQuestion();
}


/* =========================
   NÄCHSTE FRAGE
========================= */
function nextQuestion() {
    clearInterval(timerInterval);
    locked = false;

    // Alle 30 geschafft → Sieg
    if (questionIndex >= questionPool.length) {
        winGame();
        return;
    }

    currentQuestion = questionPool[questionIndex];
    questionIndex++;

    qEl.innerText = currentQuestion.text;

    timer = 15;
    timerEl.innerText = `⏱️ ${timer}`;

    timerInterval = setInterval(() => {
        timer--;
        timerEl.innerText = `⏱️ ${timer}`;

        if (timer <= 0) {
            clearInterval(timerInterval);
            gameOver(false, true);
        }
    }, 1000);
}


/* =========================
   ANTWORT
========================= */
function answerTF(value) {
    if (locked) return;
    locked = true;
    clearInterval(timerInterval);

    if (value === currentQuestion.correct) {
        playCorrectSound();
        streak++;
        streakEl.innerText = `Streak: ${streak}`;
        feedbackEl.innerText = "✔️ Richtig!";
        setTimeout(nextQuestion, 600);
    } else {
        gameOver(value, false);
    }
}

/* =========================
   GAME OVER
========================= */
function gameOver(answer, timeout) {
    locked = true;
    clearInterval(timerInterval);
    playWrongSound();

    if (streak > highscore) {
        highscore = streak;
        localStorage.setItem("tf_best_streak", highscore);
    }

    qEl.innerText = "";
    feedbackEl.innerText =
        timeout ? "⏰ Zeit abgelaufen!" : "❌ Falsch!";

    resultEl.innerHTML = `
        Streak: <strong>${streak}</strong><br>
        🏆 Highscore: <strong>${highscore}</strong>
    `;

    endEl.style.display = "block";
}

function winGame() {
    locked = true;
    clearInterval(timerInterval);

    if (streak > highscore) {
        highscore = streak;
        localStorage.setItem("tf_best_streak", highscore);
    }

    qEl.innerText = "";
    feedbackEl.innerText = "🏆 Perfekt! Alle 30 geschafft!";

    resultEl.innerHTML = `
        🎉 <strong>Unfassbar!</strong><br>
        Streak: <strong>${streak} / 30</strong><br>
        🏆 Highscore: <strong>${highscore}</strong>
    `;

    endEl.style.display = "block";
}


function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

