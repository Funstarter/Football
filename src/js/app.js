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
  var gameId = parseInt(control.getAttribute('data-game'));

  var gameBoard = new Board (games[gameId].homeTeam, games[gameId].awayTeam);
  var game = new Game(games[gameId].homeTeam, games[gameId].awayTeam);
  game.subscribe('scoreGoal', gameBoard.showScore);
  game.subscribe('showTime', gameBoard.showTime);
  game.subscribe('message', gameBoard.showSummary);
  game.play();
});
