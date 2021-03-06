let startBtn = document.querySelector("#start-quiz-btn");
let descriptionContainer = document.querySelector(".descprition");
let questionContainer = document.querySelector(".question-container")
let quiz
let score = 0;
let questionIdCounter = 0;
let currentQuestion = 0


let questionsArr = [
    {
        question: "What does DOM stand for?",
        a: "Document Object Mehtod",
        b: "Declare Object Model",
        c: "Document Object Model",
    },
    {
        question: "Inside of which HTML element do we put the Javascript?",
        a: "<scripting>",
        b: "script",
        c: "<script>"
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        a: "<script name='xxx.js'>",
        b: "<script src='xxx.js'></script>",
        c: "<script href='xxx.js'></script>"
    }
]



function createQuestion(){
     // for each item in the questions object display the question and add/subtrack from score
    for(i = 0; i < questionsArr.length; i++){
        // create div with class question-contaier and container-content
        let qContent = document.createElement("div");
        qContent.className = "question-contaier container-content";
        // TODO I Am Here
        qContent.setAttribute("data-q-id", questionIdCounter)
        // create h1 class question
        let qH1 = document.createElement("h1");
        qH1.className = "questionH1";
        qH1.innerHTML = questionsArr[i].question;
        // create button with class q-option and data-q-id = [i]
        let btnContainer = document.createElement("div")
        btnContainer.className = "btnContainer"
        let aBtn = document.createElement("button");
        let bBtn = document.createElement("button");
        let cBtn = document.createElement("button");
        aBtn.className = "q-option";
        bBtn.className = "q-option";
        cBtn.className = "q-option";
        aBtn.setAttribute("data-q-id", questionIdCounter);
        bBtn.setAttribute("data-q-id", questionIdCounter);
        cBtn.setAttribute("data-q-id", questionIdCounter);
       
        aBtn.innerText = questionsArr[i].a;
        bBtn.innerText = questionsArr[i].b;
        cBtn.innerText = questionsArr[i].c;
        // append the question to the div and append the buttons to the div
        btnContainer.appendChild(aBtn);
        btnContainer.appendChild(bBtn);
        btnContainer.appendChild(cBtn);

        qContent.appendChild(qH1)
        qContent.appendChild(btnContainer)
        // append div to the container
        questionContainer.appendChild(qContent)
        // eventlistener and button functionality

        // increase task counter for next unique id
        questionIdCounter++
        console.log(questionIdCounter)
    }
}


let startQuiz = function(questionsArr){
    console.log("clicked")
    // hide description and make quiz visible 
    descriptionContainer.style.display = "none";
    // make question container visible
    questionContainer.style.display = "block";
    // for each item in the questions object display the question and add/subtrack from score
    createQuestion()
    
}


let showResults = function(){

}


startBtn.addEventListener("click", startQuiz)