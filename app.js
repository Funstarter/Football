var homeTeam = new Team('Arsenal', 60);
var awayTeam = new Team('MC', 90);

var gameBoard = new Board (homeTeam, awayTeam);
var firstGame = new Game(homeTeam, awayTeam);

firstGame.subscribe('scoreGoal', gameBoard.showScore);
firstGame.subscribe('showTime', gameBoard.showTime);
firstGame.play();

console.log(firstGame.subscribers);
