var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#progressText');
var scoreText = document.querySelector('#score');
var progressBarFull = document.querySelector('#progressBarFull');

var currentQuestion = {}
var acceptingAnswers = true
var score = 0
var questionCounter = 0
var availableQuestions = []

var questions = [
    {
        question: "What is a template for creating objects?",
        choice1: "objects",
        choice2: "tags",
        choice3: "interfaces",
        choice4: "classes",
        answer: 1,
    },
    {
        question: "How can you get the total number of arguments passed to a function?",
        choice1: "Using args.length property",
        choice2: "Using arguments.length property",
        choice3: "Both of the above",
        choice4: "None of the above",
        answer: 2,
    },
    {
        question: "The 'function' and 'var' are known as:",
        choice1: "Keywords",
        choice2: "Data types",
        choice3: "Declaration statements",
        choice4: "Prototypes",
        answer: 3,
    },
    {
        question: "Which one of the following is known as the Equality operator, which is used to check whether the two values are equal or not:",
        choice1: "=",
        choice2: "===",
        choice3: "==",
        choice4: "&&",
        answer: 3,
    },
    {
        question: "Arrays in JavaScript are defined by which of the following statements?",
        choice1: "list of values",
        choice2: "list of objects",
        choice3: "list of string",
        choice4: "list of functions",
        answer: 1,
    }
];

var scorePoints = 100;
var maxQuestions = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > maxQuestions) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`
    progressBarFull.style.width = `${(questionCounter/maxQuestions) * 100}%`

    var questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        var number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
       if(!acceptingAnswers) return
       
       acceptingAnswers = false
       var selectedChoice = e.target
       var selectedAnswer = selectedChoice.dataset['number']

       var classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

       if(classToApply === 'correct') {
           incrementScore(scorePoints)
       }

       selectedChoice.parentElement.classList.add(classToApply)
       
       setTimeout(() => {
           selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

       }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()

