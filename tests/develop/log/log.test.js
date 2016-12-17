const FILE = 'tests/develop/log/log.test.js'
    , VERSION = '0.2.3'
    , PLUGIN = 'develop'
    , a = require('assert')
;


//// To run all tests from the command line, `cd` to ‘undoiverse/’ and type:
//// `$ npm test`
//// To run all tests using JavaScript:
//// `const testResults = require(' ... tests/test-runner.js');`
//// To run just these unit tests using JavaScript, call:
//// `require(' ... tests/develop/log/log.test.js')().forEach(t=>t());`
module.exports = config => {

  //// The first few tests are for the Entity Plugin’s properties.
  const tests = [

    //// Existential - make sure the plugin is loaded.
    uvse => {
      a.equal(typeof uvse.develop, 'object',
        `uvse.develop is type '${typeof uvse.develop}', not 'object'`)
      a.equal(typeof uvse.develop.log, 'object',
        `uvse.develop.log is type '${typeof uvse.develop.log}', not 'object'`)
    },

    //// Metadata - make sure we’re testing the right thing.
    uvse => {
      a.strictEqual(uvse.develop.log.FILE,
        'plugins/develop/log/log.activate.js',
        `develop.log.FILE has an unexpected value`)
      a.strictEqual(uvse.develop.log.VERSION, '0.2.3',
        `develop.log.VERSION has an unexpected value`)
    },

    //// Xx.
    uvse => {
      //@todo
    },

  ]

  ////
  tests.mock = new (require('../../../undoiverse.js'))({
    location: { count: 4 }, // 256 is the default
    entity: { tally: { max: 2 } }
  })
  tests.mock.activate(
    require('../../../plugins/develop/log/log.activate.js')()
  )

  ////
  tests.FILE    = FILE
  tests.VERSION = VERSION
  tests.PLUGIN  = PLUGIN
  return tests

}
