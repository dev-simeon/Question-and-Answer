// instanciating elements
let api_url = 'https://opentdb.com/api.php?amount=20&difficulty=easy&type=multiple';
let displayQuestion = document.querySelector(".display-question");
let cardContainer = document.querySelector("#card-container");
let optionA = document.querySelector(".option-a");
let optionB = document.querySelector(".option-b");
let optionC = document.querySelector(".option-c");
let optionD = document.querySelector(".option-d");
let quizLevel = document.querySelector("#level");
let timer = document.querySelector("#setTime");
let body = document.querySelector("#body");
let optionsArray = [optionA,optionB,optionC,optionD];
let submitButton = document.querySelector("#submitButton");
let questionsContainer = document.querySelector("#questionContainer");
let restartQuiz = document.querySelector("#restartQuiz");
let selectedAnswer = [];
// holds the questions array
let questions;

// assign the value of 1 to the quizLevel.TextContent
quizLevel.textContent = 1;

let timerID;
let intervalTimeID;

// call the intializeQuiz function
intializeQuiz();
// send a get request to the url
function intializeQuiz(){
    fetch(api_url)
    .then(response => {
        // convert the response to jsonData
        return response.json();
    })
    .then(data => {
        // save the data
        saveQuestions(data.results);
        displayQuestionAndOptionsOnPage();
    })
    // throw and error if the fetch request fails
    .catch(error => {
        // display the error to the users
        console.error(error);
    });
};

// save the data to the questions array
function saveQuestions(data) {
    questions = data;
};

// current question displayed
let currentQuestionIndex = 0;
// get the next question to be shown;
function getNextQuestion(){
    // assign the value of the first item 
    // in the question array to the currentQuestion variable on load
    let currentQuestion = questions[currentQuestionIndex];
    // increment the variable currentQuestionIndex by 1
    currentQuestionIndex += 1;
    // return the value of currentQuestion
    return currentQuestion;
};

// get the question and answer from the currentqQuestion object
// and output to the html element.
function displayQuestionAndOptionsOnPage(){
    // clear the interval using the id
    clearInterval(intervalTimeID);
    timer.classList.add("border-dark");
    timer.classList.add("border");
    body.classList.remove("warning");
    timer.classList.remove("warning");
    timer.style.color = "black";
    // assign the return value of getNextQuestion to currentQuestion
    let currentQuestion = getNextQuestion();
    // display the questions to the user
    displayQuestion.innerHTML = currentQuestion.question;
    // call the displayOptions method
    if(quizLevel.textContent == 1){
        timerID = setTimeout(function () {
            let answerButton = document.querySelector(".selected");
            // check if the answerButton does not exist
            if (answerButton == null) {
                // if true alert this message
                selectedAnswer.push("Time Elapsed");
            }
            displayQuestionAndOptionsOnPage();
        }, 16000);
       displayTime(14);
    }
    else if(quizLevel.textContent == 2){
        timerID = setTimeout(function () {
            let answerButton = document.querySelector(".selected");
            // check if the answerButton does not exist
            if (answerButton == null) {
                // if true alert this message
                selectedAnswer.push("Time Elapsed");
            }
            displayQuestionAndOptionsOnPage();
        }, 13000);
        displayTime(11);
    } 
    else{
        timerID = setTimeout(function () {
            let answerButton = document.querySelector(".selected");
            // check if the answerButton does not exist
            if (answerButton == null) {
                // if true alert this message
                selectedAnswer.push("Time Elapsed");
            }
            displayQuestionAndOptionsOnPage();
        }, 10000);
        displayTime(8);
    }
    displayOptions(currentQuestion.incorrect_answers,currentQuestion.correct_answer);
    checkIfLastQuestion();
};

