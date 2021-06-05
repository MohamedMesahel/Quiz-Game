// Declare Global variables
// Declare Questions , Choices & Answers
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];

// Declare Main Game variables
var score = 0;
var questionIndex = 0;
var mainMessage = document.querySelector("#main-message");
var questionsBlock = document.querySelector("#questionsBlock");
var timer = document.querySelector("#startTime");
var currentTime = document.querySelector("#timer-count");
var secondsLeft = 75;
var holdInterval = 0;
var penalty = 5;
var ulCreate = document.createElement("ul");

// Declare Event listener & it's function to start the game 
timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Renders questions and choices to page: 
function render(questionIndex) {
    questionsBlock.innerHTML = "";
    ulCreate.innerHTML = "";
// For loops to loop through all Questions Variable 
    for (var i = 0; i < questions.length; i++) {
// Appending questions & Choices 
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsBlock.textContent = userQuestion;
    }
// Declare New Process (for each) for questions choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsBlock.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Declare Funcion to compare Choices with Answers
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
// Correct Answer condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
// Correct Answer condition 
        } else {
// Will deduct -5 seconds off for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
            
        }
        
    }
// Questions Index determines number question user is on
    questionIndex++;
        
// Declare and append last page with player stats
    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsBlock.appendChild(createDiv);

}
// Declare alldone function
function allDone() {
    questionsBlock.innerHTML = "";
    currentTime.innerHTML = "";

// Header
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsBlock.appendChild(createH1);

// Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsBlock.appendChild(createP);

// Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsBlock.appendChild(createP2);
    }

// Declare Form Inputs
// Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsBlock.appendChild(createLabel);

// input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsBlock.appendChild(createInput);

// submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsBlock.appendChild(createSubmit);

// Declare Event listener to Player Intials and store it on local storage
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
// Connecting & Transferring Data to Finale Page
            window.location.replace("./HighScores.html");
        }
    });


}