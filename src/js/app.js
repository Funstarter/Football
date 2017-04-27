var games = [
  {
    homeTeam: new Team('Arsenal', 60),
    awayTeam: new Team('MC', 90)
  }
];

var teams = [
  {
    'name': 'Arsenal',
    'power': 60
  },
  {
    'name': 'MC',
    'power': 90
  },
  {
    'name': 'Chelsea',
    'power': 80
  },
  {
    'name': 'MU',
    'power': 85
  }
]

document.querySelector('[data-table]').addEventListener('click', function (e) {

  /* Delegate handler */
  var control = e.target;
  while (!control.hasAttribute('data-game-control')) {
    control = control.parentNode;
  }

  console.log(control);

  /*var gameBoard = new Board (games[0].homeTeam, games[0].awayTeam);
  var game = new Game(games[0].homeTeam, games[0].awayTeam);
  game.subscribe('scoreGoal', gameBoard.showScore);
  game.subscribe('showTime', gameBoard.showTime);
  game.subscribe('message', gameBoard.showSummary);
  game.play();*/
});
