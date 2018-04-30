/*
Globals: teams;
*/

var teamsChartModule = (function () {

    // DOM elements
    var canvas = document.querySelector('#teams-chart');
    var context = canvas.getContext('2d');

    //Events
    pubsub.on('changeTeamsStats', reRender);

    function renderFrame() {
        context.fillStyle = 'white';
        context.fillRect(0, 0, 300, 300);
        context.strokeRect(0, 0, 300, 300);

        context.fillStyle = '#000';
        context.font = '14px Arial';
        context.fillText('Statistics', 30, 30);
    }

    function getMaxWidth() {
        var maxWidth = 0;
        teams.forEach(function (item, index) {
            if (item.stats.wins > maxWidth) {
                maxWidth = item.stats.wins;
            }
        });
        return maxWidth;
    }

    function renderChart() {
        var leftPadding = 30;
        var topPadding = 60;
        var rectHeight = 30;
        var rectIndent = 20;
        var maxRectWidth = 180;
        var textLineHeight = 18;
        var textIndent = 40;

        teams.forEach(function (item, index) {
            var y = topPadding + ((rectHeight + rectIndent) * index);
            var rectWidth = Math.round((maxRectWidth * item.stats.wins) / getMaxWidth());

            context.fillRect(leftPadding, y, rectWidth, rectHeight);
            context.fillText(item.name + ' (' + item.stats.wins + ')', rectWidth + textIndent, y + textLineHeight);
        });
    }

    function render() {
        renderFrame();
        renderChart();
    }

    function reRender() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        render();
    }

    return {
        render: render
    }

})();
teamsChartModule.render();