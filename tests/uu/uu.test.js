const FILE = 'tests/uu/uu.test.js'
    , VERSION = '0.2.2'
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


    //// `uu.box()` basic usage.
    () => {

      a.strictEqual( '\n'+uu.box('Foo', '', 10.1, []),`
.-- Foo -.
'========'`,
      `uu.box() should show an empty 10x2 box with the title "Foo"`);

      a.strictEqual( '\n'+uu.box('Title is too long', 'Footer is too long', 21,
        ['This line fits.', 'This line is too long.']),`
.- Title is too... -.
| This line fits.   |
| This line is t... |
'= Footer is to... ='`,
      `uu.box() should show a 21x4 box with truncated title and content`);

      a.strictEqual( '\n'+uu.box('', '', 16,
        ['Squashed.', 'Squashed truncated.', 'Squashed snug.'], 0),`
.--------------.
|Squashed.     |
|Squashed tr...|
|Squashed snug.|
'=============='`,
      `uu.box() should allow padding to be set to zero`);

      a.strictEqual( '\n'+uu.box('', '', 22,
        ['Spacious.', 'Spacious truncated.', 'Spacious snug.'], 3),`
.--------------------.
|   Spacious.        |
|   Spacious tr...   |
|   Spacious snug.   |
'===================='`,
      `uu.box() should allow padding to be set to 3`);

    },


    //// `uu.box()` incorrect arguments are silently fixed.
    () => {

      a.strictEqual( '\n'+uu.box('', '', 9, ['First', 'Overlong', 'ok'], 100),`
.-------.
| First |
| Ov... |
| ok    |
'======='`,
      `uu.box() should reduce the \`padding\` argument if it’s too high (1)`);

      a.strictEqual( '\n'+uu.box('', '', 10, ['Snug', 'Overlong', 'ok'], 100),`
.--------.
|  Snug  |
|  O...  |
|  ok    |
'========'`,
      `uu.box() should reduce the \`padding\` argument if it’s too high (2)`);

      a.strictEqual( '\n'+uu.box('', '', 10, ['ok'], -45),`
.--------.
| ok     |
'========'`,
      `uu.box() should fix the \`padding\` argument, if it’s less than zero`);

      a.strictEqual( '\n'+uu.box(),`
.-- undefined -.
'== undefined ='`,
      `uu.box() should be callable with no arguments`);

      a.strictEqual( '\n'+uu.box(false, null),`
.---- false ---.
'==== null ===='`,
      `With no \`width\` argument, uu.box() should use 16 as a default`);

      a.strictEqual( '\n'+uu.box(1234, '', 'oops'),`
.---- 1234 ----.
'=============='`,
      `uu.box() should ignore an invalid \`width\` argument (string)`);

      a.strictEqual( '\n'+uu.box({}, '', -30),`
.- [object... -.
'=============='`,
      `uu.box() should ignore an invalid \`width\` argument (negative)`);

      a.strictEqual( '\n'+uu.box('', ['',123,true], 8),`
.--------------.
'== ,123,true ='`,
      `uu.box() should ignore an invalid \`width\` argument (less than 9)`);

    },


    //// `uu.fill()` integer usage.
    () => {

      let o = { foo:{ bar: { baz:99 } } };
      uu.fill('foo/bar.js', o, 'foo.bar.baz', 6, 'integer', 1, 99);
      a.deepEqual(o, { foo:{ bar: { baz:99 } } },
        `uu.fill() should leave a valid integer unchanged, three levels deep`
      )

      o = { baz:123 };
      uu.fill('foo/bar.js', o, 'foo.bar', 6, 'integer', 1, 99);
      a.deepEqual(o, { baz:123, foo:{ bar:6 } },
        `uu.fill() should create a missing integer, two levels deep`
      )

      o = { foo:{ bar:0 } };
      a.throws(
        () => { uu.fill('foo/bar.js', o, 'foo.bar', 6, 'integer', 1, 99); },
        e  => { if ( (e instanceof RangeError) &&
        /config.foo.bar is 0, which is less than 1/.test(e) ) {return true}},
        `uu.fill() should throw if an integer is too small, two levels deep`
      )

      o = { foo:100 };
      a.throws(
        () => { uu.fill('foo/bar.js', o, 'foo', 6, 'integer', 1, 99); },
        e  => { if ( (e instanceof RangeError) &&
        /config.foo is 100, which is greater than 99/.test(e) ) {return true}},
        `uu.fill() should throw if an integer is too big, top level`
      )

      o = { foo:55.5 };
      a.throws(
        () => { uu.fill('foo/bar.js', o, 'foo', 6, 'integer', 1, 99); },
        e  => { if ( (e instanceof TypeError) &&
        /config.foo is a number but not an integer/.test(e) ) {return true}},
        `uu.fill() should throw if it’s a number not an integer, top level`
      )
    },


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
