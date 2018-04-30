/**
 * Globals
 *
 * teams
 */

var teamModule = {
    init: function () {
        this.events();
    },
    events: function () {
        pubsub.on('endGame', this.addWin.bind(this))
    },
    getTeam: function (id) {
        return teams.find(function (item) {
            return item.id === id;
        });
    },
    addWin: function (game) {
        var winner = this.getWinner(game);

        if (!winner) {
            return;
        }

        var winnerIndex = teams.findIndex(function (team) {
            return winner.id === team.id;
        });

        if (teams[winnerIndex] !== -1) {
            teams[winnerIndex].stats.wins++;
            pubsub.emit('changeTeamsStats')
        }
    },
    getWinner: function (game) {
        if (game.result[0] > game.result[1]) {
            return game.homeTeam;
        } else if (game.result[0] < game.result[1]) {
            return game.awayTeam;
        } else {
            return null;
        }
    }
};
teamModule.init();