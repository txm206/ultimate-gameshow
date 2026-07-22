let round = 0;
let score = 0;

let timeLeft = 10;
let timer;

const rounds = [

{
type:"quiz",
title:"🧠 Quiz",
question:"Wie heißt der höchste Berg der Erde?",
answers:["mount everest","everest"]
},

{
type:"tf",
title:"✔ True / False",
question:"Der Blitz ist schneller als der Donner. (true/false)",
answers:["true","wahr"]
},

{
type:"estimate",
title:"📊 Schätzfrage",
question:"Wie viele Kontinente gibt es?",
estimate:7
},

{
type:"reaction",
title:"⚡ Reaktion",
question:"Tippe jetzt sofort GO ein!",
answers:["go"]
},

{
type:"picture",
title:"🖼 Bilder erraten",
question:"🐘",
answers:["elefant"]
},

{
type:"quiz",
title:"🏆 Finale",
question:"Welcher Planet ist der größte unseres Sonnensystems?",
answers:["jupiter"]
}

];

loadRound();

function loadRound() {

    if(round>=rounds.length){

    finish();

    return;

    }

    document.getElementById("round").textContent=
    `Runde ${round+1} / ${rounds.length}`;

    document.getElementById("title").textContent=
    rounds[round].title;

    document.getElementById("question").textContent=
    rounds[round].question;

    document.getElementById("answer").value="";

    startTimer();
}

function submitAnswer() {

    clearInterval(timer);

    const r=rounds[round];

    const input=document.getElementById("answer").value
        .toLowerCase()
        .trim();

    let correct=false;

    if(r.type==="estimate"){

        const guess=parseInt(input);

    if(Math.abs(guess-r.estimate)<=1){

        correct=true;

    }

    }else{

        correct=r.answers.includes(input);

    }

    if(correct){

        score+=1000;

    }

    document.getElementById("score").textContent=
    "Punkte: "+score;

    round++;

    loadRound();

}

function startTimer() {

    clearInterval(timer);

    timeLeft = 10;
    updateTimerDisplay();

    timer = setInterval(() => {

        timeLeft--;

        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            round++;
            loadRound();
        }

    }, 1000);
}

function updateTimerDisplay() {

    const timerElement = document.getElementById("timer");

    timerElement.textContent = "⏱️ " + timeLeft;

    if (timeLeft > 5) {
        timerElement.style.color = "#f2c94c";   // Gold
        timerElement.style.animation = "none";
    } else if (timeLeft > 3) {
        timerElement.style.color = "#ff9800";   // Orange
        timerElement.style.animation = "none";
    } else {
        timerElement.style.color = "#ff3b30";   // Rot
        timerElement.style.animation = "blinkTimer 0.5s infinite";
    }
}

function finish(){

    let best=parseInt(localStorage.getItem("final_best"))||0;

    if(score>best){

        best=score;

        localStorage.setItem("final_best",best);

    }

    document.body.innerHTML=`
    <div class="container">

    <h1>🏆 Finale geschafft!</h1>

    <h2>${score} Punkte</h2>

    <p>Bestleistung: ${best}</p>

    <a href="index.html">
    <button>Zurück zum Menü</button>
    </a>

    </div>
    `;

}

loadRound();