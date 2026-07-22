/* =========================
   KONFIG
========================= */
const QUESTIONS_PER_ROUND = 25;
const TIME_PER_QUESTION = 20;

/* =========================
   100 FRAGEN POOL
========================= */
const estimatePool = [

    { question: "Wie viele Einwohner hat Deutschland (in Millionen)?", answer: 83, tolerance: 20 },
    { question: "Wie viele Einwohner hat Frankreich (in Millionen)?", answer: 67, tolerance: 20 },
    { question: "Wie viele Einwohner hat die USA (in Millionen)?", answer: 331, tolerance: 100 },
    { question: "Wie viele Einwohner hat Japan (in Millionen)?", answer: 125, tolerance: 40 },
    { question: "Wie viele Einwohner hat Brasilien (in Millionen)?", answer: 214, tolerance: 80 },
    
    { question: "Wie hoch ist der Mount Everest (in Metern)?", answer: 8848, tolerance: 1500 },
    { question: "Wie hoch ist der Eiffelturm (in Metern)?", answer: 330, tolerance: 150 },
    { question: "Wie hoch ist der Burj Khalifa (in Metern)?", answer: 828, tolerance: 300 },
    { question: "Wie tief ist der Marianengraben (in Metern)?", answer: 11000, tolerance: 4000 },
    { question: "Wie lang ist der Nil (in km)?", answer: 6650, tolerance: 2000 },
    
    { question: "Wie viele Länder gibt es weltweit?", answer: 195, tolerance: 50 },
    { question: "Wie viele Bundesländer hat Deutschland?", answer: 16, tolerance: 5 },
    { question: "Wie viele Kontinente gibt es?", answer: 7, tolerance: 3 },
    { question: "Wie viele Ozeane gibt es?", answer: 5, tolerance: 2 },
    { question: "Wie viele Staaten hat die USA?", answer: 50, tolerance: 10 },
    
    { question: "Wie viele Knochen hat ein Erwachsener?", answer: 206, tolerance: 50 },
    { question: "Wie viele Zähne hat ein Erwachsener?", answer: 32, tolerance: 10 },
    { question: "Wie viele Liter Blut hat ein Mensch?", answer: 5, tolerance: 3 },
    { question: "Wie viele Chromosomen hat ein Mensch?", answer: 46, tolerance: 10 },
    { question: "Wie viele Muskeln hat der Mensch ungefähr?", answer: 650, tolerance: 300 },
    
    { question: "Wie viele Minuten hat ein Tag?", answer: 1440, tolerance: 500 },
    { question: "Wie viele Sekunden hat ein Tag?", answer: 86400, tolerance: 30000 },
    { question: "Wie viele Sekunden hat eine Stunde?", answer: 3600, tolerance: 1500 },
    { question: "Wie viele Wochen hat ein Jahr?", answer: 52, tolerance: 5 },
    { question: "Wie viele Tage hat ein normales Jahr?", answer: 365, tolerance: 5 },
    
    { question: "Wie viele Spieler stehen beim Fußball pro Team auf dem Feld?", answer: 11, tolerance: 4 },
    { question: "Wie viele Spieler stehen beim Basketball pro Team auf dem Feld?", answer: 5, tolerance: 2 },
    { question: "Wie viele Ringe hat die olympische Flagge?", answer: 5, tolerance: 2 },
    { question: "Wie viele Meter ist ein Marathon lang?", answer: 42195, tolerance: 15000 },
    { question: "Wie viele Minuten dauert ein Fußballspiel regulär?", answer: 90, tolerance: 20 },
    
    { question: "Wie viele Planeten hat unser Sonnensystem?", answer: 8, tolerance: 3 },
    { question: "Wie viele Monde hat die Erde?", answer: 1, tolerance: 1 },
    { question: "Wie viele Monde hat der Mars?", answer: 2, tolerance: 1 },
    { question: "Wie viele Planeten sind Gasriesen?", answer: 4, tolerance: 2 },
    { question: "Wie alt ist die Erde (in Milliarden Jahren)?", answer: 4.5, tolerance: 2 },
    
    { question: "Wie alt ist das Universum (in Milliarden Jahren)?", answer: 13.8, tolerance: 5 },
    { question: "Wie viele Buchstaben hat das deutsche Alphabet?", answer: 26, tolerance: 5 },
    { question: "Wie viele Monate haben 31 Tage?", answer: 7, tolerance: 3 },
    { question: "Wie viele Stunden hat eine Woche?", answer: 168, tolerance: 50 },
    { question: "Wie viele Meter hat ein Kilometer?", answer: 1000, tolerance: 200 },
    
    { question: "Wie viele Gramm hat ein Kilogramm?", answer: 1000, tolerance: 200 },
    { question: "Wie viele Millimeter hat ein Zentimeter?", answer: 10, tolerance: 3 },
    { question: "Wie viele Liter passen in einen Kubikmeter?", answer: 1000, tolerance: 300 },
    { question: "Wie viele Sekunden sind 10 Minuten?", answer: 600, tolerance: 200 },
    { question: "Wie viele Grad hat ein Vollkreis?", answer: 360, tolerance: 100 },
    
    { question: "Wie viele Grad hat ein rechter Winkel?", answer: 90, tolerance: 20 },
    { question: "Wie viele Meter ist ein 50m-Pool lang?", answer: 50, tolerance: 10 },
    { question: "Wie viele Meter ist ein Basketballkorb hoch?", answer: 3.05, tolerance: 1 },
    { question: "Wie viele Meter ist ein Fußballfeld lang (ungefähr)?", answer: 105, tolerance: 40 },
    { question: "Wie viele Beine hat eine Spinne?", answer: 8, tolerance: 2 },
    
    { question: "Wie viele Herzen hat ein Oktopus?", answer: 3, tolerance: 1 },
    { question: "Wie viele Kontinente liegen komplett südlich des Äquators?", answer: 1, tolerance: 1 },
    { question: "Wie viele Tage dauerte der Zweite Weltkrieg (in Jahren)?", answer: 6, tolerance: 3 },
    { question: "Wie viele Jahre ist ein Jahrhundert?", answer: 100, tolerance: 20 },
    { question: "Wie viele Jahre ist ein Jahrzehnt?", answer: 10, tolerance: 3 },
    
    { question: "Wie viele Einwohner hat die Erde (in Milliarden)?", answer: 8, tolerance: 3 },
    { question: "Wie viele Liter fasst ein typischer Autotank (ungefähr)?", answer: 50, tolerance: 25 },
    { question: "Wie viele Ziffern hat eine IBAN in Deutschland?", answer: 22, tolerance: 5 },
    { question: "Wie viele Tage dauerte die Titanic-Reise?", answer: 5, tolerance: 3 },
    { question: "Wie viele Sekunden hat eine Woche?", answer: 604800, tolerance: 200000 },
    
    { question: "Wie viele Tasten hat ein Klavier?", answer: 88, tolerance: 20 },
    { question: "Wie viele Planeten waren es früher im Sonnensystem?", answer: 9, tolerance: 2 },
    { question: "Wie viele Knochen hat ein Baby ungefähr?", answer: 300, tolerance: 100 },
    { question: "Wie viele Meter ist der Kölner Dom hoch?", answer: 157, tolerance: 50 },
    { question: "Wie viele Einwohner hat Berlin (in Millionen)?", answer: 3.7, tolerance: 2 },
    
    { question: "Wie viele Einwohner hat München (in Millionen)?", answer: 1.5, tolerance: 1 },
    { question: "Wie viele Liter Milch gibt eine Kuh pro Tag (ungefähr)?", answer: 25, tolerance: 15 },
    { question: "Wie viele Meter ist die Freiheitsstatue hoch?", answer: 93, tolerance: 40 },
    { question: "Wie viele Meter ist der Rhein lang (in km)?", answer: 1230, tolerance: 500 },
    { question: "Wie viele Sekunden dauert ein Boxkampf-Runde?", answer: 180, tolerance: 60 },
    
    { question: "Wie viele Stunden schläft ein Mensch durchschnittlich?", answer: 8, tolerance: 4 },
    { question: "Wie viele Liter Wasser sollte man täglich trinken (ungefähr)?", answer: 2, tolerance: 1 },
    { question: "Wie viele Planeten sind kleiner als die Erde?", answer: 4, tolerance: 2 },
    { question: "Wie viele Einwohner hat Spanien (in Millionen)?", answer: 47, tolerance: 20 },
    { question: "Wie viele Einwohner hat Italien (in Millionen)?", answer: 60, tolerance: 25 },
    
    { question: "Wie viele Minuten hat eine Stunde?", answer: 60, tolerance: 15 },
    { question: "Wie viele Sekunden hat eine Minute?", answer: 60, tolerance: 15 },
    { question: "Wie viele Meter ist ein 100-Meter-Lauf?", answer: 100, tolerance: 20 },
    { question: "Wie viele Meter ist der Bodensee lang (in km)?", answer: 63, tolerance: 30 },
    { question: "Wie viele Inseln hat Griechenland ungefähr?", answer: 6000, tolerance: 3000 },
    
    { question: "Wie viele Einwohner hat Kanada (in Millionen)?", answer: 38, tolerance: 20 },
    { question: "Wie viele Einwohner hat Australien (in Millionen)?", answer: 26, tolerance: 15 },
    { question: "Wie viele Meter ist ein Tennisnetz hoch?", answer: 1, tolerance: 1 },
    { question: "Wie viele Meter ist der Empire State Building hoch?", answer: 381, tolerance: 150 },
    { question: "Wie viele Farben hat ein Regenbogen?", answer: 7, tolerance: 3 },
    
    { question: "Wie viele Sekunden hat ein Jahr ungefähr?", answer: 31536000, tolerance: 10000000 },
    { question: "Wie viele Liter fasst ein durchschnittlicher Badewanne?", answer: 150, tolerance: 100 },
    { question: "Wie viele km/h fährt ein ICE maximal?", answer: 300, tolerance: 100 },
    { question: "Wie viele km/h beträgt die Lichtgeschwindigkeit (in km/s)?", answer: 300000, tolerance: 100000 },
    { question: "Wie viele Zähne hat ein Hai ungefähr?", answer: 300, tolerance: 200 }
    
    ];
    

