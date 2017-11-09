/**
 * Globals
 *
 * teams data
 */

var teamModule = {
    getTeam: function (id) {
        return teams.find(function (item) {
            return item.id === id;
        });
    }
};