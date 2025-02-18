const questions = [
    {
        question: "What is the main ingredient of the popular Indian dish 'Chole Bhature'?",
        options: ["Rice", "Lentils", "Chickpeas", "Potatoes"],
        correctAnswer: 2 // "Chickpeas"
    },
    {
        question: "What is the traditional name for the Indian dessert made from milk and sugar, often garnished with pistachios?",
        options: ["Gulab Jamun", "Rasgulla", "Kheer", "Jalebi"],
        correctAnswer: 2 // "Kheer"
    },
    {
        question: "Which state in India is famous for its 'Vada Pav'?",
        options: ["Punjab", "Maharashtra", "Tamil Nadu", "Uttar Pradesh"],
        correctAnswer: 1 // "Maharashtra"
    },
    {
        question: "What is the name of the spicy rice dish made with vegetables or meat, often referred to as the 'king of rice dishes' in India?",
        options: ["Biryani", "Pulao", "Pani Puri", "Khichdi"],
        correctAnswer: 0 // "Biryani"
    },
    {
        question: "What is the main ingredient in the popular South Indian dish 'Dosa'?",
        options: ["Wheat flour", "Rice flour", "Semolina", "Gram flour"],
        correctAnswer: 1 // "Rice flour"
    }
];
const quotes = [
    { minScore: 0, maxScore: 1, quote: "You’re still figuring out Biryani – keep stirring!" },
    { minScore: 2, maxScore: 2, quote: "Not bad! You’ve got a Pani Puri level of knowledge!" },
    { minScore: 3, maxScore: 3, quote: "Close, but no Biryani! Try again!" },
    { minScore: 4, maxScore: 4, quote: "You’re a Samosa short of perfect!" },
    { minScore: 5, maxScore: 5, quote: "Perfect! You’re the Pani Puri quiz champ!"  }
];


let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';
    displayQuestion();
}

function displayQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById('question').textContent = questionData.question;
    for (let i = 0; i < questionData.options.length; i++) {
        document.getElementById(`label-${i}`).textContent = questionData.options[i];
    }
    document.getElementById('prev-button').style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
    resetOptions();
}

function selectAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].correctAnswer;
    if (selectedIndex === correctIndex) {
        score++;
    }
    highlightSelectedOption(selectedIndex);
}

function highlightSelectedOption(selectedIndex) {
    for (let i = 0; i < 4; i++) {
        const optionLabel = document.getElementById(`label-${i}`);
        if (i === selectedIndex) {
            optionLabel.style.backgroundColor = "#d0f4d7"; 
        } else {
            optionLabel.style.backgroundColor = ""; 
        }
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        showResult();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function showResult() {
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('result-page').style.display = 'block';
    document.getElementById('total-score').textContent = score;

   
    const quote = getQuoteForScore(score);
    document.getElementById('quote').textContent = quote; 
}


function getQuoteForScore(score) {
    for (let i = 0; i < quotes.length; i++) {
        if (score >= quotes[i].minScore && score <= quotes[i].maxScore) {
            return quotes[i].quote;
        }
    }
    return "Great job, keep exploring desi food trivia!";
}


function retryQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    document.getElementById('result-page').style.display = 'none';
    document.getElementById('home-page').style.display = 'block';
}

function resetOptions() {
    const optionLabels = document.querySelectorAll("#options span");
    optionLabels.forEach(label => {
        label.style.backgroundColor = "";
    });
    const radioButtons = document.querySelectorAll("input[type='radio']");
    radioButtons.forEach(button => {
        button.checked = false;
    });
}
