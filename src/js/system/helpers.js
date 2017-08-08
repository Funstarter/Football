var helpers = {
    delegate: function (attribute, event) {
        var target = event.target;
        while (target !== event.currentTarget) {
            if(target.hasAttribute(attribute)) {
                return true;
            }
            target = target.parentNode;
        }
        return false;
    }
}