const questions = [
    {
        text: "Quem foi o responsável pela chegada dos portugueses ao Brasil em 1500?",
        options: ["Pedro Álvares Cabral", "Vasco da Gama", "Cristóvão Colombo", "Américo Vespúcio"],
        answer: 0
    },
    {
        text: "Em qual ano foi proclamada a independência do Brasil?",
        options: ["1808", "1822", "1889", "1891"],
        answer: 1
    },
    {
        text: "Quem foi o primeiro imperador do Brasil?",
        options: ["Dom Pedro I", "Dom Pedro II", "Marechal Deodoro", "Getúlio Vargas"],
        answer: 0
    },
    {
        text: "Qual foi a capital do Brasil antes de Brasília?",
        options: ["Salvador", "Recife", "Belo Horizonte", "Rio de Janeiro"],
        answer: 3
    },
    {
        text: "Em que contexto o Brasil deixou de ser uma monarquia para se tornar uma república?",
        options: ["Guerra do Paraguai", "Proclamação da Independência", "Proclamação da República", "Revolta dos Malês"],
        answer: 2
    },
    {
        text: "Quem liderou o movimento abolicionista que resultou na Lei Áurea?",
        options: ["Dom Pedro II", "Princesa Isabel", "Tiradentes", "Getúlio Vargas"],
        answer: 1
    },
    {
        text: "Qual destes eventos fez parte do período conhecido como Era Vargas?",
        options: ["Criação da Constituição de 1824", "A Revolução Constitucionalista de 1932", "Início do Ciclo do Ouro", "Guerra dos Emboabas"],
        answer: 1
    },
    {
        text: "Explique o papel dos bandeirantes na expansão territorial do Brasil e as consequências para a população indígena.",
        type: "subjective"
    },
    {
        text: "Descreva as principais mudanças políticas e sociais que ocorreram durante o governo de Juscelino Kubitschek, incluindo a construção de Brasília.",
        type: "subjective"
    },
    {
        text: "Analise os principais motivos que levaram ao Golpe Militar de 1964 e suas consequências para a sociedade brasileira.",
        type: "subjective"
    }
];

let currentQuestionIndex = 0;
const responses = {};

function init() {
    document.getElementById("date").value = new Date().toLocaleDateString();
    loadQuestion();
}

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    const questionsDiv = document.getElementById("questions");
    questionsDiv.innerHTML = "";

    const questionText = document.createElement("p");
    questionText.innerText = `${currentQuestionIndex + 1}. ${question.text}`;
    questionsDiv.appendChild(questionText);

    if (question.type === "subjective") {
        const input = document.createElement("textarea");
        input.onchange = () => saveResponse(input.value);
        input.value = responses[currentQuestionIndex] || "";
        questionsDiv.appendChild(input);
    } else {
        question.options.forEach((option, index) => {
            const label = document.createElement("label");
            const input = document.createElement("input");
            input.type = "radio";
            input.name = "option";
            input.value = index;
            input.checked = responses[currentQuestionIndex] === index;
            input.onchange = () => saveResponse(index);

            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            questionsDiv.appendChild(label);
            questionsDiv.appendChild(document.createElement("br"));
        });
    }

    document.querySelector("button[onclick='nextQuestion()']").disabled = false;
    document.querySelector("button[onclick='previousQuestion()']").disabled = currentQuestionIndex === 0;
}

function saveResponse(answer) {
    responses[currentQuestionIndex] = answer;
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
    document.querySelector("button[onclick='finalize()']").disabled = currentQuestionIndex !== questions.length - 1;
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function finalize() {
    const correctAnswers = questions.slice(0, 7).filter((q, i) => responses[i] === q.answer).length;
    const totalScore = correctAnswers;
    alert(`Pontuação: ${totalScore}/7. Respostas subjetivas serão corrigidas após a entrega.`);

    // Implementação da lógica para gerar PDF não incluída aqui
}

window.onload = init;