/* =========================
   VARIABLEN
========================= */
let current = 0;
let score = 0;
let roundQuestions = [];
let timer = TIME_PER_QUESTION;
let timerInterval = null;
let answered = false;
let highscore = localStorage.getItem("estimate_highscore") || 0;

/* =========================
   DOM
========================= */
const qEl = document.getElementById("estimateQuestion");
const inputEl = document.getElementById("estimateInput");
const feedbackEl = document.getElementById("estimateFeedback");
const progressEl = document.getElementById("estimateProgress");
const nextBtn = document.getElementById("estimateNext");
const area = document.getElementById("estimateArea");
const end = document.getElementById("estimateEnd");
const scoreEl = document.getElementById("estimateScore");
const timerEl = document.getElementById("estimateTimer");
const progressBarEl = document.getElementById("estimateProgressBar");

/* =========================
   SHUFFLE
========================= */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/* =========================
   EFFEKTE
========================= */
function triggerShake() {
    document.body.classList.add("shake");
    setTimeout(() => {
        document.body.classList.remove("shake");
    }, 350);
}

function triggerRedFlash() {
    document.body.classList.add("flash-red");
    setTimeout(() => {
        document.body.classList.remove("flash-red");
    }, 300);
}

/* =========================
   START RUNDE
========================= */
function startEstimateRound() {
    shuffle(estimatePool);
    roundQuestions = estimatePool.slice(0, QUESTIONS_PER_ROUND);

    current = 0;
    score = 0;

    end.style.display = "none";
    area.style.display = "block";

    loadEstimate();
    progressBarEl.style.width = "0%";
}

