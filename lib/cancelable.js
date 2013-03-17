/*
 * cancelable
 * https://github.com/FGRibreau/cancelable
 *
 * Copyright (c) 2013 Francois-Guillaume Ribreau
 * Licensed under the MIT license.
 */

function noop(){}

/**
 * Make a function cancelable
 * @param {Function} origFn
 */
function Cancelable(origFn){
  if(typeof origFn !== "function"){throw new Error("Cancelable(fn), fn must be a function");}
  var fn = function(){return origFn.apply(this, arguments);};
  fn.cancel = function(){origFn = noop;};
  return fn;
}

/**
 * Exports Cancelable
 *
 * Usage:
 *   var _ = require('underscore');
 *   _.mixin(require('cancelable').exports());
 *
 * @return {Object}
 *
 */
Cancelable.exports = function(){
  return {cancelable: Cancelable};
};

module.exports = Cancelable;
