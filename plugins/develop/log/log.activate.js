const FILE = 'plugins/develop/log/log.activate.js'
    , VERSION = '0.2.0'
    , PLUGIN = 'log'
    , uu = require('../../../uu.js') // Undoiverse Utilities
;


//// To activate this plugin, call:
//// `undoiverse.activate(
////    require('./undoiverse/plugins/develop/log/log.activate.js')({
////      log: { on: 'entity.*.fail' } // log a failed Entity add, edit, etc
////    })
////  );`
//// See the `uu.fill(...)` lines below, for default values.

module.exports = config => {

  //// Validate configuration, and fill in any missing values with defaults.
  uu.fill(PATH, config, 'log.on', '*.*.*', 'string', 1, 99);

  return [
    { key: 'log.PATH', value: PATH },
    { key: 'log.VERSION', value: VERSION },

    //// Cancel 'entity.add()', when the 'entity.add.begin' event is triggered.
    { on: config.on,
      run: (event, caller, response, cancel) => {
        console.log('log >', event, caller.uvseID, response);
      }
    }

  ];

};
