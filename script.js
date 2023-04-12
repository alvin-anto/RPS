function showGame() {
    document.querySelector('.start-button').classList.add('hidden');
    document.querySelector('.continue-button').classList.add('hidden');
    document.querySelector('.start-over-button').classList.add('hidden');
    document.querySelector('.instructions').classList.remove('hidden');
    document.querySelector('.game-buttons').classList.remove('hidden');
    document.querySelector('.js-result').classList.remove('hidden');
    document.querySelector('.js-score').classList.remove('hidden');
    document.querySelector('#reset-score-button').classList.remove('hidden');
}

function startOver() {
    localStorage.removeItem('score');
    location.reload();
}

if (localStorage.getItem('score')) {
    document.querySelector('#start-button').classList.add('hidden');
    document.querySelector('#continue-button').classList.remove('hidden');
    document.querySelector('#start-over-button').classList.remove('hidden');
}

function playRound(playerSelection) {
    const computerSelection = computerPlay();
    const result = getResult(playerSelection, computerSelection);

    displayMoves(playerSelection, computerSelection);
    displayResult(result);
    updateScore(result);
    displayScore();
}

function computerPlay() {
    const choices = ['rock',
    'paper',
    'scissors'
];
const randomIndex = Math.floor(Math.random() * choices.length);
return choices[randomIndex];
}

function getResult(playerSelection, computerSelection) {
if (playerSelection === computerSelection) {
    return 'draw';
}

if (
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')
) {
    return 'win';
}

return 'lose';
}

function displayMoves(playerSelection, computerSelection) {
document.querySelector('.js-player-move').src = getMoveImage(playerSelection);
document.querySelector('.js-computer-move').src = getMoveImage(computerSelection);
document.querySelector('.move-display').classList.remove('hidden');
}

function getMoveImage(move) {
    if (move === 'rock') {
        return 'https://em-content.zobj.net/source/microsoft-teams/337/raised-fist_270a.png';
    } else if (move === 'paper') {
        return 'https://em-content.zobj.net/source/microsoft-teams/337/raised-hand_270b.png';
    } else {
        return 'https://em-content.zobj.net/source/microsoft-teams/337/victory-hand_270c-fe0f.png';
    }
}

function displayResult(result) {
let resultText;

if (result === 'win') {
    resultText = 'You won!';
} else if (result === 'lose') {
    resultText = 'You lost!';
} else {
    resultText = "It's a draw!";
}

document.querySelector('.js-result').textContent = resultText;
}

function updateScore(result) {
let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, draws: 0 };

if (result === 'win') {
    score.wins++;
} else if (result === 'lose') {
    score.losses++;
} else {
    score.draws++;
}

localStorage.setItem('score', JSON.stringify(score));
}

function displayScore() {
const score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, draws: 0 };
document.querySelector('.js-score').textContent = `Wins: ${score.wins} | Losses: ${score.losses} | Draws: ${score.draws}`;
}

function resetScore() {
const score = { wins: 0, losses: 0, draws: 0 };
localStorage.removeItem('score');
document.querySelector('.move-display').classList.add('hidden');
document.querySelector('.js-result').classList.add('hidden');
displayScore();

let gameContent = document.querySelector('.game-content');
    gameContent.classList.add('flipping');
    setTimeout(() => {
        gameContent.classList.remove('flipping');
    }, 1000);
}

displayScore();
