  let currentQuestionIndex = 0;
    let userAnswers = [];
    const questions = [
      { question: "Do you think VR can help reduce stress for school-related pressures?", valueYes: 1, valueNo: 0 },
      { question: "Do you believe VR allows safe exploration of emotions?", valueYes: 1, valueNo: 0 },
      { question: "Could VR allow guidance counselors to practice coping strategies interactively?", valueYes: 1, valueNo: 0 },
      { question: "Is VR a practical engagement tool for mental health support?", valueYes: 1, valueNo: 0 },
      { question: "Would you consider using VR to manage emotional challenges?", valueYes: 1, valueNo: 0 }
    ];

    function loadQuestion() {
      const questionElement = document.getElementById('question');
      questionElement.innerText = questions[currentQuestionIndex].question;
    }

    function answerQuestion(answer) {
      const value = answer === 'yes' ? questions[currentQuestionIndex].valueYes : questions[currentQuestionIndex].valueNo;
      userAnswers.push(value);

      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
      } else {
        document.getElementById("submit-btn").style.display = 'block';
      }
    }

    function submitTest() {
      const totalScore = userAnswers.reduce((sum, val) => sum + val, 0);
      const percentageScore = Math.round((totalScore / questions.length) * 100);
      displayChart(percentageScore);
      generateFeedback(percentageScore);
    }

    function displayChart(percentageScore) {
      const ctx = document.getElementById('resultChart').getContext('2d');
      document.getElementById('resultChart').style.display = 'block';

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Mental Well-being'],
          datasets: [{
            label: `${percentageScore}%`,
            data: [percentageScore],
            backgroundColor: '#6a11cb',
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
            }
          }
        }
      });
    }

    function generateFeedback(percentageScore) {
      const feedbackText = document.getElementById('feedback-text');
      if (percentageScore < 50) {
        feedbackText.innerText = "You might benefit from exploring innovative strategies like VR to strengthen emotional resilience.";
      } else if (percentageScore >= 50 && percentageScore < 80) {
        feedbackText.innerText = "You're open to exploring VR as a powerful emotional well-being tool.";
      } else {
        feedbackText.innerText = "You’re ready to embrace VR as a transformative tool for emotional exploration and mental clarity!";
      }

      document.getElementById('feedback-section').style.display = 'block';
    }

    document.addEventListener("DOMContentLoaded", () => {
      loadQuestion();
    });