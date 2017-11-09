var boardModule = {
    element: document.querySelector('#game-board'),
    render: function (homeTeam, awayTeam) {
        this.element.querySelector('#score').innerHTML = '0:0';
        this.element.querySelector('#homeTeamName').innerHTML = homeTeam.name;
        this.element.querySelector('#awayTeam').innerHTML = awayTeam.name;
        this.element.querySelector('#summary').innerHTML = '';
        this.element.querySelector('#timer').innerHTML = '0';
    },
    showScore: function (score) {
        document.querySelector('#score').innerHTML = score.join(':');
    },
    showTime: function (time) {
        document.querySelector('#timer').innerHTML = time;
    },
    showSummary: function (message) {
        document.querySelector('#summary').insertAdjacentHTML('beforeEnd', '<p>' + message + '</p>');
    }
}