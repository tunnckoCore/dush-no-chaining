/*!
 * dush-no-chaining <https://github.com/tunnckoCore/dush-no-chaining>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

/**
 * > A plugin that removes support for emitter methods to be chainable. Basically, by
 * default [dush][]'s methods (and most of other eventemitters) are chainable
 * and some user don't like that feature that I need.
 *
 * **Example**
 *
 * ```js
 * const dush = require('dush')
 * const noChaining = require('dush-no-chaining')
 *
 * const app = dush()
 *
 * // by default they are chainable
 * app
 *   .on('foo', () => {})
 *   .once('bar', () => {})
 *   .emit('bar', 123)
 *   .off('foo')
 *   .emit('bar', 333)
 *   .emit('foo', 1)
 *
 * // but when add this plugin
 * // they are not chainable
 * const emitter = dush().use(noChaining())
 *
 * const noop = () => {}
 * const on = emitter.on('foo', noop)
 * console.log(on) // => undefined
 *
 * const off = emitter.off('foo', noop)
 * console.log(off) // => undefined
 *
 * const once = emitter.once('bar', noop)
 * console.log(once) // => undefined
 *
 * const emit = emitter.emit('bar', 123)
 * console.log(emit) // => undefined
 * ```
 *
 * @name   noChaining
 * @return {Function} A plugin function that can be passed to [dush][], [minibase][] or [base][]
 * @api public
 */

module.exports = function dushNoChaining () {
  return function noChaining (app) {
    var map = {
      on: app.on,
      off: app.off,
      once: app.once,
      emit: app.emit
    }

    Object.keys(map).forEach(function (name) {
      app[name] = factory(map[name])
    })

    return app
  }
}

function factory (fn) {
  return function factory_ () {
    fn.apply(null, arguments)
  }
}
