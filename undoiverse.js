const FILE = 'undoiverse.js'
    , VERSION = '0.2.2'
    , uu = require('./uu.js') // Undoiverse Utilities
;


//// To start using Undoiverse, call:
//// `const undoiverse = require('undoiverse')({
////    location: { count: 4 }, // 256 is the default
////    entity: { tally: { max: 20 } }
////  });` [@todo show more typical config]
//// See the `uu.fill(...)` lines below for default values. [@todo]

module.exports = class Undoiverse {

  constructor (config) {

    //// Event listeners, used by `trigger()`. They’re added using:
    //// `undoiverse.activate({ on:'some.event', run: function () {...} })`
    this.listeners = {};

    this.activate(
      require('./plugins/core/client/client.activate.js')(config)
     ,require('./plugins/core/entity/entity.activate.js')(config)
     ,require('./plugins/core/location/location.activate.js')(config)
    );

  }


  //// `ok(callerRef, { FILE:'foo/bar.js', ... }, 'Yay!', ...)`
  //// Xx.
  ok (caller, response, ...info) {
    response.status = 'ok';
    response.info = response.info.concat(info);
    caller.emit(response);
    this.trigger(`${response.PLUGIN}.${response.METHOD}.ok`, caller, response);
    return response;
  }


  //// `fail(callerRef, { FILE:'foo/bar.js', ... }, 'Some info', 'More info')`
  //// Xx.
  fail (caller, response, ...info) {
    response.status = 'fail';
    response.info = response.info.concat(info);
    caller.emit(response);
    this.trigger(`${response.PLUGIN}.${response.METHOD}.fail`, caller, response);
    return response;
  }


  //// `cancel(callerRef, { FILE:'foo/bar.js', ... }, 'Cancellation info here')`
  //// Xx.
  cancel (caller, response, ...info) {
    response.status = 'cancel';
    response.info = response.info.concat(info);
    caller.emit(response);
    this.trigger(`${response.PLUGIN}.${response.METHOD}.cancel`, caller, response);
    return response;
  }


  //// `trigger('foo.bar', { FILE:'foo/bar.js', ... }, 'Info here', 'etc', ...)`
  //// Runs all listeners which match the first argument passed to `trigger()`.
  trigger (event, caller, response, cancel) {
    let i, listener;

    //// Load previously-cached wildcard-alternates for this event.
    let eventAlts = memoizedEventAlts[event];
    if (! eventAlts) { // generate alts if this is a newly encountered event
      memoizedEventAlts[event] = eventAlts = wildcarderize(event);
    }

    //// Find and run all listeners for this event.
    eventAlts.forEach( onAlt => {
      if (this.listeners[onAlt]) {
        for (i=0; listener=this.listeners[onAlt][i]; i++) {
          listener.call(this, event, caller, response, cancel);
        }
      }
    });

  }

  //// `activate([{ on:'*.*.*', run:...}, ...], { key:'foo.ok', value:8 }, ...)`
  //// Allows plugins to add event listeners, methods and properties to the
  //// Undoiverse instance, by passing in plugin-partial-objects (PPOs). Each
  //// PPO must define an event listener (where `on` is a string and `run` is a
  //// function), a method (where `key` is a string and `value` is a function)
  //// or a property (where `key` is a string and `value` is not a function).
  activate (...args) {

    //// Each argument may be a single PPO, an array of PPOs, an array of arrays
    //// of PPOs, etc. For simplicity, convert `args` to a flat array of PPOs.
    let ppos = uu.flatten(args);

    //// Record each PPO to the Undoiverse instance.
    ppos.forEach( ppo => {
      let { key, value, on, run } = ppo, that = this;
      if (on) (this.listeners[on] = this.listeners[on] || []).push(run);
      if (key) {
        const k = key.split('.'); // convert 'foo.bar' to `['foo','bar']`
        function dig (nsRef) { // namespace-reference
          let n = k.shift();
          if (k.length) { // still some way to go...
            dig( nsRef[n] = nsRef[n] || {} ); // ...so dig deeper
          } else if (value && value.bind) {
            nsRef[n] = value.bind(that); // bind a method to Undoiverse instance
          } else {
            nsRef[n] = value; // copy (literal) or reference (object) a property
          }
        }
        dig(this); // begin recursively creating `this.foo.bar`
      }
    }); // end `ppos.forEach`
  } // end `activate()`

} // end the `Undoiverse` class


//// `wildcarderize('foo.bar')`
//// Used by `trigger()` during memoization to convert 'foo.bar' to
//// `['foo.bar', 'foo.*', '*.bar', '*.*']`.
function wildcarderize (event) {
  const eventAlts = [];
  event = event.split('.'); // convert 'foo.bar' to `['foo','bar']`
  for (let i=0, l=Math.pow(2, event.length), o, s; i<l; i++) {
    o = [], s = ('00000000' + i.toString(2) ).substr(-l.toString(2).length+1);
    s.split('').forEach( (ch, index) => {
      o.push( '1' === ch ? '*' : event[index] );
    });
    eventAlts.push( o.join('.') );
  }
  return eventAlts;
}


//// `memoizedEventAlts` is the cache of wildcard-alternates for event strings.
//// Not a property, because it can be shared between many Undoiverse instances.
const memoizedEventAlts = {};
