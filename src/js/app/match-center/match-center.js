/* Global var team from another file */

(function () {

    /* DOM Selectors */
    var selector = document.querySelector('[data-match-center]');
    if(!selector) {
        return;
    }
    var gamesList = selector.querySelector('[data-match-center-games]');
    var gamesTemplate = document.querySelector('#match-center-games');
    var addGameButton = selector.querySelector('[data-match-center-add-game]');
    var teamsDropdown = selector.querySelectorAll('[data-match-center-team]');
    var newHomeTeam = selector.querySelector('[data-match-center-team="home"]');
    var newAwayTeam = selector.querySelector('[data-match-center-team="away"]');
    var removeGameButtonSelector = 'data-match-center-remove-game';
    var gameSelector = 'data-match-center-game';

    /* Events listeners */
    addGameButton.addEventListener('click', addGame);
    gamesList.addEventListener('click', removeGame);

    /* Constructor functions */
    renderTeams();
    renderGames();

    function renderTeams() {
        teamsDropdown.forEach(function (dropdown) {
            var options = '';
            team.teams.forEach(function (team) {
                options += '<option value="' + team.id + '">' + team.name + '</option>';
            });
            dropdown.insertAdjacentHTML('beforeEnd', options);
        });
    }

    function renderGames() {
        var template = gamesTemplate.innerHTML;
        var finalHtml = '';
        games.forEach(function (item) {
            var gameHtml = template.replace(/{(id)}/g, item.id);
            gameHtml = gameHtml.replace(/{(homeTeam)}/g, item.homeTeam.name);
            gameHtml = gameHtml.replace(/{(awayTeam)}/g, item.awayTeam.name);
            gameHtml = gameHtml.replace(/{(result)}/g, (item.result.length === 0) ? '-:-' : item.result.join(':'));
            if (item.result.length > 0) {
                gameHtml = gameHtml.replace(/(data-attr-disabled)/g, 'disabled');
            }
            finalHtml += gameHtml;
        });
        gamesList.innerHTML = finalHtml;
    }

    function addGame() {
        var homeTeamId = Number(newHomeTeam.options[newHomeTeam.selectedIndex].value);
        var awayTeamId = Number(newAwayTeam.options[newAwayTeam.selectedIndex].value);

        var homeTeam = team.getTeam(homeTeamId);
        var awayTeam = team.getTeam(awayTeamId);

        /* Exit if home and away team are same */
        if (homeTeam === awayTeam) {
            return;
        }

        /* Require home and away team selected */
        if (!homeTeam || !awayTeam) {
            return;
        }

        /* Exit if game with same home and away teams already exist */
        var notUnique = games.some(function (item) {
            return (item.homeTeam.id === homeTeamId) && (item.awayTeam.id === awayTeamId);
        });
        if (notUnique) {
            return;
        }

        games.push({
            id: games.length + 1,
            homeTeam: homeTeam,
            awayTeam: awayTeam,
            result: []
        });
        renderGames();
    }

    function removeGame(e) {
        var target = e.target;
        var deleteButton;
        var listItem;

        /* Retrieve delete button and list item buy delegate event */
        while (target !== e.currentTarget) {
            if (target.hasAttribute(removeGameButtonSelector)) {
                deleteButton = target;
            }
            if (target.hasAttribute(gameSelector)) {
                listItem = target;
            }
            target = target.parentNode;
        }

        /* Exit function if we didn't click on delete button */
        if (!deleteButton) {
            return;
        }

        /* Get an array of all current games List items */
        var gamesElements = gamesList.querySelectorAll('[' + gameSelector + ']');
        gamesElements = Array.from(gamesElements);

        /* Delete game from data */
        games.splice(gamesElements.indexOf(listItem), 1);

        /* Delete game from DOM */
        gamesList.removeChild(listItem);

        /* Terminate all other possible event listeners on deleted list item */
        e.stopPropagation();
    }

})();