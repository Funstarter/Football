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
  var homeAttackPower = this.randomize('home');
  var awayAttackPower = this.randomize('away');
  var homeDefencePower = this.randomize('home') * 2;
  var awayDefencePower = this.randomize('away') * 2;

  /* Home Team attack */
  if ( homeAttackPower > awayAttackPower ) {
    console.log('home team attac');

    if ( homeAttackPower > awayDefencePower ) {
      this.scoreGoal('home');
    }
  }

  /* Away Team attack */
  if ( awayAttackPower > homeAttackPower ) {
    console.log('away team attac');
    
    if ( awayAttackPower > homeDefencePower ) {
      this.scoreGoal('away');
    }
  }

}

Game.prototype.scoreGoal = function (side) {
  var index = ( side == 'home' ) ? 0 : 1;
  this.score[index]++;
  this.board.showScore(this.score);
}

Game.prototype.randomize = function (side) {
  var level = ( side == 'home' ) ? ( this.homeTeam.level + this.homeFactor ) : this.awayTeam.level;
  return Math.round( (level * 0.5) + (Math.random() * 100) );
}

