/**
 * @TODO: add method to unsubscribe.
 */

'use strict';
(function(global, component) {

  if (typeof define === 'function' && define.amd) {
    // AMD/RequireJS
    define('mediator', [], function() {
      return component();
    });
  } else if (typeof exports !== 'undefined') {
    // Node/CommonJS
    console.log('module exports');
    exports.mediator = component();
  } else {
    // Browser global
    global.mediator = component();
  }  
})(this, function(){
  var subscriptions = {};

  var mediator = {
  
    /**
     * Get all subscriptions
     * @return object
     *   All subscriptions
     */  
    getAllSubscriptions: function() {
      return subscriptions;
    },
  
    /**
     * Subscribe to an event.
     * @param {string} event_name - Event in which to subscribe.
     * @param {function} callback - Function to execute when event is published.
     * @param {number} priority - Priority in which to execute callback. Lower number executes first. Default is 0.
     */
    subscribe: function(event_name, callback, priority) {
      // Cast strings as numbers.
      if (typeof priority == 'string') {
        priority = parseInt(priority);
      }
      // Provide default if priority is anything other than a number.
      if (typeof priority != 'number' || isNaN(priority)) {
        priority = 0;
      }
  
      if (typeof subscriptions[event_name] != 'object' && !subscriptions.isArray) {
        subscriptions[event_name] = [];
      }
  
      subscriptions[event_name].push({'cb': callback, 'priority': priority});
  
      // Sort subscriptions by priority.
      subscriptions[event_name].sort(function(a, b){
        if (a.priority < b.priority) {
          return -1;
        }
        if (a.priority > b.priority) {
          return 1;
        }
        if (a.priority == b.priority) {
          return 0;
        }
      });
    },
    
    /**
     * Publish an event.
     * @param {string} event_name - Name of event. Used as key in subscriptions object.
     * @param {data} anything - Data passed to callback functions subscribed to event.
     */
    publish: function(event_name, data) {
      if (subscriptions.hasOwnProperty(event_name)) {
        subscriptions[event_name].every(function(subscription) {
          var result = subscription.cb(data);
          // If callback returns false, return false here to stop loop.
          if (result === false) {
            return false;
          }
          return true;
        });
      }
    }
  };

  return {
    getAllSubscriptions: mediator.getAllSubscriptions,
    subscribe: mediator.subscribe,
    publish: mediator.publish
  };
});
