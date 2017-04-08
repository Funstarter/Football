'use strict';

var Game = function (homeTeam, awayTeam) {
  this.homeTeam = homeTeam;
  this.awayTeam = awayTeam;
  this.board = new Board(homeTeam, awayTeam);
  this.board.render();
  this.time = 10;
  this.homeFactor = 10;

  this.score = [0, 0];
}

Game.prototype.play = function () {

  var counter = 0;
  var msTime = null;

  this.attack();
  this.board.showTime(counter++);

  var time = setInterval(function () {
    this.board.showTime(counter++);

    if( (counter % 10) == 0) {
      this.attack();
    }

    if (counter > 90) {
      this.attack();
      clearInterval(time);
    }

  }.bind(this), 100);

}

Game.prototype.attack = function () {
  var homeAttackPower = Game.randomize(this.homeTeam.level + this.homeFactor);
  var awayAttackPower = Game.randomize(this.awayTeam.level);

  /* Home Team attack */
  if ( homeAttackPower > awayAttackPower) {    
    if( homeAttackPower > Game.randomize(this.awayTeam.level, 2) ){
      this.scoreGoal(0);
    }
  }

  /* Away Team attack */
  if (homeAttackPower < awayAttackPower) {    
    if( awayAttackPower > Game.randomize(this.homeTeam.level + this.homeFactor, 2) ){
      this.scoreGoal(1);
    }
  }

}

Game.prototype.scoreGoal = function (side) {
  this.score[side]++;
  this.board.showScore(this.score);
}

Game.randomize = function (level, factor) {
  factor = factor || 1;
  return Math.round( (level * 0.5) + (Math.random() * 100) ) * factor;
}

