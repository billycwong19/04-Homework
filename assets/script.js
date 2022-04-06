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
// these become my score counters
var right = 0;
var wrong = 0;
// these become my iterators for questions and answers
var x = 0;
var i = 0; 
// these are the questions and answers stored in an object
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
    // "correct": "d"},
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
    form.setAttribute("style","display: initial;");
}
// adds an li item with initial and score to the highScores list
function createScoreList(event){
    event.preventDefault;
    var listItem = document.createElement('LI');
    listItem.textContent = "Initials: " + initials.value + " | Score: " + JSON.parse(localStorage.getItem("newScore"));
    highScores.insertBefore(listItem, highScores.firstChild)
    console.log(listItem.textContent)
    displayHighScores();
}
// displays high scores!
function displayHighScores(){
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
highScorePage.addEventListener("click", displayHighScores)
restart.addEventListener("click", init)
submitBtn.addEventListener("click", createScoreList)
