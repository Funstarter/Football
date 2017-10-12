var Game = function (homeTeam, awayTeam) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.homeFactor = 10;
    this.score = [0, 0];
};
makePublisher(Game.prototype);

/**
 * Start play game
 * @param callback
 */
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

/**
 * Team make an attack
 */
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

/**
 * Team score goal while attacking
 * @param side
 */
Game.prototype.scoreGoal = function (side) {
    var index = ( side == 'home' ) ? 0 : 1;
    this.score[index]++;
    this.publish('scoreGoal', this.score);
};

/**
 * Deside which side has to attack
 * @param side
 * @returns {number}
 */
Game.prototype.randomize = function (side) {
    var level = ( side == 'home' ) ? ( this.homeTeam.level + this.homeFactor ) : this.awayTeam.level;
    return Math.round((level * 0.5) + (Math.random() * 100));
};

/**
 * Render game list HTML
 * @param games
 * @param selector
 */
Game.renderGames = function (games, selector) {
    var template = selector.outerHTML;
    var finalHtml = '';

    games.forEach(function(item, index){
        var gameHtml = template.replace(/{(id)}/g, index);
        gameHtml = gameHtml.replace(/{(homeTeam)}/g, item.homeTeam.name);
        gameHtml = gameHtml.replace(/{(awayTeam)}/g, item.awayTeam.name);
        gameHtml = gameHtml.replace(/{(result)}/g, (item.result.length == 0) ? '-:-' : item.result.join(':'));
        if(item.result.length > 0){
            gameHtml = gameHtml.replace(/(data-attr-disabled)/g, 'disabled');
        }
        finalHtml += gameHtml;
    });

    selector.insertAdjacentHTML('beforeBegin', finalHtml);
    selector.parentNode.removeChild(selector);
};