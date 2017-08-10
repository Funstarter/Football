var games = [
    {
        homeTeam: new Team('Arsenal', 60),
        awayTeam: new Team('MC', 90)
    },
    {
        homeTeam: new Team('Chelsea', 75),
        awayTeam: new Team('MU', 80)
    }
];

var isPlaying;

document.querySelector('[data-table]').addEventListener('click', function (e) {

    /* Delegate handler. If element not found finish handling */
    if(!helpers.delegate('data-game-control', e)) {
        return;
    }

    if(isPlaying === true) {
        return;
    }

    /* Prevent starting new game before current is finished */
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

    var gameBoard = new Board(games[gameId].homeTeam, games[gameId].awayTeam);
    var game = new Game(games[gameId].homeTeam, games[gameId].awayTeam);
    game.subscribe('scoreGoal', gameBoard.showScore);
    game.subscribe('showTime', gameBoard.showTime);
    game.subscribe('message', gameBoard.showSummary);
    game.play(function () {
        isPlaying = false;
        Array.prototype.forEach.call(document.querySelectorAll('[data-game-control]'), function (item) {
            item.setAttribute('disabled', 'disabled');
        });
        console.log('finish');
    });
});
