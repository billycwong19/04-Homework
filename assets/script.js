var startContainer = document.querySelector(".startContainer")
var startHeader = document.querySelector(".startHeader")
var prompts = document.querySelector(".prompts")
var startBtn = document.querySelector(".startBtn")
var questionsContainer = document.querySelector(".container")
var question = document.querySelector(".question")
var answersList = document.querySelector(".answersList")
var answerA = document.querySelector(".answerA")
var answerB = document.querySelector(".answerB")
var answerC = document.querySelector(".answerC")
var answerD = document.querySelector(".answerD")
var result = document.querySelector(".result")
var score = document.querySelector(".score")
var correct = document.querySelector(".correct");
var incorrect = document.querySelector(".incorrect")
var restart = document.querySelector(".restart")
var time = document.querySelector(".time")
var form = document.querySelector(".form")
var initials = document.querySelector("#initials")
var submitBtn = document.querySelector("#submitBtn");
var highScorePage = document.querySelector(".highScorePage")
var highScores = document.querySelector(".highScores")
// these become my score counters
var right = 0;
var wrong = 0;
// these become my iterators for questions and answers
var x = 0;
var i = 0; 
localStorage.setItem("oldScore", "0");


// these are the questions and answers stored in an object
var questionsAndAnswers = [
    {
    "question": "Finish this statement: I love _____",
    "a": "Fishing",
    "b": "Sleeping",
    "c": "Coding",
    "d": "All of the above"},
    {
    "question": "What is the difference 22 51?",
    "a": "26",
    "b": "27",
    "c": "28",
    "d": "29"},
    // "correct": "d"},
    {
    "question": "Who sang on the song 'I Feel Love'?",
    "a": "Madonna",
    "b": "Whitney Houston",
    "c": "Lady Gaga",
    "d": "Donna Summer"},
    {
    "question": "In blackjack, what's the preffered move if you draw 11?",
    "a": "Split",
    "b": "Hit",
    "c": "Double down",
    "d": "Fold"},
    {
    "question": "What is the frequency of the not A4",
    "a": "432Hz",
    "b": "400Hz",
    "c": "440Hz",
    "d": "420Hz"},
    {
    "question": "Whats 1230 divided by 16?",
    "a": "76",
    "b": "76.1",
    "c": "76.875",
    "d": "76"},
    {
    "question": "Who is the current Prime Minister of Finland",
    "a": "Jean Castex",
    "b": "Imran Khan",
    "c": "Sanna Marin",
    "d": "Scott Morrison"},
    {
    "question": "Which company rose to fame as a meme stock in early of 2021?",
    "a": "Nokia",
    "b": "BlackBerry",
    "c": "GameStop",
    "d": "AMC"},
    {
    "question": "What is a peanut?",
    "a": "Seed",
    "b": "Nut",
    "c": "Legume",
     "d": "All of the above"}
];

// beginning of questioning. displays elements while hiding startContainer
function startGame(){
    startContainer.setAttribute("style","display: none;")
    questionsContainer.setAttribute("style","display: initial;");
    result.setAttribute("style","display: initial;")
    score.setAttribute("style","display: initial;");
    displayQuestion();
}
// displays one question at a time using the global x or it skips to displayScore
function displayQuestion(){
    if (x < questionsAndAnswers.length) {
        question.textContent = questionsAndAnswers[x].question;
        x += 1
    } else {
        displayScore();
    }
    displayAnswers();
}
// displays answers from their corresponding location in the object array and awats a click event to being comparing
function displayAnswers(){  
    if (i < questionsAndAnswers.length) {
        answerA.textContent = questionsAndAnswers[i].a;
        answerB.textContent = questionsAndAnswers[i].b;
        answerC.textContent = questionsAndAnswers[i].c;
        answerD.textContent = questionsAndAnswers[i].d;
        i += 1;
        } 
}
// compares if click event matches the value of a dataset attribute of a button. displays a string if you got it right or not
function comparing(event){ 
    // let x = 0;
    // let correct = questionsAndAnswers[i].correct;
    // console.log(correct)
    var compare = event.target;
    if (compare.matches("button")){
        if (compare.dataset.right === "right"){
            result.textContent = "You GOT IT";
            right+= 1
        } else {
            result.textContent = "nope"
            wrong+= 1
            secondsLeft--;
        }
        correct.textContent = right;
        incorrect.textContent = wrong;
        displayQuestion();
    }
}
// Took this function from the class activities and counts down from 30 seconds. once it hits zero or less it stops. 
var secondsLeft = 31;
function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        time.textContent = secondsLeft;
    if(secondsLeft <= 0) {
        clearInterval(timerInterval);
        displayScore();
        secondsLeft = 0
        time.textContent = 0
      }
    }, 1000);
}
// hides questionsContainer and stores score in the local storage. then retrieves the newScore to compare to the Old Score which is the previous high score. 
function displayScore() {
    secondsLeft = 0
    time.textContent = 0
    startContainer.setAttribute("style","display: none;")
    questionsContainer.setAttribute("style","display: none;")
    score.setAttribute("style","margin-top: 100px;")
    result.setAttribute("style","display: none;")
    localStorage.setItem("newScore", JSON.stringify(right));

    var oldScore = JSON.parse(localStorage.getItem("oldScore"));
    var newScore = JSON.parse(localStorage.getItem("newScore"));
    if (newScore > oldScore) {
        localStorage.setItem("oldScore", JSON.stringify(newScore));
        newHighScore();
    } else {
        restart.setAttribute("style", "text-align: center;")
        restart.textContent = "Play again?"
    }
}

// displays a form if the newScore is greater than the oldScore
function newHighScore(){
    submitBtn.setAttribute("style", "width: 50%; text-align: center;")
    form.setAttribute("style","display: initial;");
}

// adds an li item with initial and score to the highScores list
function createScoreList(){
    var listItem = document.createElement('LI');
    listItem.textContent = "Initials: " + initials.value + " | Score: " + JSON.parse(localStorage.getItem("newScore"));
    highScores.insertBefore(listItem, highScores.firstChild)
    console.log(listItem.textContent)
    displayHighScores();
}

// displays high scores!
function displayHighScores(){
    form.addEventListener("submit", function(event){
        event.preventDefault;});
    highScores.setAttribute("style","display: initial;")
    startContainer.setAttribute("style","display: none;")
    questionsContainer.setAttribute("style","display: none;")
    score.setAttribute("style","display: none;")
    form.setAttribute("style","display: none;");
    result.setAttribute("style","display: none;");
}
// initializes game and acts as a reset as well.
function init(){
    right = 0;
    wrong = 0;
    x = 0;
    i = 0;
    secondsLeft = 30;
    correct.textContent = right;
    incorrect.textContent = wrong;
    initials.value = "";

    startContainer.setAttribute("style","display: initial;")
    questionsContainer.setAttribute("style","display: none;")
    form.setAttribute("style","display: none;")
    highScores.setAttribute("style","display: none;")
    score.setAttribute("style","display: none;")
    result.setAttribute("style","display: none;")
    restart.textContent = "Restart"
    
}

init();
// event listeners!
startBtn.addEventListener("click", startGame)
startBtn.addEventListener("click", setTime)
answersList.addEventListener("click", comparing)
submitBtn.addEventListener("click", createScoreList)
highScorePage.addEventListener("click", displayHighScores)
restart.addEventListener("click", init)
