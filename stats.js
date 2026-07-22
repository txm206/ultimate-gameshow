/* ===============================
   STATISTIKEN SYSTEM
================================= */

/* -------- Rang Berechnung -------- */

/*function calculateTotalPoints() {

    const leicht = parseInt(localStorage.getItem("quiz_highscore_leicht")) || 0;
    const mittel = parseInt(localStorage.getItem("quiz_highscore_mittel")) || 0;
    const schwer = parseInt(localStorage.getItem("quiz_highscore_schwer")) || 0;
    const ultra = parseInt(localStorage.getItem("quiz_highscore_ultra")) || 0;

    const estimate = parseInt(localStorage.getItem("estimate_highscore")) || 0;
    const tf = parseInt(localStorage.getItem("tf_best_streak")) || 0;
    const picture = parseInt(localStorage.getItem("bilderHighscore")) || 0;

    const reaction = parseInt(localStorage.getItem("reaction_best")) || 999;
    const memory = parseInt(localStorage.getItem("memory_best_time")) || 999;

    let reactionBonus = 0;
    let memoryBonus = 0;

    // Reaktionsbonus
    if (reaction <= 200) reactionBonus = 5000;
    else if (reaction <= 250) reactionBonus = 4000;
    else if (reaction <= 300) reactionBonus = 3000;
    else if (reaction <= 350) reactionBonus = 2000;
    else if (reaction <= 400) reactionBonus = 1000;
    else reactionBonus = 0;

    // Memorybonus
    if (memory <= 25) memoryBonus = 5000;
    else if (memory <= 35) memoryBonus = 4000;
    else if (memory <= 45) memoryBonus = 3000;
    else if (memory <= 60) memoryBonus = 2000;
    else memoryBonus = 0;

    return (
        leicht +
        mittel +
        schwer +
        ultra +
        estimate +
        picture +
        (tf * 100) +
        reactionBonus +
        memoryBonus
    );

}

function calculateRank() {

    const total = calculateTotalPoints();

    if (total > 48000) return "🏆 Champion";
    if (total > 42000) return "💎 Elite III";
    if (total > 36000) return "💎 Elite II";
    if (total > 30000) return "💎 Elite I";
    if (total > 26000) return "🥇 Gold III";
    if (total > 22000) return "🥇 Gold II";
    if (total > 18000) return "🥇 Gold I";
    if (total > 15000) return "🥈 Silber III";
    if (total > 12500) return "🥈 Silber II";
    if (total > 10000) return "🥈 Silber I";
    if (total > 7500) return "🥉 Bronze III";
    if (total > 5000) return "🥉 Bronze II";
    if (total > 2500) return "🥉 Bronze I";

    return "🔰 Anfänger";
}*/

    document.getElementById("rank").textContent =
         calculateRank();

    document.getElementById("totalPoints").textContent =
        calculateTotalPoints();


    document.getElementById("quizEasy").textContent =
        localStorage.getItem("quiz_highscore_leicht") || 0;

    document.getElementById("quizMedium").textContent =
        localStorage.getItem("quiz_highscore_mittel") || 0;

    document.getElementById("quizHard").textContent =
        localStorage.getItem("quiz_highscore_schwer") || 0;

    document.getElementById("quizUltra").textContent =
        localStorage.getItem("quiz_highscore_ultra") || 0;

    document.getElementById("estimateScore").textContent =
        localStorage.getItem("estimate_highscore") || 0;

    document.getElementById("pictureScore").textContent =
        localStorage.getItem("bilderHighscore") || 0;

    document.getElementById("tfScore").textContent =
        localStorage.getItem("tf_best_streak") || 0;

    document.getElementById("reactionScore").textContent =
        (localStorage.getItem("reaction_best") || "-") + " ms";

    document.getElementById("memoryScore").textContent =
        (localStorage.getItem("memory_best_time") || "-") + " s";

