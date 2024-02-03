console.log(questions);

let question = document.querySelector(".question h3");
let questionAnswer = document.querySelector(".answer");
let nextBtn = document.querySelector(".next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuestion() {
  currentQuestionIndex = 0;
  score = 0;

  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQustion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  question.innerText = questionNo + ". " + currentQustion.question;

  currentQustion.answer.forEach((ans) => {
    let button = document.createElement("button");
    button.innerText = ans.text;
    button.classList.add("btn");

    questionAnswer.appendChild(button);

    if (ans.correct) {
      button.dataset.correct = ans.correct;
    }
    button.addEventListener("click", seletAnswer);
  });
}

function resetState() {
  nextBtn.style.display = "none";

  while (questionAnswer.firstChild) {
    questionAnswer.removeChild(questionAnswer.firstChild);
  }
}

function seletAnswer(e) {
  let selectBtn = e.target;
  let isCorrect = selectBtn.dataset.correct === "true";

  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }

  Array.from(questionAnswer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextBtn.style.display = "block";
}

function showScore() {
  resetState();
  question.innerText = `your scored ${score} out of ${questions.length}`;
  nextBtn.innerText = "try again";
  nextBtn.style.display = "block";
}

function handelNextBtn() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handelNextBtn();
  } else {
    startQuestion();
  }
});

startQuestion();
