var Board = function (homeTeam, awayTeam) {
    this.board = document.querySelector('#game-board');
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.render();
};

Board.prototype.render = function () {
    this.board.querySelector('#score').innerHTML = '0:0';
    this.board.querySelector('#homeTeamName').innerHTML = this.homeTeam.name;
    this.board.querySelector('#awayTeam').innerHTML = this.awayTeam.name;
    this.board.querySelector('#summary').innerHTML = '';
    this.board.querySelector('#timer').innerHTML = '0';
};

Board.prototype.showScore = function (score) {
    document.querySelector('#score').innerHTML = score.join(':');
};

Board.prototype.showTime = function (time) {
    document.querySelector('#timer').innerHTML = time;
};

Board.prototype.showSummary = function (message) {
    document.querySelector('#summary').insertAdjacentHTML('beforeEnd', '<p>' + message + '</p>');
};