var boardModule = {
    init: function() {
        this.events();
    },
    element: document.querySelector('#game-board'),
    events: function () {
        pubsub.on('playGame', this.render.bind(this));
        pubsub.on('showTime', this.showTime.bind(this));
        pubsub.on('showMessage', this.showSummary.bind(this));
        pubsub.on('scoreGoal', this.showScore.bind(this));
    },
    render: function (game) {
        this.element.querySelector('#score').innerHTML = '0:0';
        this.element.querySelector('#homeTeamName').innerHTML = game.homeTeam.name;
        this.element.querySelector('#awayTeam').innerHTML = game.awayTeam.name;
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
};
boardModule.init();