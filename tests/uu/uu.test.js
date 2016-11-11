const FILE = 'tests/uu/uu.test.js'
    , VERSION = '0.2.0'
    , PLUGIN = '(not a plugin)'
    , a = require('assert')
    , uu = require('../../uu.js')
;


//// To run all tests from the command line, `cd` to ‘undoiverse/’ and type:
//// `$ npm test`
//// To run all tests using JavaScript:
//// `const testResults = require('./tests/test-runner.js');`
//// To run just these unit tests using JavaScript, call:
//// `require('./tests/uu.test.js')().forEach(t=>t());`
module.exports = config => {

  const tests = [

    //// `uu.fill()` integer usage.
    () => {
      let o = { foo:{ bar: { baz:99 } } };
      uu.fill('foo/bar.js', o, 'foo.bar.baz', 6, 'integer', 1, 99);
      a.deepEqual(o, { foo:{ bar: { baz:99 } } },
        `uu.fill() should leave a valid integer unchanged, three levels deep`
    )},
    () => {
      let o = { baz:123 };
      uu.fill('foo/bar.js', o, 'foo.bar', 6, 'integer', 1, 99);
      a.deepEqual(o, { baz:123, foo:{ bar:6 } },
        `uu.fill() should create a missing integer, two levels deep`
    )},
    () => {
      let o = { foo:{ bar:0 } };
      a.throws(
        () => { uu.fill('foo/bar.js', o, 'foo.bar', 6, 'integer', 1, 99); },
        e  => { if ( (e instanceof RangeError) &&
        /config.foo.bar is 0, which is less than 1/.test(e) ) {return true}},
        `uu.fill() should throw if an integer is too small, two levels deep`
    )},
    () => {
      let o = { foo:100 };
      a.throws(
        () => { uu.fill('foo/bar.js', o, 'foo', 6, 'integer', 1, 99); },
        e  => { if ( (e instanceof RangeError) &&
        /config.foo is 100, which is greater than 99/.test(e) ) {return true}},
        `uu.fill() should throw if an integer is too big, top level`
    )},
    () => {
      let o = { foo:55.5 };
      a.throws(
        () => { uu.fill('foo/bar.js', o, 'foo', 6, 'integer', 1, 99); },
        e  => { if ( (e instanceof TypeError) &&
        /config.foo is a number but not an integer/.test(e) ) {return true}},
        `uu.fill() should throw if it’s a number not an integer, top level`
    )},


    //// Constants.
    () => a.strictEqual(
      uu.MSI,
      9007199254740991,
      `uu.MSI should be the biggest integer JavaScript can accurately handle`
    )

  ];

  ////
  tests.FILE    = FILE;
  tests.VERSION = VERSION;
  tests.PLUGIN  = PLUGIN;
  return tests;

};
