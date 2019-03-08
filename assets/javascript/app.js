$(document).ready(function() {
  var trivia = [
    { Q: "Principia Mathematic is a formally complete system.", A: false },
    {
      Q:
        "Formal incompleteness means that a system of true or false statements must have some undecidable value.",
      A: true
    },
    {
      Q:
        "The writer of these questions clearly knows about what he is talking.",
      A: false
    },
    {
      Q:
        "'Yields falsehood when proceeded by it's quotation' yields falsehood when proceeded by it's quotation.",
      A: true
    },
    {
      Q:
        "Epimenides proposed the paradox wherein you cannot believe some guy who says 'I am always lying.'",
      A: true
    }
  ];
  // create start button
  var start = $("<button>");
  start.addClass("start");
  start.text("PRESS START");
  $(".game").append(start);
  // sets the countdown
  var time = 121;
  // runs when start is clicked
  function startIt() {
    console.log("click");

    $(".game").empty();
    for (i = 0; i < trivia.length; i++) {
      //   append question [i] to game
      var questions = $("<p>");
      questions.text(trivia[i].Q);
      $(".game").append(questions);
      //append answer form [i] to game
      var answers = $("<form>");
      var Qid = "id" + i;
      answers.attr("id", Qid);
      var nameT = "true" + i;
      //perhaps this could functified for dryness, but it works...
      answers.append(
        $("<input type='radio'>")
          .attr("name", Qid)
          .attr("id", nameT)
      );
      answers.append(
        $("<label>")
          .attr("for", nameT)
          .text("True")
      );
      var nameF = "false" + i;
      answers.append(
        $("<input type='radio'>")
          .attr("name", Qid)
          .attr("id", nameF)
      );
      answers.append(
        $("<label>")
          .attr("for", nameF)
          .text("False")
      );
      $(".game").append(answers);
    }
    //at end of question list create submit button
    var submitIt = $("<button class='submit'>").text("Submit");
    $(".game").append(submitIt);
    // starts the final countdown
    countDown = setInterval(clock, 1000);
  }
  // this function runs the clock
  function clock() {
    time--;
    console.log(time);

    var dispTime = minsec(time);
    $(".time").text(dispTime);
    if (time == 0) {
      timesUp();
    }
  }
  // this function makes the countdown legible
  function minsec(para) {
    var min = Math.floor(para / 60);
    var sec = para - min * 60;
    if (sec < 10) {
      sec = "0" + sec;
    }
    return `${min}:${sec}`;
  }
  // this function runs the game ending when time runs out
  var late = false;
  function timesUp() {
    $(".time").text("You ran out of time");
    clearInterval(countDown);
    late = true;
    gradeIt();
  }
  // this solution to making sure the radio buttons are checked is gratefully inspired by:
  // https://stackoverflow.com/questions/2072249/using-jquery-to-check-if-no-radio-button-in-a-group-has-been-checked
  function completed(param) {
    var bool = $(`input:radio[name=${param}]`).is(":checked");
    return bool;
  }

  function gradeIt() {
    // stops the clock
    clearInterval(countDown);
    // get the player values from the radio buttons, slicing off the last digit
    var playerA = [];
    for (i = 0; i < trivia.length; i++) {
      var Qid = "id" + i;
      var Aid;
      if (!completed(Qid) && !late) {
        $(".game").prepend("<h4>Finish the game!</h4>");
        countDown = setInterval(clock, 1000);
        return;
      } else if (!completed(Qid)) {
        Aid = `blank${i}`;
      } else {
        Aid = $("input:radio:checked")[i].id;
      }
      playerA.push(Aid.slice(0, -1));
    }
    // get the answer values from the trivia array
    var triviaA = [];
    for (i = 0; i < trivia.length; i++) {
      var qA = trivia[i].A;
      triviaA.push(qA.toString());
    }
    console.log(triviaA);
    console.log(playerA);
    // now we compare the arrays to find if each element matches, and display it
    $(".game").empty();
    var rights = 0;
    var wrongs = 0;
    for (i = 0; i < trivia.length; i++) {
      if (playerA[i] === triviaA[i]) {
        $(".game").append($("<p>").text(`Answer number  ${i + 1} was right.`));
        rights++;
      } else {
        $(".game").append($("<p>").text(`Answer number  ${i + 1} was wrong.`));
        wrongs++;
      }
    }
    // lately we discovered we prefer template literals
    var rightsCount = `You got ${rights} questions right!`;
    var wrongsCount = `You got ${wrongs} questions wrong!`;
    $(".game").append(`<br><p>${rightsCount}</p><p>${wrongsCount}</p>`);
  }

  //   handle button clicks- start doesn't need document prefix because it is generated on load, rather than later
  //  this way we logically order our game to call the functions defined above
  $(".start").on("click", startIt);
  $(document).on("click", ".submit", gradeIt);
  //   function() {
  //   if(completed()) all questions are answered
  // });
});
