console.log("highScores");
var highScoresList = document.querySelector('#highScoresList')
var highScores = JSON.parse(localStorage.getItem('highScores')) || []
console.log("scores" + highScores);

highScoresList.innerHTML =
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')