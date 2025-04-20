const questions = [
  {
    question: "What does HTML stand for?",
    answers: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "Hyper Text Markup Leveler"],
    correct: 1
  },
  {
    question: "What does CSS do?",
    answers: ["Styles HTML content", "Structures the page", "Creates server-side scripts", "None of the above"],
    correct: 0
  },
  {
    question: "Which one is NOT a JavaScript data type?",
    answers: ["String", "Boolean", "Float", "Object"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionBox = document.getElementById("question");
const answersBox = document.getElementById("answers");
const timerEl = document.getElementById("time");
const resultBox = document.getElementById("result");
const quizBox = document.getElementById("quiz-box");
const scoreEl = document.getElementById("score");

function startQuiz() {
  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  currentQuestion = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  if (currentQuestion >= questions.length) {
    return endQuiz();
  }

  timeLeft = 15;
  timerEl.textContent = timeLeft;
  timer = setInterval(updateTimer, 1000);

  const q = questions[currentQuestion];
  questionBox.textContent = q.question;
  answersBox.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => checkAnswer(index);
    answersBox.appendChild(btn);
  });
}

function updateTimer() {
  timeLeft--;
  timerEl.textContent = timeLeft;
  if (timeLeft === 0) {
    clearInterval(timer);
    nextQuestion(false); // auto mark as wrong
  }
}

function checkAnswer(index) {
  clearInterval(timer);
  const correct = questions[currentQuestion].correct;
  if (index === correct) {
    score++;
    nextQuestion(true);
  } else {
    nextQuestion(false);
  }
}

function nextQuestion(correct) {
  if (correct) {
    alert("Correct!");
  } else {
    alert("Incorrect.");
  }
  currentQuestion++;
  loadQuestion();
}

function endQuiz() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = score;

  // Save high score
  const highScore = localStorage.getItem("highScore") || 0;
  if (score > highScore) {
    localStorage.setItem("highScore", score);
    alert("🎉 New High Score!");
  }
}

startQuiz();
