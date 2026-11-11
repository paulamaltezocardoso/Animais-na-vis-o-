
// PERGUNTAS DO QUIZ

const questions = [
    {
        question: "1. Por que os gatos conseguem enxergar melhor em ambientes com pouca luz?",
        answers: [
            "Porque possuem adaptações nos olhos que aproveitam melhor a luz.",
            "Porque seus olhos produzem luz própria.",
            "Porque enxergam somente durante a noite.",
            "Porque possuem visão ultravioleta."
        ],
        correct: 0,
        explanation: "Os gatos possuem estruturas nos olhos que ajudam a aproveitar a luz disponível."
    },

    {
        question: "2. Quais cores os cachorros conseguem perceber principalmente?",
        answers: [
            "Vermelho e verde.",
            "Azul e amarelo.",
            "Roxo e rosa.",
            "Todas as cores como os humanos."
        ],
        correct: 1,
        explanation: "Os cachorros possuem uma visão dicromática, percebendo principalmente tons de azul e amarelo."
    },

    {
        question: "3. Qual animal possui uma visão muito desenvolvida para identificar objetos a grandes distâncias?",
        answers: [
            "Gato.",
            "Peixe.",
            "Águia.",
            "Camaleão."
        ],
        correct: 2,
        explanation: "As águias possuem uma visão muito aguçada, que permite identificar detalhes a grandes distâncias."
    },

    {
        question: "4. O que torna a visão dos camaleões especial?",
        answers: [
            "Eles enxergam somente em preto e branco.",
            "Conseguem movimentar os olhos independentemente.",
            "Não precisam de luz para enxergar.",
            "Enxergam apenas objetos próximos."
        ],
        correct: 1,
        explanation: "Os camaleões conseguem movimentar seus olhos independentemente, observando diferentes direções."
    },

    {
        question: "5. Algumas aves conseguem perceber qual tipo de luz que os humanos não enxergam?",
        answers: [
            "Luz ultravioleta.",
            "Luz artificial.",
            "Luz vermelha.",
            "Luz das estrelas."
        ],
        correct: 0,
        explanation: "Algumas espécies de aves possuem capacidade de perceber a luz ultravioleta."
    },

    {
        question: "6. Os cachorros enxergam somente em preto e branco?",
        answers: [
            "Sim, não percebem nenhuma cor.",
            "Sim, enxergam apenas tons de cinza.",
            "Não, conseguem perceber principalmente azul e amarelo.",
            "Não, enxergam todas as cores humanas."
        ],
        correct: 2,
        explanation: "Os cachorros conseguem perceber algumas cores, principalmente azul e amarelo."
    },

    {
        question: "7. Por que os olhos dos peixes são diferentes dos olhos de muitos animais terrestres?",
        answers: [
            "Porque são adaptados ao ambiente aquático.",
            "Porque não possuem estruturas para perceber luz.",
            "Porque todos enxergam apenas no escuro.",
            "Porque não conseguem perceber movimentos."
        ],
        correct: 0,
        explanation: "Os olhos dos peixes possuem adaptações para funcionar no ambiente aquático."
    },

    {
        question: "8. Qual afirmação explica melhor as diferenças na visão dos animais?",
        answers: [
            "Todos os animais possuem a mesma visão.",
            "A visão depende apenas do tamanho dos olhos.",
            "Cada espécie possui adaptações relacionadas ao seu ambiente e modo de vida.",
            "Somente os animais que voam conseguem enxergar cores."
        ],
        correct: 2,
        explanation: "As características da visão variam conforme as adaptações e necessidades de cada espécie."
    }
];


// ELEMENTOS DO SITE

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const numberElement = document.getElementById("question-number");
const scoreElement = document.getElementById("score-display");
const progressBar = document.getElementById("progress-bar");
const feedbackElement = document.getElementById("feedback");

const nextButton = document.getElementById("next-button");
const resultElement = document.getElementById("result");

const finalScore = document.getElementById("final-score");
const finalMessage = document.getElementById("final-message");
const restartButton = document.getElementById("restart-button");


// VARIÁVEIS

let currentQuestion = 0;
let score = 0;
let answered = false;


// MOSTRAR PERGUNTA

function showQuestion() {

    answered = false;

    const current = questions[currentQuestion];

    questionElement.textContent = current.question;

    numberElement.textContent =
        `Pergunta ${currentQuestion + 1} de ${questions.length}`;

    scoreElement.textContent = `⭐ ${score} pontos`;

    progressBar.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    feedbackElement.textContent = "";
    feedbackElement.style.color = "";

    nextButton.disabled = true;

    answersElement.innerHTML = "";

    current.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.classList.add("answer-btn");

        button.textContent = answer;

        button.addEventListener("click", () => {
            checkAnswer(index, button);
        });

        answersElement.appendChild(button);

    });

}


// VERIFICAR RESPOSTA

function checkAnswer(selected, selectedButton) {

    if (answered) return;

    answered = true;

    const current = questions[currentQuestion];

    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach(button => {
        button.disabled = true;
    });

    if (selected === current.correct) {

        score++;

        selectedButton.classList.add("correct");

        feedbackElement.textContent =
            "🎉 Muito bem! Você acertou! " + current.explanation;

        feedbackElement.style.color = "#378751";

    } else {

        selectedButton.classList.add("wrong");

        buttons[current.correct].classList.add("correct");

        feedbackElement.textContent =
            "💡 Não foi dessa vez! " + current.explanation;

        feedbackElement.style.color = "#c45c76";

    }

    scoreElement.textContent = `⭐ ${score} pontos`;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    nextButton.disabled = false;

    if (currentQuestion === questions.length - 1) {

        nextButton.textContent = "Ver resultado 🏆";

    } else {

        nextButton.textContent = "Próxima pergunta →";

    }

}


// PRÓXIMA PERGUNTA

nextButton.addEventListener("click", () => {

    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

});


// MOSTRAR RESULTADO

function showResult() {

    questionElement.classList.add("hidden");
    answersElement.classList.add("hidden");
    nextButton.classList.add("hidden");

    numberElement.classList.add("hidden");
    scoreElement.classList.add("hidden");
    feedbackElement.classList.add("hidden");

    resultElement.classList.remove("hidden");

    finalScore.textContent =
        `Você acertou ${score} de ${questions.length} perguntas!`;

    if (score === 8) {

        finalMessage.textContent =
            "🏆 Incrível! Você conhece muito sobre a visão dos animais!";

    } else if (score >= 6) {

        finalMessage.textContent =
            "🌟 Muito bem! Você aprendeu bastante sobre o assunto!";

    } else if (score >= 4) {

        finalMessage.textContent =
            "👏 Bom trabalho! Você já conhece algumas curiosidades!";

    } else {

        finalMessage.textContent =
            "💜 Continue explorando o site! Sempre podemos aprender algo novo!";

    }

}


// REINICIAR QUIZ

restartButton.addEventListener("click", () => {

    currentQuestion = 0;
    score = 0;

    questionElement.classList.remove("hidden");
    answersElement.classList.remove("hidden");
    nextButton.classList.remove("hidden");

    numberElement.classList.remove("hidden");
    scoreElement.classList.remove("hidden");
    feedbackElement.classList.remove("hidden");

    resultElement.classList.add("hidden");

    nextButton.textContent = "Próxima pergunta →";

    showQuestion();

});


// INICIAR

showQuestion();

