var pubsub = {
    events: {},
    on: function (eventName, fn, context) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push({context: context, callback: fn.bind(context)});
    },
    off: function (eventName, fn, context) {
        if(this.events[eventName]) {
            for(var i = 0; i < this.events[eventName].length; i++) {
                if(
                    (this.events[eventName][i].callback.name === fn.bind(this).name) &&
                    (this.events[eventName][i].context === context)
                ){
                    this.events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    },
    emit: function (eventName, data) {
        if(this.events[eventName]) {
            this.events[eventName].forEach(function(object){
                object.callback(data);
            });
        }
    }
};