// output the options on the html page
function displayOptions(incorrectAnswers,correctAnswer){
    // get a random number between 0 and 3 that represents the position of
    // where the correct option/answer will go/show.
    let randomNumber = generateRandomNumber();
    // loop over the incorrect options/answers
    incorrectAnswers.forEach((element,index) => {
        // check if the optionsArray index is not equal to 
        // the value of the randomNumber
        if(index != randomNumber){
            // match all index not located in the position of the randomNumber value
            optionsArray[index].innerHTML = element;
        }
        // check if the randomNumber value is less than three
        else if (randomNumber < 3){
            // assign the item in the incorrectAnswers array at the position
            // of the randomNumber value to the optionArray last index
            optionsArray[3].innerHTML = element;
        }
    });
    // get the button element located at the value of randomNumber in the array
    // set the question's correct answer as the button's content/value.
    optionsArray[randomNumber].innerHTML = correctAnswer;
};

// addEventListener to the button
optionA.addEventListener("click", () => {
    // on click add the class of selected to the button
    optionA.classList.add("selected");
    // remove the class of selected from other buttons
    optionB.classList.remove("selected");
    optionC.classList.remove("selected");
    optionD.classList.remove("selected");
});

optionB.addEventListener("click", () => {
    // on click add the class of selected to the button
    optionB.classList.add("selected");
    // remove the class of selected from other buttons
    optionA.classList.remove("selected");
    optionC.classList.remove("selected");
    optionD.classList.remove("selected");
});

optionC.addEventListener("click", () => {
    // on click add the class of selected to the button
    optionC.classList.add("selected");
    // remove the class of selected from other buttons
    optionB.classList.remove("selected");
    optionA.classList.remove("selected");
    optionD.classList.remove("selected");
});

optionD.addEventListener("click", () => {
    // on click add the class of selected to the button
    optionD.classList.add("selected");
    // remove the class of selected from other buttons
    optionB.classList.remove("selected");
    optionC.classList.remove("selected");
    optionA.classList.remove("selected");
});

// check if  five question as been displayed on the page
function checkIfLastQuestion(){
    // check if quizLevel.textContent is equal to 1
    if(quizLevel.textContent == 1){
        // check if currentQuestionIndex is equal to (6);
        if(currentQuestionIndex == 6){
            clearTimeout(timerID);
            clearInterval(intervalTimeID);
            // if condition returns true then
            // add the "d-none" class on this html element
            questionsContainer.classList.add("d-none");
            // show the summary of the question
            displaySummary();
        }
    } 
    // check if quizLevel.textContent is equal to 2
    else if (quizLevel.textContent == 2){
        // check if currentQuestionIndex is equal to (11);
        if(currentQuestionIndex == 11){
            clearTimeout(timerID);
            clearInterval(intervalTimeID);
            // if condition returns true then
            // add the "d-none" class on this html element
            questionsContainer.classList.add("d-none");
            // show the summary of the question
            displaySummary();
        }
    }
    // if quizLevel.textContent is not equal to 1 and 2
    else {
        // check if currentQuestionIndex is equal to (16);
        if (currentQuestionIndex == 16) {
            clearTimeout(timerID);
            clearInterval(intervalTimeID);
            // if condition returns true then
            // add the "d-none" class on this html element
            questionsContainer.classList.add("d-none");
            // show the summary of the question
            displaySummary();
        }
    }
};

// addEventListener to the sumbitButton
submitButton.addEventListener("click", () => {
    clearTimeout(timerID);
    let answerButton = document.querySelector(".selected");
    // check if the answerButton does not exist
    if (answerButton == null){
        // if true alert this message
        selectedAnswer.push("Time Elapsed");
    }
    // if the answerButton exist 
    else{
        // get the value of the answerButton and remove the space at the 
        // beginning and the ending then assign the value to the answer variable
        let answer = answerButton.textContent.trim()
        // push the answer variable to the selectedAnswer array
        selectedAnswer.push(answer);
        // remove the class of selected from the element
        answerButton.classList.remove("selected");
    };
    checkIfLastQuestion();
    // call the displayQuestionAndOptionsOnPage function
    displayQuestionAndOptionsOnPage();
});

