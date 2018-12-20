var questions = [
    { 
    question: "1. Question1?",
    answers: [
        "answer1a",
        "answer2a",
        "answer3a",
        "answer4a",
    ],
    correctAnswer: "answer1a"
    },
    { 
    question: "2. Question2?",
    answers: [
        "answer1b",
        "answer2b",
        "answer3b",
        "answer4b",
    ],
    correctAnswer: "answer2b"
    },
    { 
    question: "3. Question3?",
    answers: [
        "answer1c",
        "answer2c",
        "answer3c",
        "answer4c",
    ],
    correctAnswer: "answer3c"
    }
  ];

var questionResult = [];
var correct = 0;
var incorrect = 0;
var unanswered = 0;

function makeQuestions($items) {
    questionResult = [];
    var questionOutput = '';
    $.each( $items, function( key, value ) {
        var i = 1;
        questionOutput += '<h2>' + value.question + '</h2>';
        $.each(value.answers, function (keyA, valueA) {
            questionOutput += '<div class="question" id="' + key + 'question"><div class="custom-control custom-radio custom-control-inline">'
            questionOutput += '<input type="radio" value="' + valueA + '" id="' + key + 'customRadioInline' + i + '" name="' + key + 'customRadioInline1" class="custom-control-input">'
            questionOutput += '<label class="custom-control-label" for="' + key + 'customRadioInline' + i + '">' + valueA + '</label></div></div>'
            i++;
        });
        questionResult.push('undefined');
    });
    $(".container--answers").html(questionOutput);
}

function getScore() {
    $.each(questionResult, function(keyQ, valueQ) {
        if (valueQ == 'correct') {
            correct++;
        } else if (valueQ == 'incorrect') {
            incorrect++;
        } else {
            unanswered++;
        }

    });
    $('.results').html('Correct: ' + correct + '<br />' + 'Incorrect: ' + incorrect + '<br />' + 'Unanswered: ' + unanswered);
}
  
function startTimer() {
    makeQuestions(questions);

    correct = 0;
    incorrect = 0;
    unanswered = 0;

    $('.results').html('');

    $('#startButton').css('visibility','hidden');
    $('#startButton').val('Restart!');

    $(".question input[type='radio']").click(function(){
        var radioValue = $(this).val();
    
        var questionId = $(this).closest(".question").attr('id');
        console.log('Question Id: ' + questionId);
        var questionKey = questionId.replace('question', '');
        console.log('Question Key: ' + questionKey);
        if(questions[questionKey].correctAnswer.includes(radioValue) == true) {
            questionResult[questionKey] = 'correct';
        } else {
            questionResult[questionKey] = 'incorrect';
        }
        console.log(questionResult);
    });

    var counter = 5;

    setInterval(function() {
    counter--;
    if (counter >= 0) {
      span = document.getElementById("countDown");
      span.innerHTML = counter;
    }
    // Display 'counter' wherever you want to display it.
    if (counter === 0) {
        clearInterval(counter);
        getScore();
        $(".container--answers").html('');
        $('#startButton').css('visibility','visible');
    }

  }, 1000);
}

$('#startButton').click(function() {
    startTimer();
});
