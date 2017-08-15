var dataList = [
    {"id": 5, "name": "Basecamp"},
    {"id": 17, "name": "Google"}
];

//Cache of the template
var template = document.getElementById('template-list');

//Get the content of the template
var templateHtml = template.innerHTML;

//Final HTML variable as empty string
var listHtml = '';

//Loop through dataList, replace placeholder tags
//with actual data, and generate final HTML
for (var i = 0; i < dataList.length; i++) {

    listHtml += templateHtml.replace(/{{(.*?)}}/g, function(match, token) {
        return dataList[i][token];
    });

    /*var id = Object.keys(dataList[i])[0];
    var name = Object.keys(dataList[i])[1];

    var str = templateHtml.replace(/{{id}}/g, dataList[i]['id']);
    str = str.replace(/{{name}}/g, dataList[i]['name']);

    listHtml += str;*/
}

//Replace the HTML of #list with final HTML
document.getElementById('list').innerHTML = listHtml;