/* =========================
   VARIABLEN & STATUS
========================= */
let state = "idle"; // idle | waiting | go | finished
let startTime = 0;
let timeoutId = null;
let bestTime = localStorage.getItem("reaction_best");
let reactionTimes = [];

/* =========================
   DOM ELEMENTE
========================= */
const box = document.getElementById("reactionBox");
const text = document.getElementById("reactionText");
const result = document.getElementById("reactionResult");
const restartBtn = document.getElementById("reactionRestart");

/* =========================
   EVENT
========================= */
box.addEventListener("click", handleClick);

/* =========================
   CLICK LOGIK
========================= */
function handleClick() {

    /* -------- START -------- */
    if (state === "idle") {
        state = "waiting";
        result.innerText = "";
        restartBtn.style.display = "none";

        text.innerText = "Bereit machen...";
        box.innerText = "Warten...";
        box.style.backgroundColor = "#f85149"; // rot
        box.style.cursor = "not-allowed";

        // zufällige Wartezeit (2–5 Sekunden)
        const waitTime = Math.random() * 3000 + 2000;

        timeoutId = setTimeout(() => {
            state = "go";
            startTime = performance.now();

            box.innerText = "GO!";
            box.style.backgroundColor = "#238636"; // grün
            box.style.cursor = "pointer";
            text.innerText = "JETZT klicken!";
        }, waitTime);

        return;
    }

    /* -------- FEHLKLICK -------- */
    if (state === "waiting") {
        clearTimeout(timeoutId);
        state = "finished";

        box.innerText = "❌ Zu früh!";
        box.style.backgroundColor = "#da3633";
        box.style.cursor = "default";

        text.innerText = "Das war zu früh 😅";

        if (bestTime) {
            result.innerHTML =
                `<span style="color:#8b949e;">
                   🏆 Bestzeit: ${bestTime} ms
                </span>`;
        }

        restartBtn.style.display = "inline-block";
        return;
    }

    /* -------- REAKTION -------- */
    if (state === "go") {
        state = "finished";

        const reactionTime = Math.round(
            performance.now() - startTime
        );

        reactionTimes.push(reactionTime);

        if (reactionTimes.length > 5) {
            reactionTimes.shift(); // nur letzte 5 behalten
        }

        const average =
            Math.round(
                reactionTimes.reduce((a, b) => a + b, 0) /
                reactionTimes.length
            );

        box.innerText = "✔️";
        box.style.backgroundColor = "#0a3cff";
        box.style.cursor = "default";

        let bestText = "";

        if (!bestTime || reactionTime < bestTime) {
            bestTime = reactionTime;
            localStorage.setItem("reaction_best", bestTime);
            bestText =
                " 🏆 <span style='color:#3fb950;'>Neue Bestzeit!</span>";
        }

        text.innerText = "Reaktionszeit:";
        result.innerHTML = `
            <strong>${reactionTime} ms</strong><br>

            <span style="color:#8b949e;">
                Ø (letzte ${reactionTimes.length}):
                ${average} ms
            </span><br>

            <span style="color:#8b949e;">
                Bestzeit: ${bestTime} ms
            </span>
            ${bestText}
        `;

        restartBtn.style.display = "inline-block";
        return;
    }
}

/* =========================
   RESET
========================= */
function resetGame() {
    state = "idle";
    clearTimeout(timeoutId);

    box.innerText = "Start";
    box.style.backgroundColor = "#30363d";
    box.style.cursor = "pointer";

    text.innerText = "Klicke auf Start, sobald du bereit bist.";
    result.innerText = "";

    restartBtn.style.display = "none";
}
