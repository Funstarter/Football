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

        /**
         * @hooked boardModule.render
         */
        pubsub.emit('playGame', game);
        _homeTeam = game.homeTeam;
        _awayTeam = game.awayTeam;
        _play(function () {
            _isPlaying = false;
            Array.from(document.querySelectorAll('[data-game-control-play]'), function (item) {
                item.removeAttribute('disabled');
            });
            /**
             * @hooked boardModule.clearBoard
             */
            pubsub.emit('endGame');
        });
    }

    function _play(callback) {
        var counter = 0;

        _attack();
        /**
         * @hooked boardModule.showTime
         */
        pubsub.emit('showTime', counter++);

        var time = setInterval(function () {
            /**
             * @hooked boardModule.showTime
             */
            pubsub.emit('showTime', counter++);

            /* Attack attempt every 10 times */
            if ((counter % 10) === 0) {
                _attack(counter);
            }

            if (counter > 10) {
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
            /**
             * @hooked boardModule.showSummary
             */
            pubsub.emit('showMessage', 'home team attac');

            if (homeAttackPower > awayDefencePower) {
                /**
                 * @hooked boardModule.showSummary
                 */
                pubsub.emit('showMessage', 'home team score!!!');
                _scoreGoal('home');
            }
        }

        /* Away Team attack */
        if (awayAttackPower > homeAttackPower) {
            /**
             * @hooked boardModule.showSummary
             */
            pubsub.emit('showMessage', 'away team attack');

            if (awayAttackPower > homeDefencePower) {
                /**
                 * @hooked boardModule.showSummary
                 */
                pubsub.emit('showMessage', 'away team score!!!');
                _scoreGoal('away');
            }
        }
    }

    function _scoreGoal(side) {
        var index = ( side === 'home' ) ? 0 : 1;
        _score[index]++;
        /**
         * @hooked boardModule.showScore
         */
        pubsub.emit('scoreGoal', _score);
    }

    function _randomize(side) {
        var level = ( side === 'home' ) ? ( _homeTeam.level + _homeTeamAdvantage ) : _awayTeam.level;
        return Math.round((level * 0.5) + (Math.random() * 100));
    }

})();