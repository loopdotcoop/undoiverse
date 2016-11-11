const FILE = 'tests/core/client/client.test.js'
    , VERSION = '0.2.0'
    , PLUGIN = 'client'
    , a = require('assert')
;


//// To run all tests from the command line, `cd` to ‘undoiverse/’ and type:
//// `$ npm test`
//// To run all tests using JavaScript:
//// `const testResults = require(' ... tests/test-runner.js');`
//// To run just these unit tests using JavaScript, call:
//// `require(' ... tests/core/client/client.test.js')().forEach(t=>t());`
module.exports = config => {

  //// The first few tests are for the Client Plugin’s properties.
  const tests = [

    //// Metadata - make sure we’re testing the right thing.
    uvse => {
      a.strictEqual(uvse.client.FILE, 'plugins/core/client/client.activate.js',
        `client.FILE has an unexpected value`);
      a.strictEqual(uvse.client.VERSION, '0.2.0',
        `client.VERSION has an unexpected value`);
    },

    //// Before adding a client.
    uvse => {
      a.deepStrictEqual(uvse.client.locations, {},
        `client.locations should be an empty object at startup`);
      a.deepStrictEqual(uvse.client.refs, {},
        `client.refs should be an empty object at startup`);
      a.strictEqual(uvse.client.tally, 0,
        `client.tally should be 0 at startup`);
      a.strictEqual(uvse.client.all, 0,
        `client.all should be 0 at startup`);
    },

    //// After adding one client.
    uvse => {
      uvse.client.add({ emit:()=>{} }, '1bC', [0,1,2]);
      a.deepStrictEqual(uvse.client.locations, { c0:[0,1,2] },
        `client.locations should contain a client after client.add()`);
      a.strictEqual(uvse.client.refs.c0.uvseID, 'c0',
        `client.refs should contain a client after client.add()`);
      a.strictEqual(uvse.client.tally, 1,
        `client.tally should be 1 after client.add()`);
      a.strictEqual(uvse.client.all, 1,
        `client.all should be 1 after client.add()`);
    },

  ];

  //// The remaining tests are for the Client Plugin’s methods.
  // tests.push( require('./client.add.test.js')(config) );
  // tests.push( require('./client.move.test.js')(config) );
  // tests.push( require('./client.delete.test.js')(config) );

  ////
  tests.mock = new (require('../../../undoiverse.js'))({
    location: { count: 4 }, // 256 is the default
    entity: { tally: { max: 2 } }
  });

  ////
  tests.FILE    = FILE;
  tests.VERSION = VERSION;
  tests.PLUGIN  = PLUGIN;
  return tests;

};
