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

document.querySelector('[data-table]').addEventListener('click', function (e) {

  /* Delegate handler */
  var control = e.target;
  while (!control.hasAttribute('data-game')) {
    control = control.parentNode;
  }
  var game = parseInt(control.getAttribute('data-game'));

  var gameBoard = new Board (games[game].homeTeam, games[game].awayTeam);
  var game = new Game(games[game].homeTeam, games[game].awayTeam);
  game.subscribe('scoreGoal', gameBoard.showScore);
  game.subscribe('showTime', gameBoard.showTime);
  game.subscribe('message', gameBoard.showSummary);
  game.play();
});
