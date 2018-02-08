/*
Globals: teams;
*/

var teamsChartModule = (function () {
    var canvas = document.querySelector('#teams-chart');
    var context = canvas.getContext('2d');

    context.fillStyle = 'white';
    context.fillRect(0, 0, 300, 300);
    context.strokeRect(0, 0, 300, 300);

    context.fillStyle = '#000';
    context.font = '14px Arial';
    context.fillText('Teams win Charts', 30, 30);

    console.log(teams);

    var step = 30;
    var rectHeight = 30;

    teams.forEach(function (item, index) {
        var x1 = 30;
        var y = 70 + ((rectHeight + 20) * index);
        var w = 130;
        var h = 30;
        context.fillRect(x1, y, w, h);
        context.fillText(item.name, 180, 70 + (step * index));
    });

})();