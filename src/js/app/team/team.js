var team = {
    teams: [
        {
            id: 3,
            name: 'Arsenal',
            level: 60
        },
        {
            id: 5,
            name: 'MC',
            level: 90
        },
        {
            id: 1,
            name: 'Chelsea',
            level: 75
        },
        {
            id: 14,
            name: 'MU',
            level: 80
        }
    ],
    getTeam: function (id) {
        return this.teams.find(function (item) {
            return item.id === id;
        });
    },
    getTeams: function() {
        return this.teams;
    }
};