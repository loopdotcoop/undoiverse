const FILE = 'tests/core/entity/entity.test.js'
    , VERSION = '0.2.3'
    , PLUGIN = 'entity'
    , a = require('assert')
;


//// To run all tests from the command line, `cd` to ‘undoiverse/’ and type:
//// `$ npm test`
//// To run all tests using JavaScript:
//// `const testResults = require(' ... tests/test-runner.js');`
//// To run just these unit tests using JavaScript, call:
//// `require(' ... tests/core/entity/entity.test.js')().forEach(t=>t());`
module.exports = config => {

  //// The first few tests are for the Entity Plugin’s properties.
  const tests = [

    //// Metadata - make sure we’re testing the right thing.
    uvse => {
      a.strictEqual(uvse.entity.FILE, 'plugins/core/entity/entity.activate.js',
        `entity.FILE has an unexpected value`);
      a.strictEqual(uvse.entity.VERSION, '0.2.3',
        `entity.VERSION has an unexpected value`);
    },

    //// Before adding an entity.
    uvse => {
      a.deepStrictEqual(uvse.entity.locations, {},
        `entity.locations should be an empty object at startup`);
      a.strictEqual(uvse.entity.tally, 0,
        `entity.tally should be 0 at startup`);
      a.strictEqual(uvse.entity.all, 0,
        `entity.all should be 0 at startup`);
    },

    //// After adding one entity.
    uvse => {
      let client = { emit:()=>{} };
      uvse.client.add(client, '1bC', [0]);
      uvse.entity.add(client, '2dE', [0,1,2]);
      a.deepStrictEqual(uvse.entity.locations, { e0:[0,1,2] },
        `entity.locations should contain an entity after entity.add()`);
      a.strictEqual(uvse.entity.tally, 1,
        `entity.tally should be 1 after entity.add()`);
      a.strictEqual(uvse.entity.all, 1,
        `entity.all should be 1 after entity.add()`);
      let response = uvse.entity.browse(client, '3fG', { format:'ascii'});
      a.strictEqual('\n'+response.entities, `
.----- 1 Entity -----.
| e0  3              |
'=== 0 to Infinity =='`,
        `entity.browse(... { format:'ascii'}) should return a single-row box`);
    },

  ];

  //// The remaining tests are for the Entity Plugin’s methods.
  // tests.push( require('./entity.add.test.js')(config) );
  // tests.push( require('./entity.browse.test.js')(config) );
  // tests.push( require('./entity.delete.test.js')(config) );
  // tests.push( require('./entity.edit.test.js')(config) );
  // tests.push( require('./entity.move.test.js')(config) );

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
