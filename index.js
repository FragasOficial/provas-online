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

function checkPassword() {
    const passwordInput = document.getElementById("passwordInput").value;

    if (passwordInput === "908070") {
        document.getElementById("passwordModal").style.display = "none";
        document.getElementById("examContainer").style.display = "block";
        init();
    } else {
        const errorMessage = document.getElementById("errorMessage");
        errorMessage.style.display = "block";
        document.getElementById("passwordInput").value = "";
        document.getElementById("passwordInput").focus();
    }
}

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
            input.name = `q${currentQuestionIndex}`;
            input.value = index;
            input.onclick = () => saveResponse(index);
            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            questionsDiv.appendChild(label);
        });
    }

    updateButtons();
}

function saveResponse(value) {
    responses[currentQuestionIndex] = value;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    }
    updateButtons();
}

function previousQuestion() {
    currentQuestionIndex--;
    if (currentQuestionIndex >= 0) {
        loadQuestion();
    }
    updateButtons();
}

function updateButtons() {
    const finalizeButton = document.querySelector(".controls button:last-child");
    finalizeButton.disabled = !Object.keys(responses).length || Object.values(responses).some(response => response === undefined || response === "");
}

function finalize() {
    const confirmation = confirm("Você tem certeza de que quer finalizar a prova?");
    if (confirmation) {
        const grade = calculateGrade();
        alert(`Prova finalizada. Sua nota é: ${grade}`);
        generatePDF(grade);
    }
}

function calculateGrade() {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
        if (question.type !== "subjective") {
            const answerIndex = responses[index];
            if (answerIndex === question.answer) {
                correctAnswers++;
            }
        }
    });
    return (correctAnswers / questions.length) * 10; // Nota de 0 a 10
}

function generatePDF(grade) {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();
    const margin = 10;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const x = margin;
    const y = margin;

    doc.setFontSize(14);
    doc.text(`Prova de História do Brasil`, x, y);
    doc.setFontSize(12);
    doc.text(`Nome do Aluno: ${document.getElementById("studentName").value}`, x, y + 10);
    doc.text(`Escola: ${document.getElementById("schoolName").value}`, x, y + 20);
    doc.text(`Data: ${document.getElementById("date").value}`, x, y + 30);
    doc.text(`Professor(a): ${document.getElementById("teacherName").value}`, x, y + 40);
    doc.text(`Nota: ${grade.toFixed(2)}`, x, y + 50);
    
    // Adicionar perguntas e respostas
    let position = y + 60;
    questions.forEach((question, index) => {
        doc.setFontSize(12);
        doc.text(`${index + 1}. ${question.text}`, x, position);
        position += 10;
        if (question.type !== "subjective") {
            const answerIndex = responses[index];
            const answer = question.options[answerIndex] || "Não respondida";
            doc.text(`Resposta: ${answer}`, x, position);
        } else {
            const answer = responses[index] || "Não respondida";
            doc.text(`Resposta: ${answer}`, x, position);
        }
        position += 20;
    });

    // Gerar o PDF e fazer o download
    doc.save('prova_historia_brasil.pdf');
}
