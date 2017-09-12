function templateEngine(template, data) {

    /* Final HTML variable as empty string */
    var listHtml = '';

    /* Loop through dataList, replace placeholder tags
    with actual data, and generate final HTML */
    data.forEach(function (item) {
        listHtml += template.innerHTML.replace(/{{(.*?)}}/g, function (match, token) {
            return item[token];
        });
    });

    /* Replace the HTML of #list with final HTML */
    template.innerHTML = listHtml;
}