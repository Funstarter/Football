'use strict';

var publisher = {
  subscribers: {
    'any': []
  },
  subscribe: function (type, fn) {
    if(!this.subscribers[type]){
      this.subscribers[type] = [];
    }
    this.subscribers[type].push(fn);
  },
  unsubscribe: function (type, fn) {
    this.subscribers[type] = this.subscribers[type].filter(function (item, i) {
      return item !== fn;
    });
  },
  publish: function (type, arg) {
    this.subscribers[type].forEach(function (item) {
      item(arg);
    });
  }
}


function makePublisher(ob) {
  for (var item in publisher) {
    if (publisher.hasOwnProperty(item) && typeof publisher[item] != 'object') {
      ob[item] = publisher[item];
    }
    ob.subscribers = {
      'any': []
    };
  }
}