let currentQuestion = 1;
let score = 0;
let answers = {};

function nextQuestion() {
    const currentForm = document.querySelector(`#question${currentQuestion}`);
    const selectedOption = document.querySelector(`input[name="q${currentQuestion}"]:checked`);

    if (selectedOption) {
        answers[`q${currentQuestion}`] = selectedOption.value;
        if (selectedOption.value === 'a') {
            score += 1;  // Adjust this based on correct answers
        }
    }

    // Move to the next question
    currentQuestion++;
    if (currentQuestion <= 7) {
        document.querySelector(`#question${currentQuestion}`).style.display = 'block';
    } else {
        document.querySelector(`#result`).style.display = 'block';
        document.querySelector(`#finalScore`).innerText = score;
    }
    
    if (currentQuestion > 1) {
        document.querySelector(`#question${currentQuestion - 1}`).style.display = 'none';
    }
}

function showResults() {
    // Save and show results after final question
    document.getElementById('score').innerText = score;
    alert('Você completou a prova! A pontuação parcial foi calculada.');
}

function goBack() {
    // Allows the user to go back and change answers
    if (currentQuestion > 1) {
        currentQuestion--;
        document.querySelector(`#question${currentQuestion}`).style.display = 'block';
    }
}
