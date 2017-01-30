'use strict'



$(document).ready(function() {

	var badFeedback = $('#failed');
	var goodFeedback = $('#passed');
	var lastPage = $('#results-page');
	var resultsBox = $('.results');
	var lrgImage = $('#large-image')
	var coverImage = $('#cover');
	var answersPage = $('#answer-page-wrapper');
	var submitBtn = $('#question-btn');
	var startBtn = $('#begin-btn');
	var answerBtn = $('.answer-btn');
	var restartBtn = $('.retry-btn');
	var firstPage = $('#first-page-contents');
	var questionBox = $('#question-container');
	var goodAnswer = $('#correct-answer-page');
	var badAnswer = $('#wrong-answer-page');
	var pageCirclesQ = $('#feedback-circles-questions');
	var pageCirclesA = $('#feedback-circles-answers')
	var pageIndicatorsQ = pageCirclesQ.find('li');
	var pageIndicatorsA = pageCirclesA.find('li');
	var question = $('.question');
	var options = $('.option-container');
	var option = $('.option');
	var numberCorrect = 0;
    var currentQuestion = 0;
	
	var questions = [{
        title: 'Question #1',
        question: 'Which two Cajun artists are credited to have been the first to record the Cajun standard, "Allons a Lafayette?"',
        choices: ["Dennis Mcgee and Sadie Courville", "Canray Fontenot and Bois Sec Ardoin", "Joe Falcon and Cleoma Breaux", "Dewey and Rodney Balfa"],
        qNum: 1,
        correct: 2,
        answer: 'The first recorded Cajun song, "Allons à Lafayette", was recorded in 1928 by Joe Falcon and Cléoma Breaux.',
        answerImage: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Joeandcleoma.jpg/270px-Joeandcleoma.jpg"
        },
        {
        title: 'Question #2',
        question: 'In which city is fiddler Dennis Mcgee buried?',
        choices: ['Mamou', 'Lafayette', 'Opelousas', 'Eunice'],
        qNum: 2,
        correct: 3,
        answer: "Mr. Dennis Mcgee is buried in Eunice, Louisiana. Us Cajuns We like to visit Mr. Mcgee every Mardi Gras!",
        answerImage: "http://cps-static.rovicorp.com/3/JPG_400/MI0001/391/MI0001391433.jpg?partner=allrovi.com"
        },
        {
        title: 'Question #3',
        question: 'Which Cajun musician wrote the Cajun standard, "Two-step dAmedee"?',
        choices: ['Marc Savoy', 'Wayne Toups', 'Steve Reily', 'Tom Waits'],
        qNum: 3,
        correct: 0,
        answer: 'That was Mr. Marc Savoy who wrote the "Two Step dAmedee". Not only can he write his own Cajun song, but he can build his own Cajun accordion!',
        answerImage: "https://docarts-cms.s3.amazonaws.com/asset/image/image-000291-1372089534_6.jpg"
        },
        {
        title: 'Question #4',
        question: 'What is the difference between a fiddle and a violin?',
        choices: ['A fiddle you can play Cajun music with and a violin you can play Cajun music too.', 'A fiddle is made of wood and a violin is made of hemicellulose', 'A fiddle costs two dollars and a violin costs 3.', "There isn't any difference"],
        qNum: 4,
        correct: 3,
        answer: "There's no difference. It's all in the way you play it and where you play it!",
        answerImage: "http://www.commongroundonthehill.org/i/Instruments/Fiddle.jpg"
        },
        {
        title: "Question #5",
        question: "Last but not least: How many fingers did Cajun accordion player Silson Wavoy have before he started playing the accordion?",
        choices: ["5 fingers", "7 fingers", "8 fingers", "All of the above"],
        qNum: 5,
        correct: 3,
        answer: "Silson had all his fingers. He had not only five, not only 7, but all 8, and two thumbs!",
        answerImage: "https://scontent-dft4-1.xx.fbcdn.net/v/t1.0-0/p480x480/13907014_10154411387066798_2351990156866021624_n.jpg?oh=8967f8cfc2a8e0ff05928a7ce4cc3ca6&oe=5813385F"
    }]


    playAmede();

	startBtn.click(beginQuiz);
	restartBtn.click(restartQuiz);
	
	answersPage.on("click", ".answer-btn", function() {
		answersPage.fadeOut(500, function() {
			goodAnswer.css("display", "none");
			badAnswer.css("display", "none");
			coverImage.fadeIn(500);
		})
		nextQuestion();
		
		
	});

	questionBox.on("click", "#question-btn", function() {
        checkAnswer();
        currentQuestion++;
        
         //everytime btn is clicked, the value of currentQuestion is incremented by 1 and checkAnswer inherits
        
    });

	questionBox.on("click", "label.option", function(event) {
		var click = event.target;
		$(this).toggleClass('font-change');//"this" means the one that is currently being clicked
		console.log("addclass");
	})
	

	function beginQuiz() {
		 var newQuestion = 0;
		firstPage.fadeOut(1000, function() {
			lrgImage.fadeTo("slow", .5);
			questionBox.fadeIn(1000);
			nextQuestion();
				
		});
	}

	function restartQuiz() {
		questionBox.detach();
		questionBox.prependTo('#cover').css('display', 'none');
		
		currentQuestion = 0;
		numberCorrect = 0;
		lastPage.fadeOut(1000, function() {
			
			badFeedback.detach();
			goodFeedback.detach();
			coverImage.prependTo('body').css('display', 'none');
			coverImage.fadeIn(1000);
			//nextQuestion();
			lrgImage.fadeIn(1000, function() {
				//lastPage.detach(function() {
				//	lastPage.appendTo('body').css('display', 'none');
				//});
				firstPage.fadeIn(1000);
				//nextQuestion();
				//$('#audio-1').trigger('pause');
        		$('#audio-3').trigger('pause');
        		$('#audio-4').trigger('pause');
        		playAmede();
			});
		})
	}


    function nextQuestion() {

        //console.log("you are reading question " +questions[currentQuestion].qNum+ " and are inside of nextquestion function");
        if (currentQuestion < questions.length) {
        	var newQuestion = '<h1 class="title">'+questions[currentQuestion].title+'</h1><div class="question">'+questions[currentQuestion].question+'</div><br><div class="option-container"><input type="radio" name="ans" class="option-input" value="0" id="ans-1"/><label class="option" for="ans-1">'+questions[currentQuestion].choices[0]+'</label><br><input type="radio" name="ans" class="option-input" value="1" id="ans-2"><label class="option" for="ans-2">'+questions[currentQuestion].choices[1]+'</label><br><input type="radio" name="ans" class="option-input" value="2" id="ans-3"/><label class="option" for="ans-3">'+questions[currentQuestion].choices[2]+'</label><br><input type="radio" name="ans" class="option-input" value="3" id="ans-4"/><label class="option" for="ans-4">'+questions[currentQuestion].choices[3]+'</label><br></div><div class="btn-container"><input type="button" class="btn" id="question-btn" value="Submit Answer"/>';
        	questionBox.fadeIn(1000).html(newQuestion);
        }

        else {
            results();
        }
    }
    
    function checkAnswer() {
        var answer = $("input[type='radio']:checked").val(); //the checked property will tell you wether the element is selected
        console.log('For this question you chose option '+ answer);
   	

        if (answer == questions[currentQuestion].correct) {
            var correctAnswer = '<section id="correct-answer"><img class="answer-image" src="'+questions[currentQuestion].answerImage+'" height="300" width="300"/><br/><h1>Yea You Right!</h1><br/><p class="answer-container">'+questions[currentQuestion].answer+'</p><br/><div class="btn-container"><input type="button" class="btn answer-btn" id="a-1-btn-right" value="Next Question"/></div></section>';
            //correctAnswer contains radio buttons with label data
            goodAnswer.html(correctAnswer);
            numberCorrect++;
           
            
            console.log("you now have " + numberCorrect + " question(s) correct!")  
            coverImage.fadeOut(500, function() {
            	goodAnswer.css("display", "inline");
            	answersPage.fadeIn(500);
            });
        }
    	

        /*else if (answer == undefined) {
        	alert("Don't be a cooyon and not select anything. It's best to take a guess if not sure.");

        }*/

        else {	
        	var wrongAnswer = '<section id="wrong-answer"><img class="answer-image" src="'+questions[currentQuestion].answerImage+'" height="300" width="300"/><br/><h1>Mais non...</h1><br/><p class="answer-container">'+questions[currentQuestion].answer+'</p><br/><h3>But now you know!</h3><br/><div class="btn-container"><input type="button" class="btn answer-btn" id="a-1-btn-wrong" value="Next Question"/></div><br/></section>';
        	badAnswer.html(wrongAnswer);
        	coverImage.fadeOut(500, function() {
            badAnswer.css("display", "inline")
            answersPage.fadeIn(500);
            });

        }
    }


    function results() {
    	console.log('results!')

    	/*coverImage.fadeOut(1000, function() {

    	})
    	 answersPage.fadeOut(1000, function() {
            lastPage.fadeIn(1000);
        })*/




    	coverImage.detach(); //you can remove an element but detach allows yout o bring it back
        answersPage.fadeOut(1000, function() {
            lastPage.fadeIn(1000);
        })
        if (numberCorrect == 1) {
           	resultsBox.html('<h1>You only scored ' +numberCorrect+ ' out of ' +questions.length+ ". Boy that's no good...</h1>");
           	badFeedback.fadeIn(1000, function() {
           		$('#audio-1').trigger('pause');
        		$('#audio-4').trigger('play');
           	});
        }
        else if (numberCorrect == 2) {
            resultsBox.html('<h1>You only scored ' +numberCorrect+ ' out of ' +questions.length+ ". You know a little, but that's no Cajun!</h1>");
        	badFeedback.fadeIn(1000, function() {
        		$('#audio-1').trigger('pause');
        		$('#audio-4').trigger('play');
           	});
        }
        else if (numberCorrect == 3) {
           	resultsBox.html('<h1>You scored ' +numberCorrect+ ' out of ' +questions.length+ ". Not too, too bad, but you can do better!</h1>");
        	badFeedback.fadeIn(1000, function() {
        		$('#audio-1').trigger('pause');
        		$('#audio-3').trigger('play');
           	});
        }
        else if (numberCorrect == 4) {
            resultsBox.html('<h1>You scored ' +numberCorrect+ ' out of ' +questions.length+ '. "Pas mal du tout!"</h1>');
			goodFeedback.fadeIn(1000, function() {
				$('#audio-1').trigger('pause');
        		$('#audio-3').trigger('play');
           	});        
        }
        else if (numberCorrect == 5) {
            resultsBox.html('<h1>You scored ' +numberCorrect+ ' out of ' +questions.length+ ". That's a perfect score!</h1>");
    		goodFeedback.fadeIn(1000, function() {
    			$('#audio-1').trigger('pause');
        		$('#audio-3').trigger('play');

           	});
    	}
    	else {
    		resultsBox.html('<h1>You scored ' +numberCorrect+ ' out of ' +questions.length+ ". That's terrible!</h1>");
    		badFeedback.fadeIn(1000, function() {
    			$('#audio-1').trigger('pause');
        		$('#audio-4').trigger('play');
        		//playBlind();

           	});
    	}
	}

	function playAmede() {
		$('#audio-1')[0].volume = 0.5;
		$('#audio-1')[0].load();
		$('#audio-1')[0].play();
	}

	function playHappy() {
		$('#audio-3')[0].volume = 0.5;
		$('#audio-3')[0].load();
		$('#audio-3')[0].play();
	}

	function playBlind() {
		$('#audio-4')[0].volume = 0.5;
		$('#audio-4')[0].load();
		$('#audio-4')[0].play();
	}


})


