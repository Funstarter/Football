var matchCenter = {
    games: [
        {
            id: 1,
            homeTeam: teams[0],
            awayTeam: teams[2],
            result: []
        },
        {
            id: 2,
            homeTeam: teams[1],
            awayTeam: teams[3],
            result: []
        }
    ],
    team: team,
    init: function () {
        this.dom();
        this.events();
        this.renderTeams();
        this.renderGames();
    },
    dom: function () {
        this.selector = document.querySelector('[data-match-center]');
        this.gamesList = this.selector.querySelector('[data-match-center-games]');
        this.gamesTemplate = document.querySelector('#match-center-games');
        this.addGameButton = this.selector.querySelector('[data-match-center-add-game]');
        this.teamsDropdown = this.selector.querySelectorAll('[data-match-center-team]');
        this.homeTeam = this.selector.querySelector('[data-match-center-team="home"]');
        this.awayTeam = this.selector.querySelector('[data-match-center-team="away"]');
        this.removeGameButtonSelector = 'data-match-center-remove-game';
        this.gameSelector = 'data-match-center-game';
    },
    events: function () {
        this.addGameButton.addEventListener('click', this.addGame.bind(this));
        this.gamesList.addEventListener('click', this.removeGame.bind(this));
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
            var gameHtml = template.replace(/{(id)}/g, item.id);
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

        if (homeTeam === awayTeam) {
            return;
        }

        this.games.push({
            id: this.games.length+1,
            homeTeam: homeTeam,
            awayTeam: awayTeam,
            result: []
        });
        this.renderGames();
    },
    removeGame: function (e) {
        var target = e.target;
        var deleteButton;
        var listItem;

        /* Retrieve delete button and list item buy delegate event */
        while (target != e.currentTarget) {
            if(target.hasAttribute(this.removeGameButtonSelector)){
                deleteButton = target;
            }
            if(target.hasAttribute(this.gameSelector)) {
                listItem = target;
            }
            target = target.parentNode;
        }

        /* Exit function if we didn't click on delete button */
        if (!deleteButton) {
            return;
        }

        /* Get an array of all current games List items */
        var gamesElements = this.gamesList.querySelectorAll('['+this.gameSelector+']');
        gamesElements = Array.from(gamesElements);

        /* Delete game from data */
        this.games.splice(gamesElements.indexOf(listItem), 1);

        /* Delete game from DOM */
        this.gamesList.removeChild(listItem);

        /* Terminate all other possible event listeners on deleted list item */
        e.stopPropagation();
    }
};
matchCenter.init();