var games = [
  {
    homeTeam: new Team('Arsenal', 60),
    awayTeam: new Team('MC', 90)
  }
];

document.querySelector('[data-game-control]').addEventListener('click', function (e) {
  var gameBoard = new Board (games[0].homeTeam, games[0].awayTeam);
  var game = new Game(games[0].homeTeam, games[0].awayTeam);
  game.subscribe('scoreGoal', gameBoard.showScore);
  game.subscribe('showTime', gameBoard.showTime);
  game.play();
});
