// EventEmmiter is basically we can add our own events and listen to them and trigger them. only difference over regular functions are we can add multiple handler with same name and trigger them all at once. just to make it more clear,

class EventEmmiter {
  constructor() {
    this.events = {};
  }
  on(eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
  }
  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((fn) => {
        fn(data);
      });
    } else {
      console.log(eventName, ' No such event found');
    }
  }

  off(eventName) {
    delete this.events[eventName];
  }

  offAll() {
    this.events = {};
  }
}

// Usage
const eventEmmiter = new EventEmmiter();

eventEmmiter.on('greet', () => {
  console.log('hope you are doing well');
});
eventEmmiter.on('greet', (name) => {
  console.log(`Hello, ${name} Hope you are doing greate`);
});

eventEmmiter.emit('greet', 'John');
// hope you are doing well
// Hello, John Hope you are doing greate



/**
 The Observer Pattern - EventEmmiter
The Observer Pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically. This is also known as the Publish-Subscribe pattern.*/

class Observer {
  constructor() {
    this.observers = [];
  }
  subscribe(fn) {
    this.observers.push(fn);
  }
  unsubscribe(fn) {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }
  broadcast(data) {
    this.observers.forEach((subscriber) => subscriber(data));
  }
}
function logData(data) {
  console.log(data);
}
function logDataWithPrefix(data) {
  console.log(`Data: ${data}`);
}
// Usage
const observer = new Observer();
observer.subscribe(logData);
observer.subscribe(logDataWithPrefix);
observer.broadcast('Hello World');
// Hello World
// Data: Hello World
