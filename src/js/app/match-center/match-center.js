(function () {
    var matchCenter = {
        games: [],
        teams: teams,
        init: function () {
            this.dom();
            this.renderTeams();
        },
        dom: function () {
            this.selector = document.querySelector('[data-match-center]');
            this.addTeamButton = this.selector.querySelector('[data-match-center-add-team]');
            this.teamsDropdown = this.selector.querySelectorAll('[data-match-center-teams]');
        },
        events: function () {
        },
        renderTeams: function () {
            this.teamsDropdown.forEach(function (dropdown) {
                var options = '';
                teams.forEach(function (team) {
                    options += '<option value="'+ team.id +'">' + team.name + '</option>';
                });
                dropdown.insertAdjacentHTML('beforeEnd', options);
            });
        },
        addGame: function () {
        }
    };
    matchCenter.init();
})();