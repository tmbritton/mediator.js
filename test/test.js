var assert = require('assert'),
    mediator = require('../mediator.js');

describe('Test Subscriptions', function() {
  describe('adding a subscription', function(){
    it('should be present in the getAllSubscriptions method', function(){
      var subscriptions = {};
      mediator.subscribe('testSubscription', function(){ return 'test'; });
      subscriptions = mediator.getAllSubscriptions();
      assert.equal(Object.keys(subscriptions).length, 1);
      assert.equal(subscriptions.testSubscription[0].cb(), 'test');
      assert.equal(subscriptions.testSubscription[0].priority, 0);
    })
  });

  describe('sorting subscriptions', function(){
    it('should sort according to supplied priority', function(){
      var subscriptions = {};
      mediator.subscribe('testSubscriptionSorting', function(){ return 7; }, 7);
      mediator.subscribe('testSubscriptionSorting', function(){ return 5; }, 5);
      mediator.subscribe('testSubscriptionSorting', function(){ return 5; }, -1);
      subscriptions = mediator.getAllSubscriptions();
      assert.equal(subscriptions.testSubscriptionSorting[0].priority, -1);
      assert.equal(subscriptions.testSubscriptionSorting[1].priority, 5);
      assert.equal(subscriptions.testSubscriptionSorting[2].priority, 7);
    });
  });

  describe('priority type checking', function(){
    it('should convert a string to a number', function(){
      var subscriptions = {};
      mediator.subscribe('testSubscriptionTypeChecking', function(){}, '1');
      mediator.subscribe('testSubscriptionTypeChecking', function(){}, '7');
      mediator.subscribe('testSubscriptionTypeChecking', function(){}, '-1');
      subscriptions = mediator.getAllSubscriptions();
      assert.equal(typeof subscriptions.testSubscriptionTypeChecking[0].priority, 'number');
      assert.equal(subscriptions.testSubscriptionTypeChecking[0].priority, -1);
      assert.equal(subscriptions.testSubscriptionTypeChecking[1].priority, 1);
      assert.equal(subscriptions.testSubscriptionTypeChecking[2].priority, 7);

    });

    it('should convert an invalid string to default', function(){
      var subscriptions = {};
      mediator.subscribe('testSubscriptionTypeCheckingString', function(){}, 'dog');
      subscriptions = mediator.getAllSubscriptions();
      assert.equal(subscriptions.testSubscriptionTypeCheckingString[0].priority, 0);
    });
    it('should convert an object to default', function(){
      var subscriptions = {};
      mediator.subscribe('testSubscriptionTypeCheckingObject', function(){}, {});
      subscriptions = mediator.getAllSubscriptions();
      assert.equal(subscriptions.testSubscriptionTypeCheckingObject[0].priority, 0);
    })
  });
}); 