// show the summary of question;s answered on page
function displaySummary(){
    cardContainer.classList.remove("d-none");
    // check if the quizLevel.textContent is equal to 1
    if (quizLevel.textContent == 1){
        // loop over the question array using the length minus 25
        for (i = 0; i < questions.length - 15; i++){
            for(i = 0; i < selectedAnswer.length; i++){
                if(selectedAnswer[i] == "Time Elapsed"){
                    let html = `<section class="summary-section d-flex summary flex-column 
                            justify-content-center bg-white p-4 rounded-4 gap-3">
                            <div>
                                <p class="text-center text-secondary mb-0">
                                    ${questions[i].question}
                                </p>
                            </div>
                            <div class="d-flex flex-column gap-2">
                                <p class="text-center mb-0">Your Answer : 
                                    <span class="fw-bold">
                                        ${selectedAnswer[i]}
                                    </span>
                                </p>
                            </div>
                        </section>`
                    // insert the html as the last child of the cardContainer element
                    cardContainer.insertAdjacentHTML("beforeend", html)
                } else{
                    // insert the question's, selectedAnswer, and correctAnswer 
                    let html = `<section class="summary-section d-flex summary flex-column 
                            justify-content-center bg-white p-4 rounded-4 gap-3">
                            <div>
                                <p class="text-center text-secondary mb-0">
                                    ${questions[i].question}
                                </p>
                            </div>
                            <div class="d-flex flex-column gap-2">
                                <p class="text-center mb-0">Your Answer : 
                                    <span class="fw-bold">
                                        ${selectedAnswer[i]}
                                    </span>
                                </p>
                                <p class="text-center mb-0">Correct Answer :
                                    <span class="fw-bold">
                                        ${questions[i].correct_answer}
                                    </span>
                                </p>
                            </div>
                        </section>`
                    // insert the html as the last child of the cardContainer element
                    cardContainer.insertAdjacentHTML("beforeend", html)
                }
            }
        }
    }
    // check if the quizLevel.textContent is equal to 2 
    else if (quizLevel.textContent == 2){
        // loop over the question array using the length minus 20
        for (i = 0; i < questions.length - 10; i++) {
            for (i = 0; i < selectedAnswer.length; i++) {
                if (selectedAnswer[i] == "Time Elapsed") {
                    let html = `<section class="summary-section d-flex summary flex-column 
                            justify-content-center bg-white p-4 rounded-4 gap-3">
                            <div>
                                <p class="text-center text-secondary mb-0">
                                    ${questions[i].question}
                                </p>
                            </div>
                            <div class="d-flex flex-column gap-2">
                                <p class="text-center mb-0">Your Answer : 
                                    <span class="fw-bold">
                                        ${selectedAnswer[i]}
                                    </span>
                                </p>
                            </div>
                        </section>`
                    // insert the html as the last child of the cardContainer element
                    cardContainer.insertAdjacentHTML("beforeend", html)
                } else {
                    // insert the question's, selectedAnswer, and correctAnswer 
                    let html = `<section class="summary-section d-flex summary flex-column 
                            justify-content-center bg-white p-4 rounded-4 gap-3">
                            <div>
                                <p class="text-center text-secondary mb-0">
                                    ${questions[i].question}
                                </p>
                            </div>
                            <div class="d-flex flex-column gap-2">
                                <p class="text-center mb-0">Your Answer : 
                                    <span class="fw-bold">
                                        ${selectedAnswer[i]}
                                    </span>
                                </p>
                                <p class="text-center mb-0">Correct Answer :
                                    <span class="fw-bold">
                                        ${questions[i].correct_answer}
                                    </span>
                                </p>
                            </div>
                        </section>`
                    // insert the html as the last child of the cardContainer element
                    cardContainer.insertAdjacentHTML("beforeend", html)
                }
            }
        }
    } 
    // if the quizLevel.textContent is not equal to 1 and 2
    else {
        // loop over the question array using the length minus 15
        for (i = 0; i < questions.length - 5; i++) {
            for (i = 0; i < selectedAnswer.length; i++) {
                if (selectedAnswer[i] == "Time Elapsed") {
                    let html = `<section class="summary-section d-flex summary flex-column 
                            justify-content-center bg-white p-4 rounded-4 gap-3">
                            <div>
                                <p class="text-center text-secondary mb-0">
                                    ${questions[i].question}
                                </p>
                            </div>
                            <div class="d-flex flex-column gap-2">
                                <p class="text-center mb-0">Your Answer : 
                                    <span class="fw-bold">
                                        ${selectedAnswer[i]}
                                    </span>
                                </p>
                            </div>
                        </section>`
                    // insert the html as the last child of the cardContainer element
                    cardContainer.insertAdjacentHTML("beforeend", html)
                } else {
                    // insert the question's, selectedAnswer, and correctAnswer 
                    let html = `<section class="summary-section d-flex summary flex-column 
                            justify-content-center bg-white p-4 rounded-4 gap-3">
                            <div>
                                <p class="text-center text-secondary mb-0">
                                    ${questions[i].question}
                                </p>
                            </div>
                            <div class="d-flex flex-column gap-2">
                                <p class="text-center mb-0">Your Answer : 
                                    <span class="fw-bold">
                                        ${selectedAnswer[i]}
                                    </span>
                                </p>
                                <p class="text-center mb-0">Correct Answer :
                                    <span class="fw-bold">
                                        ${questions[i].correct_answer}
                                    </span>
                                </p>
                            </div>
                        </section>`
                    // insert the html as the last child of the cardContainer element
                    cardContainer.insertAdjacentHTML("beforeend", html)
                }
            }
        }
    } 
    // assign the restartQuiz to the button variable
    if (quizLevel.textContent == 3){
        restartQuiz.textContent = "restart quiz";
    } else{
        restartQuiz.textContent = "Resume next level";
    }
    // insert the button element as the last element of the cardContainer
    cardContainer.insertAdjacentElement("beforeend",restartQuiz);
};

