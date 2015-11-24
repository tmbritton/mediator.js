# mediator.js
Implementation of an event mediator in Javascript.

## Installation

```
$ npm install mediator.js
```

## Features
* Publishing and subscribing of user-defined events.
* User definable priority for event reaction execution.
* Enables a modular application structure through event-driven programming.

## How it Works

```
$ npm install --save mediator.js
```

Create a file named app.js. Inside copy:

```
require('mediator.js');

mediator.subscribe('testEvent', function(data){
  console.log(data)
});

mediator.publish('testEvent', 'Hello World');
```
## The API

### mediator.publish(event_name, data)
Pubish an event. This informs any subscriptions to the event that it's time for them to execute. Info supplied in the data param is given to the callback function defined in a subscription.

event_name: {string} - identifier for the event.
data: {anything} - data supplied to callbacks of subscriptions.

### mediator.subscribe(event_name, callback, priority)
Subscribe to an event published by mediator.publish. The publish method will execute callback that are subscribed to the published event in their order of priority. The lowest number priorty subscription executes first. 

event_name: {string} - Identifier of the event we're subscribing to.
callback: {function} - Executable function that accepts a single parameter.
priority: {number} - priority for the execution of the callback relative to other subscriptions to the event. The lower number the higher the priority. Default is 0.
