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

var form = document.querySelector("form")
var initials = document.querySelector("#initials")
var submitBtn = document.querySelector("#submitBtn");
var highScorePage = document.querySelector(".highScorePage")
var highScores = document.querySelector(".highScores")

var right = 0;
var wrong = 0;
var x = 0;
var i = 0;

var questionsAndAnswers = [
    {
    "question": "Finish this statement: I love _____",
    "a": "Fishing",
    "b": "Sleeping",
    "c": "Coding",
    "d": "All of the above"},
    {
    "question": "What is the difference between me and you?",
    "a": "You have hair",
    "b": "I dont",
    "c": "This one's wrong",
    "d": "Click this one!"},
    {
    "question": "Who is your favorite singer?",
    "a": "Madonna",
    "b": "Whitney Houston",
    "c": "Lady Gaga",
    "d": "Donna Summer"},
    {
    "question": "Who is your favorite singer?",
    "a": "Madonna",
    "b": "Whitney Houston",
    "c": "Lady Gaga",
    "d": "Donna Summer"},
    {
    "question": "Who is your favorite singer?",
    "a": "Madonna",
    "b": "Whitney Houston",
    "c": "Lady Gaga",
    "d": "Donna Summer"},
    {
    "question": "I knew she was your favorite.",
    "a": "Ya you know me so well!",
    "b": "She's really not...",
    "c": "UGH!",
    "d": "So, who's your favorite?"},
    {
    "question": "BACK! to the questions. Who is the current Prime Minister of Finland",
    "a": "Jean Castex",
    "b": "Imran Khan",
    "c": "Sanna Marin",
    "d": "Scott Morrison"},
    {
    "question": "LOL! OKay, what year is it?",
    "a": "2020",
    "b": "2021",
    "c": "2022",
    "d": "2023"},
    {
    "question": "What is a peanut?",
    "a": "Seed",
    "b": "Nut",
    "c": "Legume",
     "d": "All of the above"}
];

function startGame(){
    startContainer.setAttribute("style","display: none;")
    questionsContainer.setAttribute("style","display: initial;");
    result.setAttribute("style","display: initial;")
    score.setAttribute("style","display: initial;");
    displayQuestion();
}

function displayQuestion(){
    question.textContent = questionsAndAnswers[x].question;
    if (x < questionsAndAnswers.length) {
        x += 1
    } else if ( i === questionsAndAnswers.length){
        return displayScore();
    }
    displayAnswers();
}

function displayAnswers(){
        answerA.textContent = questionsAndAnswers[i].a;
        answerB.textContent = questionsAndAnswers[i].b;
        answerC.textContent = questionsAndAnswers[i].c;
        answerD.textContent = questionsAndAnswers[i].d;
        if (i < questionsAndAnswers.length) {
            i += 1;
        } 
}

function comparing(event){ 
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
// Took this function from the class activities
var secondsLeft = 30;
function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        time.textContent = secondsLeft;
    if(secondsLeft < 0) {
        clearInterval(timerInterval);
        displayScore();
        secondsLeft = 0
        time.textContent = ""
      }
    }, 1000);
}

function displayScore() {
    startContainer.setAttribute("style","display: none;")
    questionsContainer.setAttribute("style","display: none;")
    score.setAttribute("style","margin-top: 100px;")
    result.setAttribute("style","display: none;")
    localStorage.setItem("newScore", JSON.stringify(right));

    var oldScore = JSON.parse(localStorage.getItem("oldScore"));
    var newScore = JSON.parse(localStorage.getItem("newScore"));
    console.log(newScore)
    if (newScore > oldScore) {
        localStorage.setItem("oldScore", JSON.stringify(newScore));
        newHighScore();
    } else {
        restart.setAttribute("style", "text-align: center;")
        restart.textContent = "Play again?"
    }
}

function newHighScore(){
    form.setAttribute("style","display: initial;");
}
  

function displayHighScores(){
    highScores.setAttribute("style","display: initial;")
    startContainer.setAttribute("style","display: none;")
    questionsContainer.setAttribute("style","display: none;")
    score.setAttribute("style","display: none;")
    form.setAttribute("style","display: none;");

    let listItem = document.createElement('LI');
    listItem.appendChild(document.createTextNode("NEW! Initials: " + initials.value + " | Score: " + JSON.parse(localStorage.getItem("newScore"))));
    highScores.appendChild(listItem);
    console.log(initials.value);

    
}

function init(){
    right = 0;
    wrong = 0;
    x = 0;
    i = 0;
    secondsLeft = 30;
    correct.textContent = right;
    incorrect.textContent = wrong;

    startContainer.setAttribute("style","display: initial;")
    questionsContainer.setAttribute("style","display: none;")
    // form.setAttribute("style","display: none;")
    highScores.setAttribute("style","display: none;")
    score.setAttribute("style","display: none;")
    result.setAttribute("style","display: none;")
    restart.textContent = "Restart"
}

init();

startBtn.addEventListener("click", startGame)
startBtn.addEventListener("click", setTime)
answersList.addEventListener("click", comparing)
highScorePage.addEventListener("click", displayHighScores)
restart.addEventListener("click", init)
submitBtn.addEventListener("click", function(event){
    event.preventDefault;
    displayHighScores();
});
