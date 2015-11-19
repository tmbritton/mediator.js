var assert = require('assert'),
    mediator = require('../index.js').mediator;

describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});

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
}); 