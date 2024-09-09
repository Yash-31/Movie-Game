let movies = [
    { name: 'RRR', src: 'images/movie28.jpg' },
    { name: 'Jodhaa Akbar', src: 'images/movie2.jpg' },
    { name: 'Jab We Met', src: 'images/movie3.jpg' },
    { name: '83', src: 'images/movie4.jpg' },
    { name: 'De Dana Dan', src: 'images/movie5.jpg' },
    { name: 'Ghajini', src: 'images/movie6.jpg' },
    { name: 'Hungama', src: 'images/movie7.jpg' },
    { name: 'Haider', src: 'images/movie8.jpg' },
    { name: 'Bahubali: The Beginning', src: 'images/movie9.jpg' },
    { name: 'Kalki 2898 AD', src: 'images/movie10.jpg' },
    { name: 'Hanuman', src: 'images/movie11.jpg' },
    { name: 'Bahubali: The Conclusion', src: 'images/movie12.jpg' },
    { name: 'Robot 2.0', src: 'images/movie13.jpg' },
    { name: 'Dil To Pagal Hai', src: 'images/movie14.jpg' },
    { name: 'Khal Nayak', src: 'images/movie15.jpg' },
    { name: 'Bade Miyan Chote Miyan', src: 'images/movie16.jpg' },
    { name: 'Swades', src: 'images/movie17.jpg' },
    { name: 'Partner', src: 'images/movie18.jpg' },
    { name: 'Devdas', src: 'images/movie19.jpg' },
    { name: '3 Idiots', src: 'images/movie20.jpg' },
    { name: 'Parmanu', src: 'images/movie21.jpg' },
    { name: 'Gully Boy', src: 'images/movie22.jpg' },
    { name: 'Chhichhore', src: 'images/movie23.jpg' },
    { name: 'Stree', src: 'images/movie24.jpg' },
    { name: 'Gangs Of Wasseypur', src: 'images/movie25.jpg' },
    { name: 'Raees', src: 'images/movie26.jpg' },
    { name: 'Golmaal 3', src: 'images/movie27.jpg' },
    //{ name: 'RRR', src: 'images/movie28.jpg' },
    { name: 'Pushpa: The Rise', src: 'images/movie29.jpg' },
    { name: 'Sye raa Narashima Reddy', src: 'images/movie30.jpg' },
    { name: 'Saho', src: 'images/movie31.jpg' },
    { name: 'Radhe Shyam', src: 'images/movie32.jpg' },
    { name: 'Liger', src: 'images/movie33.jpg' },
    { name: 'Adipurush', src: 'images/movie34.jpg' },
    { name: 'Bajirao Mastani', src: 'images/movie35.jpg' },
    { name: 'Salaar: Part 1 - Ceasefire', src: 'images/movie36.jpg' },
    { name: 'Kushi', src: 'images/movie37.jpg' },
    { name: 'Manmadhudu', src: 'images/movie38.jpg' },
    { name: 'Bobbili raja', src: 'images/movie39.jpg' },
    { name: 'Jamba lakidi pamba', src: 'images/movie42.jpg' },
    { name: 'Jagadeka Veerudu Atiloka Sundari', src: 'images/movie41.jpg' }
    // Add more movies here
];

let currentMovieIndex = 0;
let timer;
let endTime;
//let timeLeft = 45;

let correctSound = new Audio('sounds/correct_ans.mp3');
let nextSound = new Audio('sounds/next.mp3');
let timeupSound = new Audio('sounds/timeup.mp3');
let timerSound = new Audio('sounds/timer.mp3');
let winnerSound = new Audio('sounds/winnerSound.mp3');
let cheerSound = new Audio('sounds/Cheer.wav');
timerSound.volume = 0.5;


function startGame() {
    document.getElementById('welcomePage').style.display = 'none';
    document.getElementById('container').style.display = 'flex';
    startTimer(30);
}

function startTimer(seconds) {
    clearInterval(timer);
    endTime = Date.now() + seconds * 1000;

    timer = setInterval(() => {
        const timeLeft = Math.round((endTime - Date.now()) / 1000);
        document.getElementById('timer').textContent = timeLeft >= 10 ? `00:${timeLeft}` : `00:0${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            timerSound.pause();
            timeupSound.play();
            showAnswer();
        }
    }, 1000);
    timerSound.load();
    timerSound.play();
}

function resetTimer() {
    clearInterval(timer);
    //timeLeft = 45;
    document.getElementById('timer').textContent = '00:30';
    startTimer(30);
}

function showMovie() {
    let movie = movies[currentMovieIndex];
    document.getElementById('movie-image').src = movie.src;
    document.getElementById('game-section').style.display='flex';
    document.getElementById('answer-section').style.display='none';
    document.getElementById('movie-image').style.display = 'flex';
    document.querySelector('.navigation').style.display = 'flex';
}

function previousImage() {
    if (currentMovieIndex > 0) {
        currentMovieIndex--;
        showMovie();
        resetTimer();
        nextSound.play();
    }
}

function nextImage() {
    showAnswer();
    timerSound.pause();
}

function showAnswer() {
    let movie = movies[currentMovieIndex];
    document.getElementById('movie-name').textContent = movie.name;
    document.getElementById('movie-name').style.color='green';
    document.getElementById('game-section').style.display='none';
    document.getElementById('answer-section').style.display='flex';
    //document.getElementById('movie-image').style.display = 'none';
   // document.querySelector('.navigation').style.display = 'none';
    correctSound.play();
}

function continueGame() {
    if (currentMovieIndex < movies.length - 1) {
        currentMovieIndex++;
        showMovie();
        resetTimer();
        nextSound.play();
        timerSound.play();
    } else {
        showWinner();
        timerSound.pause();
    }
}

function increaseScore(element) {
    let scoreSpan = element.querySelector('.score');
    let score = parseInt(scoreSpan.textContent);
    scoreSpan.textContent = score + 5;
    correctSound.play();
}

function showWinner() {
    let participants = document.querySelectorAll('#participants-list li');
    let maxScore = 0;
    let winner = '';
    winnerSound.play();
    cheerSound.play();
    participants.forEach(participant => {
        let score = parseInt(participant.querySelector('.score').textContent);
        if (score > maxScore) {
            maxScore = score;
            winner = participant.textContent.split(':')[0];
        }
    });
    document.getElementById('winner-name').textContent = winner;
    document.getElementById('winner-section').style.display='flex';
    document.getElementById('container').style.display='none';
    clearInterval(confetti);
    setInterval(confetti,200);
    
}

function endGame() {
    clearInterval(timer);
    showWinner();
    timerSound.pause();
}

function confetti() {
    var duration = 15 * 1000;
    var end = Date.now() + duration;
    var colors = ['#bb0000', '#ffffff']

    (function frame() {
        confetti({
            particleCount: 100,
            angle: 60,
            spread: 55,
            origin: { x: 0},
            color:colors
        });
        confetti({
            particleCount: 100,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            color:colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    showMovie();
    startTimer();
    document.getElementById('game-section').style.display='flex';
});