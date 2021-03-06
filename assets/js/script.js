let startBtn = document.querySelector("#start-quiz-btn");
let descriptionContainer = document.querySelector(".descprition");
let questionContainer = document.querySelector(".question-container")
let quizListener = document.querySelector(".quiz-main")
let countdown = document.querySelector(".timer-containter")
let score = 0;
let questionIdCounter = 0;
let currentQuestion = 0
let timeLeft = 120;


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
function timeRemaining() {
    
    let timeInterval = setInterval(function() {
        if(timeLeft === 0){
            clearInterval(timeInterval);
        } else if(timeLeft > 1){
            countdown.innerText = timeLeft + " seconds remaining";
            timeLeft --;
        } else {
            countdown.innerText = timeLeft + " second remaining";
            timeLeft --;
        }
     },1000);
}
    

function recordScore(){
    console.log(`Your final score is: ${score}`);
}

function selection(event) {
// check answer control flow
    if(currentQuestion === 0){
        // Checking for correct answer
        if(event.target.innerText === "Document Object Model"){
            score += 20;
            console.log(score)
            // add to score
        } else {
            timeLeft -= 10;
            score -= 5;
            console.log("wrong")
            // TODO Subtract from Score and Time
        }
    } else if (currentQuestion === 1) {
        if(event.target.innerText === "<script>"){
            score += 20;
            console.log(score)
        } else {
            // TODO Subtract from Score and Time
            timeLeft -= 10;
            score -= 5;
            console.log("wrong")
        }
    } else {
        if(event.target.innerText === "<script src='xxx.js'></script>"){
            console.log("third question");
            score += 20;
            console.log(score);
            recordScore();
         } else{
            timeLeft -= 10;
            score -= 5;
            console.log("wrong")
            recordScore();
         };
    };
    // hide the question just answered
    qContent = document.getElementById(questionIdCounter)
    qContent.style.display = "none"
    // Increment the question id 
    currentQuestion++;
    questionIdCounter++;
    showQuestion();
};

function showQuestion(){
    
     // create div with class question-contaier and container-content
    let qContent = document.createElement("div");
    qContent.className = "question-contaier container-content";
     // TODO I Am Here
    qContent.id = questionIdCounter;
     // create h1 class question
    let qH1 = document.createElement("h1");
    qH1.className = "questionH1";
    qH1.innerHTML = questionsArr[currentQuestion].question;
     // create button with class q-option and id = [i]
    let btnContainer = document.createElement("div")
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

    selection();
}


let startQuiz = function(questionsArr){
    console.log("clicked")

    // hide description and make quiz visible 
    descriptionContainer.style.display = "none";
    // make question container visible
    questionContainer.style.display = "block";
    // for each item in the questions object display the question and add/subtrack from score
    timeRemaining();
    showQuestion();
}


let showResults = function(){

}


startBtn.addEventListener("click", startQuiz);
questionContainer.addEventListener("click", selection);