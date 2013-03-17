var Cancelable = require('../lib/cancelable.js');
var _          = require('lodash');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['awesome'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'standalone': function(t) {
    var fn = Cancelable(function(){return true;});
    t.strictEqual(fn(), true, "is not cancelled should returns true");
    fn.cancel();
    t.strictEqual(fn(), undefined, "is cancelled");
    t.done();
  },
  'should forward args': function(t) {
    var fn = Cancelable(function(a, b, c){
      t.deepEqual(Array.prototype.slice.call(arguments), ["a",1,2]);
      return true;
    });
    t.strictEqual(fn("a",1,2), true, "is not cancelled should returns true");
    fn.cancel();
    t.strictEqual(fn(), undefined, "is cancelled");
    t.done();
  },
  'mixin': function(t){
    t.ok(!_.isFunction(_.cancelable));
    _.mixin(Cancelable.exports());
    t.ok(_.isFunction(_.cancelable));
    t.done();
  }
};