// addEventListener to the restart quiz button
restartQuiz.addEventListener("click", () =>{
    // remove the "d-none" class from the questionsContainer
    questionsContainer.classList.remove("d-none");
    // add the "d-none" class to the cardContainer
    cardContainer.classList.add("d-none");
    // reset the currentQuestionIndex
    currentQuestionIndex = 0;
    // clear the selectedAnswer array
    selectedAnswer.length = 0;
    // select all html element with the class of "summary"
    // and assign it to levelSummary variable
    let levelSummary = document.querySelectorAll(".summary");
    // loop inside the level summary
    levelSummary.forEach(element => {
        // add the "d-none" class to all item element the levelSummary array
        element.classList.add("d-none")
    })
    if (restartQuiz.textContent == "restart quiz"){
        quizLevel.textContent = 1;
    } else{
        // convert quizLevel.textContent to integer
        // and assign it to the level variable
        let level = parseInt(quizLevel.textContent);
        // assign the value of level plus 1 to quizLevel.textContent
        quizLevel.textContent = level + 1;
    }
    // call the initializeQuiz function
    intializeQuiz();
});

// generate random number between 0 and 3
function generateRandomNumber(){
    return Math.floor(Math.random() * 4);
};

// display the allotted time for each question to the user
function displayTime(sec){
    // assign the return value of the setInterval to the variable intervalTimeID 
    intervalTimeID = setInterval(function myTimer() {
        // concatenate the value of sec and the string "sec" and assign
        // it to timer.textContent
        timer.textContent = sec + " sec";
        // check if sec is equal to five
        if (sec == 5) {
            // if statement returns true add the class "warning"
            // to the body element and the timer element
            body.classList.add("warning");
            timer.classList.add("warning");
            timer.classList.remove("border-dark");
            timer.classList.remove("border");
            timer.style.color = "red";
        }
        // decrement the value of sec at the interval of one seconds
        sec--;
    }, 1000);
};