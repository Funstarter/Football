var addNewTeamModule = (function () {

    /* DOM */
    var $scope = document.querySelector('#new-team');
    var $form = $scope.querySelector('form');
    var $fields = $form.querySelectorAll('[data-field]');

    /* Events */
    $fields.forEach(function (item) {
        item.addEventListener('invalid', onFieldInvalid);
        item.addEventListener('input', onFieldChange);
    });

    function onFieldInvalid(event) {
        event.preventDefault();
        var $field = event.target;
        $field.classList.add('is-invalid');
    }

    function onFieldChange(event) {
        var $field = event.target;
        $field.classList.remove('is-invalid');
    }

})();