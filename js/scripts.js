$(document).ready(function() {
  Game = function() {
    //Rendering
    this.fps = 30;

    //Clock
    this.currentTime = 48;
    this.flavorHour = 7;
    this.flavorMinute = 2;
    this.moments = [];

    //Doomsday Timer
    this.timeRemaining = 192;
    this.countdownInterval = 0;

    //Temperature
    this.roomTemperature = 92;
    this.watchTemperature = 63;
    this.overheatThreshold = 100;
    this.thermostat = this.roomTemperature;
  }

  var timeManager = function(game) {
    if(game.countdownInterval != game.fps) {
      game.countdownInterval += 1;
    } else {
      temperatureManager(game);

      game.countdownInterval = 0;
      game.timeRemaining -= 1;
      game.currentTime += 1;
    }

    //Clock
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

  var temperatureManager = function(game) {
    if(game.watchTemperature < game.roomTemperature) {
      game.watchTemperature += .1;
    } else if (game.watchTemperature > game.roomTemperature){
      game.watchTemperature -= .1;
    }
    game.watchTemperature = parseFloat(game.watchTemperature.toFixed(2));

    $("#roomTemp").text(game.roomTemperature);
    $("#watchTemp").text(game.watchTemperature);
  }

  var generateMoments = function(game) {
    for (i = 0; i <= 240; i++) {
      game.moments.push(i);
    }
  }

  Game.prototype.gameManager = function () {
    timeManager(this);
  };

  Game.prototype.runGame = function () {
    var game = this;
    temperatureManager(this);
    generateMoments(this);
    console.log(game.moments);
    setInterval(function() {game.gameManager();}, 1000/game.fps);
  };

  var game = new Game;
  game.runGame();

  $("#timeJumpSubmit").click(function() {
    var input = parseInt($("#timeJumpInput").val());

    if (game.watchTemperature + input < game.overheatThreshold && input > 0) {
      game.currentTime -= input;
      game.timeRemaining += input;
      game.watchTemperature += input;
      $("#watchTemp").text(game.watchTemperature);
    }
  });
});
