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
      //perhaps this could be dryier, but it works...
      answers.append(
        $("<input type='radio'>")
          .attr("name", Qid)
          .attr("id", nameT)
          .attr("data-bool", true)
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
          .attr("data-bool", false)
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
  }
  function gradeIt() {
    // need to get value of radio buttons selected to compare to the A: key
    console.log($("input:radio:checked").id);
  }
  //   handle button clicks- start doesn't need document prefix because it is generated on load, rather than later
  $(".start").on("click", startIt);
  $(document).on("click", ".submit", gradeIt);
});
