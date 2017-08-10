var Game = function (homeTeam, awayTeam) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.homeFactor = 10;
    this.score = [0, 0];
};
makePublisher(Game.prototype);

Game.prototype.play = function (callback) {

    var counter = 0;

    this.attack();
    this.publish('showTime', counter++);

    var time = setInterval(function () {
        this.publish('showTime', counter++);

        if ((counter % 10) == 0) {
            this.attack(counter);
        }

        if (counter > 90) {
            this.attack(counter);
            clearInterval(time);
            callback();
        }

    }.bind(this), 100);

};

Game.prototype.attack = function () {
    var homeAttackPower = this.randomize('home');
    var awayAttackPower = this.randomize('away');
    var homeDefencePower = this.randomize('home') * 2;
    var awayDefencePower = this.randomize('away') * 2;

    /* Home Team attack */
    if (homeAttackPower > awayAttackPower) {
        this.publish('message', 'home team attac');

        if (homeAttackPower > awayDefencePower) {
            this.publish('message', 'home team score!!!');
            this.scoreGoal('home');
        }
    }

    /* Away Team attack */
    if (awayAttackPower > homeAttackPower) {
        this.publish('message', 'away team attac');

        if (awayAttackPower > homeDefencePower) {
            this.publish('message', 'away team score!!!');
            this.scoreGoal('away');
        }
    }

};

Game.prototype.scoreGoal = function (side) {
    var index = ( side == 'home' ) ? 0 : 1;
    this.score[index]++;
    this.publish('scoreGoal', this.score);
};

Game.prototype.randomize = function (side) {
    var level = ( side == 'home' ) ? ( this.homeTeam.level + this.homeFactor ) : this.awayTeam.level;
    return Math.round((level * 0.5) + (Math.random() * 100));
};

