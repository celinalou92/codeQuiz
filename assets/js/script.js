let startBtn = document.querySelector("#start-quiz-btn");
let descriptionContainer = document.querySelector(".descprition");
let questionContainer = document.querySelector(".question-container");
let finalScoreContainer =document.querySelector(".final-score-container");
let finalScoreEl = document.querySelector("#final-score-p");
let playerInput = document.querySelector("#high-score-input")
let playerSubmit = document.querySelector("#high-score-submit");
let highScoreContainer = document.querySelector(".high-score-container");
let highScoreLink = document.querySelector(".high-score-link")
let highScoreUl = document.querySelector(".high-score-el");
let clearHighScore = document.querySelector("#clear-high-score-btn")
let quizListener = document.querySelector(".quiz-main");
let countdown = document.querySelector(".timer-containter");
let displayMsg = document.querySelector(".display-message");
let backBtn = document.querySelector("#back-to-begining");
let clearScoreBtn = document.querySelector("#clear-high-score-btn")
let qContent
let score = 0;
let questionIdCounter = 0;
let currentQuestion = 0;
let timeLeft 
let scoreList = JSON.parse(localStorage.getItem('scoreList')) || [];
let timer = 0;

let questionsArr = [
    {
        question: "What does DOM stand for?",
        options: ["Document Object Method", "Declare Object Model", "Document Object Model"]
    },
    {
        question: "Inside of which HTML element do we put the Javascript?",
        options: ["<scripting>", "script", "<script>"]
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        options: ["<script name='xxx.js'>", "<script src='xxx.js'></script>", "<script href='xxx.js'></script>"]
    }
]

// timer function
function timeInterval() {
    if(timeLeft === 0 || currentQuestion === 3){
        questionContainer.style.display = "none";
        clearInterval(timer);
        countdown.innerHTML = `<h3>Quiz Over</h3>`
        finalScoreContainer.style.display = "block";
        console.log("end quiz record your score")
    } else if(timeLeft > 1){
        countdown.innerText = timeLeft + " seconds remaining";
        timeLeft --;
    } else {
        countdown.innerText = timeLeft + " second remaining";
        timeLeft --;
    }
}




// clear highScore
function clear(){
    localStorage.clear();
    viewHighScore();
}

// restart quiz
function restart(){
    questionContainer.style.display = "none";
    descriptionContainer.style.display = "block";
    highScoreContainer.style.display = "none";
    countdown.innerHTML = `60 Seconds Remaining`
    currentQuestion = 0;
    questionIdCounter= 0;
    score = 0;
    clearInterval(timer);
}

// error message for player input div
function displayMessage(type, message) {
    displayMsg.textContent = message;
    displayMsg.setAttribute('class', type);
  }


    

function viewHighScore(){
    // hide all other pages and make high score page visible
    descriptionContainer.style.display = "none";
    questionContainer.style.display = "none";
    finalScoreContainer.style.display = "none";
    highScoreContainer.style.display = "block";

    highScoreUl.innerHTML = "";
    let retrievedScoreList = JSON.parse(localStorage.getItem('scoreList'));
    for( let i = 0; i < retrievedScoreList.length; i++){
        // make score elements to append to DOM
    let scoreEL = document.createElement("li");
    scoreEL.innerHTML = `${i + 1}. ${retrievedScoreList[i].player} - ${retrievedScoreList[i].finalScore}`;
    scoreEL.className = "score-item";
    highScoreUl.appendChild(scoreEL)
    }
}

 // submit score and store values in array
function submitScore(event){
    event.preventDefault();
    
    let playerInitials = playerInput.value;
     // Error handling for player input 
     if(playerInitials === ""){
         console.log(playerInitials)
         displayMessage("error", "Initials cannot be blank");
     } else if( playerInitials.length > 3){
        displayMessage("error", "Initials are too long, please enter valid input")
       }

    // save score to object 
    let scoreObj = {
        player: playerInitials,
        finalScore: score,
    };

     // push score to scoreList array
    scoreList.push(scoreObj);
    console.log(scoreList)
    localStorage.setItem("scoreList",JSON.stringify(scoreList))
    finalScoreContainer.style.display = "none";
    viewHighScore();
    
}



function recordScore(){
    // display finalscore container 
    finalScoreContainer.style.display = "block";
    finalScoreEl.innerHTML = `Your final score is: ${score}!`;
    // submitScore();
}

function selection(event) {
// check answer control flow
    if(currentQuestion === 0){
        // Checking for correct answer
        if(event.target.innerText === "Document Object Model"){
            score += 100;
            console.log(score)
            // add to score
        } else {
            timeLeft -= 10;
            score -= 20;
        }
    } else if (currentQuestion === 1) {
        if(event.target.innerText === "<script>"){
            score += 100;
            console.log(score)
        } else {
            // TODO Subtract from Score and Time
            timeLeft -= 10;
            score -= 20;
           
        }
    } else {
        console.log("Last Else")
        if(event.target.innerText === "<script src='xxx.js'></script>"){
            score += 100;
            console.log(score);
         } else {
            score -= 20;
         };
         currentQuestion++;
         console.log(currentQuestion)
         qContent = document.getElementById(questionIdCounter)
         qContent.style.display = "none"
         recordScore();
         return
    };

    // hide the question just answered
    qContent = document.getElementById(questionIdCounter);
    qContent.style.display = "none"
    // Increment the question id 
    currentQuestion++;
    questionIdCounter++;
    showQuestion();
};



function showQuestion(){
    questionContainer.innerHTML = "";
    // make question container visible
    questionContainer.style.display = "block";
     // create div with class question-contaier and container-content
    qContent = document.createElement("div");
    qContent.className = "container-content";
     // TODO I Am Here
    qContent.id = questionIdCounter;
     // create h1 class question
    let qH1 = document.createElement("h1");
    qH1.className = "questionH1";
    qH1.innerHTML = questionsArr[currentQuestion].question;
     // create button with class q-option and id = [i]
    let btnContainer = document.createElement("div");
    btnContainer.className = "btnContainer"

     // for each item in the Object's options array create button element and append to the btnContainer
     let optionsArr = questionsArr[currentQuestion].options
     for(let i = 0; i < optionsArr.length; i++){
        let Btn = document.createElement("button");
        Btn.className = "q-option";
         Btn.innerText = optionsArr[i];
          btnContainer.appendChild(Btn);
         btnContainer.appendChild(Btn);
     }
     qContent.appendChild(qH1);
     qContent.appendChild(btnContainer);
     // append div to the container
     questionContainer.appendChild(qContent);

     // increase task counter for next unique id
     console.log(`qContent id = ${questionIdCounter}`);
}


function startQuiz(){
    console.log("clicked")
    timeLeft = 60;
    countdown.innerText = timeLeft + " seconds remaining";
    // hide description and make quiz visible 
    descriptionContainer.style.display = "none";

    timer = setInterval(timeInterval, 1000);
    showQuestion()
}


startBtn.addEventListener("click", startQuiz);
questionContainer.addEventListener("click", selection);
highScoreLink.addEventListener("click", viewHighScore);
backBtn.addEventListener("click", restart);
clearScoreBtn.addEventListener("click", clear);
playerSubmit.addEventListener("click", submitScore)
clearHighScore.addEventListener("click", clear)
