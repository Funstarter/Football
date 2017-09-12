var isPlaying;

document.addEventListener('click', function (e) {

    /* Delegate handler. If element not found finish handling */
    if (!helpers.delegate('data-game-control', e)) {
        return;
    }

    /* Prevent starting new game before current is finished */
    if (isPlaying === true) {
        return;
    }
    isPlaying = true;
    Array.prototype.forEach.call(document.querySelectorAll('[data-game-control]'), function (item) {
        item.setAttribute('disabled', 'disabled');
    });

    /* Get Game id */
    var gameId;
    var control = e.target;
    while (control !== e.currentTarget) {
        if (control.hasAttribute('data-game')) {
            gameId = parseInt(control.getAttribute('data-game'));
            break;
        }
        control = control.parentNode;
    }

    /* Starting new game */
    var gameBoard = new Board(games[gameId].homeTeam, games[gameId].awayTeam);
    var game = new Game(games[gameId].homeTeam, games[gameId].awayTeam);
    game.subscribe('scoreGoal', gameBoard.showScore);
    game.subscribe('showTime', gameBoard.showTime);
    game.subscribe('message', gameBoard.showSummary);
    game.play(function () {
        isPlaying = false;
        Array.prototype.forEach.call(document.querySelectorAll('[data-game-control]'), function (item) {
            item.removeAttribute('disabled');
        });
        game.unsubscribe('scoreGoal', gameBoard.showScore);
        game.unsubscribe('showTime', gameBoard.showTime);
        game.unsubscribe('message', gameBoard.showSummary);
        console.log('finish');
    });

});
