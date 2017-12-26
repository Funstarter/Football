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
        pubsub.on('endGame', this.clearBoard.bind(this));
    },
    render: function (game) {
        this.element.querySelector('#score').innerHTML = '0:0';
        this.element.querySelector('#homeTeamName').innerHTML = game.homeTeam.name;
        this.element.querySelector('#awayTeam').innerHTML = game.awayTeam.name;
        this.element.querySelector('#summary').innerHTML = '';
        this.element.querySelector('#timer').innerHTML = '0';
    },
    showScore: function (score) {
        this.element.querySelector('#score').innerHTML = score.join(':');
    },
    showTime: function (time) {
        this.element.querySelector('#timer').innerHTML = time;
    },
    showSummary: function (message) {
        this.element.querySelector('#summary').insertAdjacentHTML('beforeEnd', '<p>' + message + '</p>');
    },
    clearBoard: function () {
        console.log('finish');
        pubsub.off('playGame', this.render.bind(this));
        pubsub.off('showTime', this.showTime.bind(this));
        pubsub.off('showMessage', this.showSummary.bind(this));
        pubsub.off('scoreGoal', this.showScore.bind(this));
    }
};
boardModule.init();