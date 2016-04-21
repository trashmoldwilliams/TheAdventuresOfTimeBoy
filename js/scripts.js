$(document).ready(function() {
  Game = function() {
    //Rendering
    this.fps = 30;

    //Clock
    this.currentTime = 48;
    this.flavorHour = 7;
    this.flavorMinute = 2;

    //Doomsday Timer
    this.timeRemaining = 192;
    this.countdownInterval = 0;
  }

  var timer = function(game) {
    if(game.countdownInterval != game.fps) {
      game.countdownInterval += 1;
    } else {
      game.countdownInterval = 0;
      game.timeRemaining -= 1;
      game.currentTime += 1;
    }

    //Clock
    console.log(game.timeRemaining);
    var currentMinute = game.flavorMinute + Math.floor(game.currentTime / 60);
    var currentSecond = game.currentTime - (Math.floor(game.currentTime / 60) * 60);

    $("#currentHour").text(game.flavorHour);
    $("#currentMinute").text("0");
    $("#currentMinute").append(currentMinute);
    if(currentSecond <= 9) {
      $("#currentSecond").text("0");
      $("#currentSecond").append(currentSecond);
    } else {
      $("#currentSecond").text(currentSecond);
    }


    //Doomsday Timer
    var minutesRemaining = Math.floor(game.timeRemaining / 60);
    var secondsRemaining = game.timeRemaining - (minutesRemaining * 60);

    $("#minutesRemaining").text(minutesRemaining);
    if(secondsRemaining <= 9) {
      $("#secondsRemaining").text("0");
      $("#secondsRemaining").append(secondsRemaining);
    } else {
      $("#secondsRemaining").text(secondsRemaining);
    }
  }

  Game.prototype.gameManager = function () {
    timer(this);
  };

  Game.prototype.runGame = function () {
    var game = this;
    setInterval(function() {game.gameManager();}, 1000/game.fps);
  };

  var game = new Game;
  game.runGame();

  $("#timeJumpSubmit").click(function() {
    game.currentTime -= parseInt($("#timeJumpInput").val());
    game.timeRemaining += parseInt($("#timeJumpInput").val());
  });
});
