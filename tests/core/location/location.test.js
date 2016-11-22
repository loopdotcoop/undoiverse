const FILE = 'tests/core/location/location.test.js'
    , VERSION = '0.2.2'
    , PLUGIN = 'location'
    , a = require('assert')
;


//// To run all tests from the command line, `cd` to ‘undoiverse/’ and type:
//// `$ npm test`
//// To run all tests using JavaScript:
//// `const testResults = require(' ... tests/test-runner.js');`
//// To run just these unit tests using JavaScript, call:
//// `require(' ... tests/core/location/location.test.js')().forEach(t=>t());`
module.exports = config => {

  //// The first few tests are for the Entity Plugin’s properties.
  const tests = [

    //// Metadata - make sure we’re testing the right thing.
    uvse => {
      a.strictEqual(uvse.location.FILE,
        'plugins/core/location/location.activate.js',
        `location.FILE has an unexpected value`);
      a.strictEqual(uvse.location.VERSION, '0.2.2',
        `location.VERSION has an unexpected value`);
    },

    //// Xx.
    uvse => {
      //@todo
    },

  ];

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
