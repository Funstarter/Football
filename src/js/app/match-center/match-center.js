var matchCenter = {
    games: [],
    team: team,
    init: function () {
        this.dom();
        this.events();
        this.renderTeams();
        //this.renderGames();
    },
    dom: function () {
        this.selector = document.querySelector('[data-match-center]');
        this.gamesList = this.selector.querySelector('[data-match-center-games]');
        this.gamesTemplate = document.querySelector('#match-center-games');
        this.addGameButton = this.selector.querySelector('[data-match-center-add-game]');
        this.teamsDropdown = this.selector.querySelectorAll('[data-match-center-team]');
        this.homeTeam = this.selector.querySelector('[data-match-center-team="home"]');
        this.awayTeam = this.selector.querySelector('[data-match-center-team="away"]');
    },
    events: function () {
        this.addGameButton.addEventListener('click', this.addGame.bind(this));
    },
    renderTeams: function () {
        this.teamsDropdown.forEach(function (dropdown) {
            var options = '';
            this.team.teams.forEach(function (team) {
                options += '<option value="' + team.id + '">' + team.name + '</option>';
            });
            dropdown.insertAdjacentHTML('beforeEnd', options);
        });
    },
    renderGames: function () {
        var template = this.gamesTemplate.innerHTML;
        var finalHtml = '';

        this.games.forEach(function (item, index) {
            var gameHtml = template.replace(/{(id)}/g, index);
            gameHtml = gameHtml.replace(/{(homeTeam)}/g, item.homeTeam.name);
            gameHtml = gameHtml.replace(/{(awayTeam)}/g, item.awayTeam.name);
            gameHtml = gameHtml.replace(/{(result)}/g, (item.result.length == 0) ? '-:-' : item.result.join(':'));
            if (item.result.length > 0) {
                gameHtml = gameHtml.replace(/(data-attr-disabled)/g, 'disabled');
            }
            finalHtml += gameHtml;
        });
        this.gamesList.innerHTML = finalHtml;
    },
    addGame: function () {
        var homeTeamId = Number(this.homeTeam.options[this.homeTeam.selectedIndex].value);
        var awayTeamId = Number(this.awayTeam.options[this.awayTeam.selectedIndex].value);

        var homeTeam = this.team.getTeam(homeTeamId);
        var awayTeam = this.team.getTeam(awayTeamId);

        this.games.push({
            homeTeam: homeTeam,
            awayTeam: awayTeam,
            result: []
        });
        this.renderGames();
    }
};
matchCenter.init();