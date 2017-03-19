/*!
 * dush-no-chaining <https://github.com/tunnckoCore/dush-no-chaining>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

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
