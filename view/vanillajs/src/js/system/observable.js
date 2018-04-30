function Observable(){
    var observers = [];
    this.sendMessage = function(data) {
        for(var i = 0; i < observers.length; i++) {
            observers[i].notify(data);
        }
    }
    this.addObserver = function(observer){
        observers.push(observer);
    }
}

function Observer(callback){
    this.notify = function(data) {
        callback(data);
    }
}