var questions = [
    { 
    question: "1. In the song “Frosty the Snowman,” what made Frosty come to life?",
    answers: [
        "An old silk hat",
        "A fairy spell",
        "A shooting star",
        "The laughter of children",
    ],
    correctAnswer: "An old silk hat",
    },
    
    { 
    question: "2. Miracle on 34th Street” centers on what real-life department store?",
    answers: [
        "Nordstrom's",
        "Macy's",
        "Dillard's",
        "JC Penney",
    ],
    correctAnswer: "Macy's",
    },
    { 
    question: "3. What traditional Christmas decoration is actually a parasitic plant?",
    answers: [
        "Poinsettia",
        "Douglas Fir",
        "Mistletoe",
        "Holly",
    ],
    correctAnswer: "Mistletoe",
    },
    { 
    question: "4. “Twas the Night Before Christmas” was originally published under what name?",
    answers: [
        "A Visit from St. Nicholas",
        "Twas the Dawn Before Christmas",
        "An elf on the roof",
        "Our Christmas story",
    ],
    correctAnswer: "Mistletoe",
    },
    { 
    question: "5. What figure from English folklore came to be associated with Santa Claus?",
    answers: [
        "Jack in the Green",
        "Father Christmas",
        "Robin Goodfello",
        "Tom Thumb",
    ],
    correctAnswer: "Father Christmas",
    },
    { 
    question: "6. According to the folklore of Austria and other countries, what horned figure punishes naughty children at Christmastime?",
    answers: [
        "The Devil",
        "St. Nicholas",
        "Pan",
        "Krampus",
    ],
    correctAnswer: "Krampus",
    },
    { 
    question: "7. In what modern-day country was Saint Nicholas born?",
    answers: [
        "Turkey",
        "Austria",
        "Isreal",
        "Sweeden",
    ],
    correctAnswer: "Turkey",
    },
    { 
    question: "8. What holiday movie sequel includes a cameo by Donald Trump?",
    answers: [
        "Die Hard 2",
        "Christmas Vacation 2",
        "Home Alone 2",
        "Jingle All the Way 2",
    ],
    correctAnswer: "Home Alone 2",
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
    correct = 0;
    incorrect = 0;
    unanswered = 0;
}
  
function startTimer() {
    var counter = 90;

    var interval = setInterval(function() {
    counter--;
    if (counter >= 0) {
      span = document.getElementById("countDown");
      span.innerHTML = counter;
    }
    
    if (counter === 0) {
        clearInterval(counter);
        getScore();
        $(".container--answers").html('');
        $('#startButton').css('visibility','visible');
    }

  }, 1000);

    makeQuestions(questions);
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
    if(questionResult.indexOf("undefined") < 0) {
        clearInterval(interval);
        getScore();
        $(".container--answers").html('');
        $('#startButton').css('visibility','visible');
    }
    });
  
}

$('#startButton').click(function() {
    startTimer();
});