startEstimateRound();

/* =========================
   FRAGE LADEN
========================= */
function loadEstimate() {
    const q = roundQuestions[current];

    progressEl.textContent =
    `Frage ${current + 1} / ${roundQuestions.length}`;

    const progressPercent =
        ((current) / roundQuestions.length) * 100;

    progressBarEl.style.width = progressPercent + "%";

    qEl.textContent = q.question;
    inputEl.value = "";
    inputEl.disabled = false;
    feedbackEl.innerHTML = "";
    nextBtn.style.display = "none";

    startTimer();
}

/* =========================
   TIMER
========================= */
function startTimer() {
    clearInterval(timerInterval);

    timer = TIME_PER_QUESTION;
    answered = false;

    timerEl.classList.remove("timer-warning");
    timerEl.textContent = "⏱️ " + timer;

    timerInterval = setInterval(() => {

        timer--;

        // Wenn unter 0 → abbrechen (Sicherheitscheck)
        if (timer < 0) return;

        timerEl.textContent = "⏱️ " + timer;

        // Warnung bei 5 Sekunden
        if (timer <= 5 && timer > 0) {
            timerEl.classList.add("timer-warning");
        }

        // Exakt bei 0 stoppen
        if (timer === 0) {
            clearInterval(timerInterval);

            timerEl.classList.remove("timer-warning");

            triggerShake();
            triggerRedFlash();

            timeUp();
        }

    }, 1000);
}


function timeUp() {
    if (answered) return;

    answered = true;
    inputEl.disabled = true;

    const q = roundQuestions[current];

    feedbackEl.innerHTML = `
        ⏰ Zeit abgelaufen!<br><br>
        Richtige Lösung: <strong>${q.answer}</strong><br>
        ⭐ Punkte: <strong>0</strong>
    `;

    nextBtn.style.display = "inline-block";
}

/* =========================
   ABSCHICKEN
========================= */
function submitEstimate() {
    if (answered) return;

    const value = parseFloat(inputEl.value);
    if (isNaN(value)) return;

    answered = true;
    clearInterval(timerInterval);

    const q = roundQuestions[current];
    const diff = Math.abs(q.answer - value);

    const points = Math.round(
        Math.max(0, 100 - (diff / q.tolerance) * 100)
    );

    score += points;

    feedbackEl.innerHTML = `
        Richtige Lösung: <strong>${q.answer}</strong><br>
        Deine Schätzung: <strong>${value}</strong><br>
        Abweichung: <strong>${diff}</strong><br><br>
        ⭐ Punkte: <strong>${points}</strong>
    `;

    inputEl.disabled = true;
    nextBtn.style.display = "inline-block";
}

/* =========================
   WEITER
========================= */
function nextEstimate() {
    current++;

    if (current >= roundQuestions.length) {
        endGame();
    } else {
        loadEstimate();
    }
}

/* =========================
   ENDE
========================= */
function endGame() {
    area.style.display = "none";
    end.style.display = "block";

    if (score > highscore) {
        highscore = score;
        localStorage.setItem("estimate_highscore", highscore);
    }

    scoreEl.innerHTML = `
        Gesamtpunktzahl:<br>
        <strong>${score}</strong><br><br>
        🏆 Highscore:<br>
        <strong>${highscore}</strong>
    `;
}

/* =========================
   RESET
========================= */
function restartEstimate() {
    startEstimateRound();
}



