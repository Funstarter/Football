function templateEngine(settings) {
    /* Cache of the template */
    var template = settings.template;

    /* Get the content of the template */
    var templateHtml = template.innerHTML;

    /* Final HTML variable as empty string */
    var listHtml = '';

    /* Loop through dataList, replace placeholder tags
    with actual data, and generate final HTML */
    for (var i = 0; i < settings.data.length; i++) {
        listHtml += templateHtml.replace(/{{(.*?)}}/g, function (match, token) {
            return settings.data[i][token];
        });
    }

    /* Replace the HTML of #list with final HTML */
    settings.placeholder.innerHTML = listHtml;
}