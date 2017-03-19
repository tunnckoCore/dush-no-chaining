/*!
 * dush-no-chaining <https://github.com/tunnckoCore/dush-no-chaining>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('mukla')
var dush = require('dush')
var noChaining = require('./index')

var noop = function noop () {}
var app = dush().use(noChaining())

test('should `.on` and `.once` return undefined', function (done) {
  var ret1 = app.on('foo', noop)
  var ret2 = app.once('foo', noop)

  test.strictEqual(ret1, undefined)
  test.strictEqual(ret2, undefined)
  done()
})

test('should `.off` return undefined', function (done) {
  test.strictEqual(app.off('foo', noop), undefined)
  done()
})

test('should `.emit` return undefined', function (done) {
  var emitter = app.emit('foo', 123)
  test.strictEqual(emitter, undefined)
  done()
})
