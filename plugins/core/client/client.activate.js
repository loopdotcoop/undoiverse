const FILE = 'plugins/core/client/client.activate.js'
    , VERSION = '0.2.0'
    , PLUGIN = 'client'
    , uu = require('../../../uu.js') // Undoiverse Utilities
;


//// This is a Core Plugin, so it’s activated automatically when `Undoiverse` is
//// instantiated. You should never need to activate it manually.
module.exports = config => {

  //// Validate configuration, and fill in any missing values with defaults.
  uu.fill(FILE, config, 'client.tally.max', 65536,  'integer', 1, 65536);
  uu.fill(FILE, config, 'client.all.max'  , uu.MSI, 'integer', 1, uu.MSI);

  //// Record standard info about this Plugin.
  const ppos = [
    { key: 'client.FILE',    value: FILE },
    { key: 'client.VERSION', value: VERSION },
  ]

  //// Load methods and properties.
  ppos.push( require('./client.add.js')(config) );
  ppos.push( require('./client.delete.js')(config) );
  ppos.push( require('./client.move.js')(config) );
  ppos.push( require('./client.properties.js')(config) );

  return ppos;
};
