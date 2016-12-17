const FILE = 'plugins/core/entity/entity.activate.js'
    , VERSION = '0.2.3'
    , PLUGIN = 'entity'
    , uu = require('../../../uu.js') // Undoiverse Utilities
;


//// This is a Core Plugin, so it’s activated automatically when `Undoiverse` is
//// instantiated. You should never need to activate it manually.
module.exports = config => {

  //// Validate configuration, and fill in any missing values with defaults.
  uu.fill(FILE, config, 'entity.tally.max', 16777216, 'integer', 1, 16777216);
  uu.fill(FILE, config, 'entity.all.max'  , uu.MSI,   'integer', 1, uu.MSI);

  //// Record standard info about this Plugin.
  const ppos = [
    { key: 'entity.FILE',    value: FILE },
    { key: 'entity.VERSION', value: VERSION },
  ]

  //// Load methods and properties.
  ppos.push( require('./entity.add.js')(config) );
  ppos.push( require('./entity.browse.js')(config) );
  ppos.push( require('./entity.delete.js')(config) );
  ppos.push( require('./entity.edit.js')(config) );
  ppos.push( require('./entity.move.js')(config) );
  ppos.push( require('./entity.properties.js')(config) );

  return ppos;
};
