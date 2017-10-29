var team = {
    teams: teams,
    getTeam: function (id) {
        return this.teams.find(function (item) {
            return item.id === id;
        });
    }
};