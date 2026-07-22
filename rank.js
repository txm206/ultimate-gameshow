function calculateTotalPoints() {

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
}