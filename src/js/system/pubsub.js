var pubsub = {
    events: {},
    on: function (eventName, fn, context) {
        context = context || undefined;
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push({context: context, callback: fn});
    },
    off: function (eventName, fn) {
        if(this.events[eventName]) {
            for(var i = 0; i < this.events[eventName].length; i++) {
                if(this.events[eventName][i].callback === fn){
                    this.events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    },
    emit: function (eventName, data) {
        if(this.events[eventName]) {
            this.events[eventName].forEach(function(object){
                object.callback.call(object.context, data);
            });
        }
    }
};