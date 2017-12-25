/**
 * Globals
 *
 * boardModule
 */

var gameModule = (function(){

    /* Properties  */
    var _isPlaying;
    var _homeTeam;
    var _awayTeam;
    var _homeTeamAdvantage = 10;
    var _score = [0, 0];

    /* Events */
    pubsub.on('startGame', startGame);

    function startGame(game) {

        /* Prevent starting new game before current is finished */
        if (_isPlaying === true) {
            return;
        }
        _isPlaying = true;
        _score = [0, 0];
        Array.from(document.querySelectorAll('[data-game-control-play]'), function (item) {
            item.setAttribute('disabled', 'disabled');
        });

        /* Starting new game */
        //TODO Remove modules coupling by Mediator
        boardModule.render(game.homeTeam, game.awayTeam);
        _homeTeam = game.homeTeam;
        _awayTeam = game.awayTeam;

        console.log('playing');

        //var game = new Game(games[gameIndex]);
        /*game.subscribe('scoreGoal', gameBoard.showScore);
        game.subscribe('showTime', gameBoard.showTime);
        game.subscribe('message', gameBoard.showSummary);*/
        _play(function () {
            _isPlaying = false;
            Array.from(document.querySelectorAll('[data-game-control-play]'), function (item) {
                item.removeAttribute('disabled');
            });
            /*game.unsubscribe('scoreGoal', gameBoard.showScore);
            game.unsubscribe('showTime', gameBoard.showTime);
            game.unsubscribe('message', gameBoard.showSummary);*/
            console.log('finish');
        });
    }

    function _play(callback) {
        var counter = 0;

        _attack();
        //this.publish('showTime', counter++);
        console.log(counter++);

        var time = setInterval(function () {
            //this.publish('showTime', counter++);
            console.log(counter++);

            /* Attack attempt every 10 times */
            if ((counter % 10) === 0) {
                _attack(counter);
            }

            if (counter > 90) {
                _attack(counter);
                clearInterval(time);
                callback();
            }

        }, 100);
    }

    function _attack() {
        var homeAttackPower = _randomize('home');
        var awayAttackPower = _randomize('away');
        var homeDefencePower = _randomize('home') * 2;
        var awayDefencePower = _randomize('away') * 2;

        /* Home Team attack */
        if (homeAttackPower > awayAttackPower) {
            //this.publish('message', 'home team attac');
            console.log('home team attack');

            if (homeAttackPower > awayDefencePower) {
                //this.publish('message', 'home team score!!!');
                console.log('home team score!!!');
                _scoreGoal('home');
            }
        }

        /* Away Team attack */
        if (awayAttackPower > homeAttackPower) {
            //this.publish('message', 'away team attac');
            console.log('away team attack');

            if (awayAttackPower > homeDefencePower) {
                //this.publish('message', 'away team score!!!');
                console.log('away team score!!!');
                _scoreGoal('away');
            }
        }
    }

    function _scoreGoal(side) {
        var index = ( side === 'home' ) ? 0 : 1;
        _score[index]++;
        //this.publish('scoreGoal', this.score);
        console.log(_score);
    }

    function _randomize(side) {
        var level = ( side === 'home' ) ? ( _homeTeam.level + _homeTeamAdvantage ) : _awayTeam.level;
        return Math.round((level * 0.5) + (Math.random() * 100));
    }

})();