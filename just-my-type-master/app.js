$(document).ready(function () {
  let sentences = [
    "ten ate neite ate nee enet ite ate inet ent eate",
    "Too ato too nOt enot one totA not anot tOO aNot",
    "oat itain oat tain nate eate tea anne inant nean",
    "itant eate anot eat nato inate eat anot tain eat",
    "nee ene ate ite tent tiet ent ine ene ete ene ate",
  ];
  let start;
  let finish;
  let letterNum = 0;
  let sentenceNum = 0;
  let mistakes = 0;
  let currentSentence = sentences[0];
  let currentLetter = currentSentence[0];

  let currentLetterDiv = $("#target-letter");
  currentLetterDiv.text(currentLetter);

  $("#target-letter").text(currentLetter);
  $("#sentence").text(currentSentence);

  $("#keyboard-upper-container").hide();

  $(document).keydown(function (e) {
    if (e.which === 16) {
      $("#keyboard-lower-container").hide();
      $("#keyboard-upper-container").show();
    }
  });

  $(document).keyup(function (e) {
    if (e.which === 16) {
      $("#keyboard-upper-container").hide();
      $("#keyboard-lower-container").show();
    }
  });

  $(document).on("keypress", function (e) {
    let k = e.which;
    $("#" + k).toggleClass("key-press");
    setTimeout(function () {
      $("#" + k).toggleClass("key-press");
    }, 100);
    let currentSentence = sentences[sentenceNum];
    let currentLetter = currentSentence[letterNum];
    if (start == undefined) {
      start = e.timeStamp;
    }
    $("#yellow-block").css("left", "+=17.5px");
    letterNum++;
    let nextLetter = currentSentence[letterNum];
    currentLetterDiv.text(nextLetter);
    if (letterNum < currentSentence.length - 1) {
      if (e.which === currentLetter.charCodeAt()) {
        $("#feedback").append('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
      } else {
        $("#feedback").append('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>');
        mistakes++;
      }
    }
    if (letterNum == currentSentence.length) {
      $("#sentence").empty();
      sentenceNum++;
      currentSentence = sentences[sentenceNum];
      $("#sentence").append(sentences[sentenceNum]);
      letterNum = 0;
      if (sentenceNum < sentences.length - 1) {
        nextLetter = currentSentence[letterNum];
      }
      currentLetterDiv.text(nextLetter);
      $("#yellow-block").css({ left: 17 });
      $("#feedback").empty();
    }
    if (sentenceNum > sentences.length - 1) {
      finish = e.timeStamp;
      var time = finish - start;
      time /= 60000;
      var wpm = Math.round(54 / time - 2 * mistakes);
      $("#target-letter").text("Game Over! You had " + wpm + " words per minute.");
      setTimeout(function () {
        var replay = confirm("Play Again?");
        if (replay == true) {
          window.location.reload();
        } else {
          return;
        }
      }, 4000);
    }
  });
});