function toggleRanks() {

    const list = document.getElementById("rankList");
    const header = document.getElementById("rankHeader");

    if (list.style.display === "none") 
    {
        list.style.display = "block";
        header.innerHTML = "🏆 Dein Rang ▲";
    } else 
    {
        list.style.display = "none";
        header.innerHTML = "🏆 Dein Rang ▼";
    }

}

function toggleAchievements(){

    const list = document.getElementById("achievementList");
    const header = document.getElementById("achievementHeader");

    if(list.style.display === "none"){

        list.style.display = "block";
        header.innerHTML = "🌟 Erfolge ▲";

    }else{

        list.style.display = "none";
        header.innerHTML = "🌟 Erfolge ▼";

    }

}

function loadAchievements(){

    let achievements = 0;

    // 1
    if((parseInt(localStorage.getItem("quiz_highscore_leicht")) || 0) >= 5000)
        achievements++;

    // 2
    if((parseInt(localStorage.getItem("quiz_highscore_mittel")) || 0) >= 5000)
        achievements++;

    // 3
    if((parseInt(localStorage.getItem("quiz_highscore_schwer")) || 0) >= 3000)
        achievements++;

    // 4
    if((parseInt(localStorage.getItem("bilderHighscore")) || 0) >= 5000)
        achievements++;

    // 5
    if((parseInt(localStorage.getItem("estimate_highscore")) || 0) >= 1500)
        achievements++;

    // 6
    if((parseInt(localStorage.getItem("tf_best_streak")) || 0) >= 5)
        achievements++;

    // 7
    if((parseInt(localStorage.getItem("reaction_best")) || 999) <= 250)
        achievements++;

    // 8
    if((parseInt(localStorage.getItem("memory_best_time")) || 999) <= 30)
        achievements++;

    // 9
    if(calculateTotalPoints() >= 30000)
        achievements++;

    // 10
    if(calculateRank() === "🏆 Champion")
        achievements++;

    document.getElementById("achievementCount").textContent =
        achievements + " / 10 freigeschaltet";

        document.getElementById("achievementList").innerHTML = `

    ${(parseInt(localStorage.getItem("quiz_highscore_leicht")) || 0) >= 5000

        ? `
        <div class="achievement unlocked">

            <h3>✅ Quiz-Anfänger</h3>

            <p>Erreiche 5000 Punkte im leichten Quiz.</p>

        </div>
        `

        : `
        <div class="achievement locked">

            <h3>🔒 Quiz-Anfänger</h3>

            <p>Erreiche 5000 Punkte im leichten Quiz.</p>

        </div>
        `
    }

    ${(parseInt(localStorage.getItem("quiz_highscore_mittel")) || 0) >= 5000

        ? `
        <div class="achievement unlocked">

            <h3>✅ Quiz-Profi</h3>

            <p>Erreiche 5000 Punkte im mittleren Quiz.</p>

        </div>
        `

        : `
        <div class="achievement locked">

            <h3>🔒 Quiz-Profi</h3>

            <p>Erreiche 5000 Punkte im mittleren Quiz.</p>

        </div>
        `
    }

    ${(parseInt(localStorage.getItem("quiz_highscore_schwer")) || 0) >= 3000

        ? `
        <div class="achievement unlocked">

            <h3>✅ Quiz-Meister</h3>

            <p>Erreiche 3000 Punkte im schweren Quiz.</p>

        </div>
        `

        : `
        <div class="achievement locked">

            <h3>🔒 Quiz-Meister</h3>

            <p>Erreiche 3000 Punkte im schweren Quiz.</p>

        </div>
        `
    }

    ${(parseInt(localStorage.getItem("bilderHighscore")) || 0) >= 5000

        ? `
        <div class="achievement unlocked">

            <h3>✅ Bilder-Profi</h3>

            <p>Erreiche 5000 Punkte bei Bilder erraten.</p>

        </div>
        `

        : `
        <div class="achievement locked">

            <h3>🔒 Bilder-Profi</h3>

            <p>Erreiche 5000 Punkte bei Bilder erraten.</p>

        </div>
        `
    }

    ${(parseInt(localStorage.getItem("estimate_highscore")) || 0) >= 1500

        ? `
        <div class="achievement unlocked">

            <h3>✅ Schätzkönig</h3>

            <p>Erreiche 1500 Punkte bei den Schätzfragen.</p>

        </div>
        `

        : `
        <div class="achievement locked">

            <h3>🔒 Schätzkönig</h3>

            <p>Erreiche 1500 Punkte bei den Schätzfragen.</p>

        </div>
        `
    }

    ${(parseInt(localStorage.getItem("tf_best_streak")) || 0) >= 5

        ? `
        <div class="achievement unlocked">

            <h3>✅ Streak-Meister</h3>

            <p>Erreiche eine 5er-Streak bei True or False.</p>

        </div>
        `

        : `
        <div class="achievement locked">

            <h3>🔒 Streak-Meister</h3>

            <p>Erreiche eine 5er-Streak bei True or False.</p>

        </div>
        `
    }

    ${(parseInt(localStorage.getItem("reaction_best")) || 999) <= 250

        ? `
        <div class="achievement unlocked">

            <h3>✅ Blitzreaktion</h3>

            <p>Schaffe eine Reaktionszeit unter 250 ms.</p>

        </div>
        `

        : `
        <div class="achievement locked">

            <h3>🔒 Blitzreaktion</h3>

            <p>Schaffe eine Reaktionszeit unter 250 ms.</p>

        </div>
        `
    }

    ${(parseInt(localStorage.getItem("memory_best_time")) || 999) <= 30

        ? `
        <div class="achievement unlocked">

            <h3>✅ Perfektes Gedächtnis</h3>

            <p>Schließe Memory in höchstens 30 Sekunden ab.</p>

        </div>
        `

        : `
        <div class="achievement locked">

            <h3>🔒 Perfektes Gedächtnis</h3>

            <p>Schließe Memory in höchstens 30 Sekunden ab.</p>

        </div>
        `
    }

    ${calculateTotalPoints() >= 30000

        ? `
        <div class="achievement unlocked">

            <h3>✅ Elite-Spieler</h3>

            <p>Erreiche insgesamt 30.000 Punkte.</p>

        </div>
        `

        : `
        <div class="achievement locked">

            <h3>🔒 Elite-Spieler</h3>

            <p>Erreiche insgesamt 30.000 Punkte.</p>

        </div>
        `
    }

    ${calculateRank() === "🏆 Champion"

        ? `
        <div class="achievement unlocked">

            <h3>🏆 Champion</h3>

            <p>Erreiche den höchsten Rang im Spiel.</p>

        </div>
        `

        : `
        <div class="achievement locked">

            <h3>🔒 Champion</h3>

            <p>Erreiche den Rang Champion.</p>

        </div>
        `
    }

    `;
}

/* -------- Reset -------- */

function resetStats(){

    if(confirm("⚠️ Wirklich ALLE Statistiken und Achievements zurücksetzen?\n\nDieser Vorgang kann nicht rückgängig gemacht werden.")){

        localStorage.removeItem("quiz_highscore_leicht");
        localStorage.removeItem("quiz_highscore_mittel");
        localStorage.removeItem("quiz_highscore_schwer");
        localStorage.removeItem("quiz_highscore_ultra");

        localStorage.removeItem("estimate_highscore");
        localStorage.removeItem("bilderHighscore");
        localStorage.removeItem("tf_best_streak");
        localStorage.removeItem("reaction_best");
        localStorage.removeItem("memory_best_time");

        localStorage.removeItem("final_best");
        localStorage.removeItem("games_played");

        alert("✅ Alle Statistiken wurden zurückgesetzt.");

        location.reload();

    }

}

loadAchievements();




