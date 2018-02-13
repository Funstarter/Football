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
        pubsub.on('endGame', this.addWin)
    },
    getTeam: function (id) {
        return teams.find(function (item) {
            return item.id === id;
        });
    },
    addWin: function (game) {
        var winner;

        if (game.result[0] > game.result[1]) {
            winner = game.homeTeam;
        } else if (game.result[0] < game.result[1]) {
            winner = game.awayTeam;
        } else {
            return;
        }

        var winnerIndex = teams.findIndex(function (team) {
            return winner.id === team.id;
        });

        if (teams[winnerIndex] !== -1) {
            teams[winnerIndex].stats.wins++;
            pubsub.emit('changeTeamsStats')
        }
    }
};
teamModule.init();