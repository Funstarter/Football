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
                var template = dropdown.innerHTML;
                var result = '';
                var teamOption = '';
                this.teams.forEach(function(team, index){
                    teamOption = template.replace(/{(team.name)}/g, team.name);
                    teamOption = teamOption.replace(/{(team.id)}/g, index+'');
                    result += teamOption;
                });
                dropdown.innerHTML = result;
            });
        },
        addGame: function () {
        }
    };
    matchCenter.init();
})();