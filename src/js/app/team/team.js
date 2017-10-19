var team = {
    teams: teams,
    getTeam: function (id) {
        return teams.find(function (item) {
            return item.id === id;
        });
    }
};