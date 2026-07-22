/* =========================
   AUDIO
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

function playFlipSound() {
    playTone(700, 0.05, "triangle", 0.15);
}

function playMatchSound() {
    playTone(880, 0.12);
    setTimeout(() => playTone(1320, 0.1), 120);
}

function playFailSound() {
    playTone(220, 0.25, "square", 0.2);
}

function toggleMemorySound() {
    soundEnabled = !soundEnabled;
    localStorage.setItem("soundEnabled", soundEnabled);

    document.getElementById("memorySoundToggle").innerText =
        soundEnabled ? "🔊" : "🔇";
}


/* =========================
   GRUNDVARIABLEN
========================= */
const allSymbols = [
    "🍎","🍌","🍇","🍓","🍍","🥝",
    "🍒","🍉","🍑","🥭","🍋","🍊"
];

let difficulty = "easy";
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matches = 0;
let startTime = null;
let timerInterval = null;

/* =========================
   DOM ELEMENTE
========================= */
const grid = document.getElementById("memoryGrid");
const info = document.getElementById("memoryInfo");
const result = document.getElementById("memoryResult");
const restartBtn = document.getElementById("memoryRestart");

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
   SPIEL STARTEN
========================= */
function startMemory(level) {
    difficulty = level;

    document.getElementById("memoryDifficulty").style.display = "none";

    initMemory();
}

/* =========================
   INIT
========================= */
function initMemory() {

    grid.style.display = "grid";
    grid.innerHTML = "";
    result.innerText = "";
    restartBtn.style.display = "none";
    document.getElementById("memoryChangeDifficulty").style.display = "none";

    firstCard = null;
    secondCard = null;
    lockBoard = false;
    moves = 0;
    matches = 0;

    clearInterval(timerInterval);
    startTime = Date.now();
    timerInterval = setInterval(updateInfo, 1000);

    let pairCount = 8;
    if (difficulty === "medium") pairCount = 10;
    if (difficulty === "hard") pairCount = 12;

    const usedSymbols = allSymbols.slice(0, pairCount);
    cards = [...usedSymbols, ...usedSymbols];
    shuffle(cards);

    if (difficulty === "easy") grid.style.gridTemplateColumns = "repeat(4, 1fr)";
    if (difficulty === "medium") grid.style.gridTemplateColumns = "repeat(5, 1fr)";
    if (difficulty === "hard") grid.style.gridTemplateColumns = "repeat(6, 1fr)";

    cards.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("memory-card");
        card.dataset.symbol = symbol;

        card.innerHTML = `
            <div class="memory-inner">
                <div class="memory-front">❓</div>
                <div class="memory-back">${symbol}</div>
            </div>
        `;

        card.addEventListener("click", () => flipCard(card));
        grid.appendChild(card);
    });

    updateInfo();

    const bestTime = localStorage.getItem("memory_best_time");

    document.getElementById("memoryBestTime").innerText =
        "🏆 Bestzeit: " + (bestTime ? bestTime + " Sekunden" : "-");
}

/* =========================
   INFO
========================= */
function updateInfo() {
    const time = Math.floor((Date.now() - startTime) / 1000);
    info.innerText = `Züge: ${moves} | Zeit: ${time}s`;
}

/* =========================
   KARTE KLICK
========================= */
function flipCard(card) {
    if (lockBoard) return;
    if (card === firstCard) return;
    if (card.classList.contains("matched")) return;

    card.classList.add("flipped");
    playFlipSound();

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    moves++;
    updateInfo();

    checkMatch();
}

/* =========================
   MATCH PRÜFEN
========================= */
function checkMatch() {
    const isMatch =
        firstCard.dataset.symbol === secondCard.dataset.symbol;

    if (isMatch) {
        playMatchSound();
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        firstCard = null;
        secondCard = null;
        matches++;

        if (matches === cards.length / 2) {
            endGame();
        }
    } else {
        lockBoard = true;
        playFailSound();
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            firstCard = null;
            secondCard = null;
            lockBoard = false;
        }, 900);
    }
}

/* =========================
   SPIEL ENDE
========================= */
function endGame() {
    clearInterval(timerInterval);
    const time = Math.floor((Date.now() - startTime) / 1000);

    // Bestzeit speichern
    let bestTime = parseInt(localStorage.getItem("memory_best_time")) || 0;

    if (bestTime === 0 || time < bestTime) {

        bestTime = time;

        localStorage.setItem("memory_best_time", bestTime);
    }

    document.getElementById("memoryBestTime").innerText =
        `🏆 Bestzeit: ${bestTime} Sekunden`;

    result.innerHTML = `
        🎉 <strong>Geschafft!</strong><br>
        Schwierigkeit: ${difficulty}<br>
        Züge: ${moves}<br>
        Zeit: ${time}s
    `;

    restartBtn.style.display = "inline-block";
    document.getElementById("memoryChangeDifficulty").style.display = "flex";
}

/* =========================
   RESET
========================= */
function restartMemory() {
    initMemory();
}

const soundBtn = document.getElementById("memorySoundToggle");
if (soundBtn) {
    soundBtn.innerText = soundEnabled ? "🔊" : "🔇";
}

