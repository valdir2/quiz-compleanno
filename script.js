const questions = [
    {
        question: "Qual è il modo migliore per festeggiare un compleanno?",
        options: [
            "Dormire tutto il giorno",
            "Mangiare torta per colazione, pranzo e cena",
            "Festeggiare con amici e famiglia",
            "Fingere che non sia il proprio compleanno"
        ],
        correct: 2
    },
    {
        question: "Quante candeline si dovrebbero mettere sulla torta?",
        options: [
            "Una per ogni anno, ovviamente!",
            "Solo una simbolica",
            "Tante da far scattare l'allarme antincendio",
            "Nessuna, sono un risparmio energetico"
        ],
        correct: 0
    },
    {
        question: "Qual è il miglior regalo di compleanno?",
        options: [
            "Un calzino spaiato",
            "Un abbraccio sincero",
            "Una busta vuota",
            "Un pacco pieno di scatole vuote"
        ],
        correct: 1
    },
    {
        question: "Cosa si deve fare quando qualcuno sta soffiando le candeline?",
        options: [
            "Correre a prendere un estintore",
            "Esprimere un desiderio al posto suo",
            "Scattare mille foto sfocate",
            "Cantare 'Tanti Auguri' stonati ma con entusiasmo"
        ],
        correct: 3
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const carousel = document.getElementById('fullscreen-carousel');
const balloonsContainer = document.getElementById('balloons-container');
const drumrollAudio = document.getElementById('drumroll');
const drumrollText = document.getElementById('drumroll-text');
const scoreText = document.getElementById('score-text');

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeead', '#ff9999'];
    balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.left = Math.random() * 100 + 'vw';
    balloon.style.animationDelay = Math.random() * 2 + 's';
    balloon.style.animationDuration = (Math.random() * 3 + 4) + 's';
    return balloon;
}

function addBalloons() {
    for (let i = 0; i < 20; i++) {
        const balloon = createBalloon();
        balloonsContainer.appendChild(balloon);
    }
}

function showQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });
    
    nextButton.style.display = 'none';
}

function selectOption(index) {
    const options = optionsContainer.children;
    for (let option of options) {
        option.disabled = true;
        option.classList.remove('correct', 'wrong');
    }
    
    const correct = questions[currentQuestion].correct;
    
    options[index].classList.add(index === correct ? 'correct' : 'wrong');
    if (correct === index) score++;
    
    options[correct].classList.add('correct');
    nextButton.style.display = 'block';
}

async function showFinalReveal() {
    drumrollText.classList.remove('hidden');
    // Riproduci il rullo di tamburi
    drumrollAudio.currentTime = 0;
    drumrollAudio.play();

    // Aspetta 3 secondi per il rullo di tamburi
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mostra il carosello a tutto schermo
    carousel.style.display = 'flex';
    setTimeout(() => {
        carousel.classList.add('visible');
        // Aggiungi palloncini
        addBalloons();
        // Attiva i fuochi d'artificio
        document.querySelector('.pyro').style.display = 'block';
    }, 100);
}

function showResult() {
    quizContainer.classList.remove('active');
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    resultContainer.classList.add('active');
    
    scoreText.textContent = `Hai risposto correttamente a ${score} domande su ${questions.length}!`;
    
    // Avvia la sequenza finale con rullo di tamburi
    showFinalReveal();
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    resultContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    quizContainer.classList.add('active');
    carousel.classList.remove('visible');
    carousel.style.display = 'none';
    balloonsContainer.innerHTML = '';
    document.querySelector('.pyro').style.display = 'none';
    drumrollText.classList.add('hidden');
    showQuestion();
}

nextButton.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// Inizializza il quiz
document.addEventListener('DOMContentLoaded', () => {
    carousel.style.display = 'none';
    document.querySelector('.pyro').style.display = 'none';
    showQuestion();
});