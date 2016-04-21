$(document).ready(function() {
  Game = function() {
    this.timeRemaining = 300;
    this.fps = 30;
    this.countdownInterval = 0;
  }

  var timer = function(game) {
    if(game.countdownInterval != game.fps) {
      game.countdownInterval += 1;
    } else {
      game.countdownInterval = 0;
      game.timeRemaining -= 1;
    }
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
});
