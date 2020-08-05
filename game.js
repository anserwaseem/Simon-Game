//Possible colora of buttons.
var buttonColours = ["red", "blue", "green", "yellow"];

//An array to store user's color sequence.
var userClickedPattern = [];

//An array to store sequence of colors generated randomly for each level.
var gamePattern = [];

//Initially, level is 0 and game is not started yet.
var level = 0,
  started = false;

//Check if user pressed any key.
$(document).keydown(function () {
  //If the game isn't already started, start the game.
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Check if any of the 4 buttons got clicked by user.
$(".btn").click(function () {
  //Store the "id" of the button that got clicked.
  var userChosenColour = $(this).attr("id");

  //Add the color that was clicked by user in array (userClickedPattern).
  userClickedPattern.push(userChosenColour);

  //Make a sound of the button that was clicked by user.
  makeSound(userChosenColour);

  //Animate the pressed button.
  animatePress(userChosenColour);

  //Send the user's last chosen color as a paramter to checkAnswer function.
  checkAnswer(userClickedPattern.length - 1);
});

//A function which'll be called on every new level to generate a new sequence of colors.
function nextSequence() {
  //Reset userClickedPattern array for the new sequence.
  userClickedPattern = [];

  //Increase the level of the user, and change h1's text to display it on web page.
  level++;
  $("#level-title").text("Level " + level);

  //Create a random number between 0 and 3, then choose a color from buttonColours array, and push it in gamePattern array.
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //Animate a flash to the button selected using jQuery.
  $("#" + randomChosenColour)
    .stop(1)
    .fadeOut(100)
    .fadeIn(100);

  //Make a sound of the button that was clicked by user.
  makeSound(randomChosenColour);
}

//A function to play a sound according to the key in parameter.
function makeSound(key) {
  var audio = new Audio("sounds/" + key + ".mp3");
  audio.play();
}

//A function to animate the current color
function animatePress(currentColour) {
  //Add a class "pressed" using jQuery, then remove this class after 100-miliseconds.
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//A function to compare the user's sequence of colors (answer) to the game's sequence of colors (original sequence).
function checkAnswer(currentLevel) {
  //If user's color sequence (answer) is equal to the original sequence, then
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //Check if the whole sequence is compared, then
    if (gamePattern.length == userClickedPattern.length) {
      //Add a delay of 1000-miliseconds to the next sequence.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }

  //else, let the user know that he/she was wrong by playing a sound and displaying on web page using jQuery. Now, restart the game.
  else {
    console.log("wrong");
    makeSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

//A function to restart the game.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}