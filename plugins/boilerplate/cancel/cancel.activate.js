const FILE = 'plugins/boilerplate/cancel/cancel.activate.js'
    , VERSION = '0.2.2'
    , PLUGIN = 'cancel'
    , uu = require('../../../uu.js') // Undoiverse Utilities
;


//// To activate this plugin, call:
//// `undoiverse.activate(
////    require('./undoiverse/plugins/boilerplate/cancel/cancel.activate.js')({
////      foobar: { abc: 123 } // xx
////    })
////  );`
//// See the `uu.fill(...)` lines below for default values.

module.exports = config => {

  //// Validate configuration, and fill in any missing values with defaults.
  uu.fill(FILE, config, 'example.cancel.abc', 256, 'integer', 1, 65536);

  return [
    { key: 'example.cancel.FILE', value: FILE },
    { key: 'example.cancel.VERSION', value: VERSION },

    //// Cancel 'entity.add()', when the 'entity.add.begin' event is triggered.
    { on: 'entity.add.before',
      run: (event, caller, response, cancel) => {
        const { callerID, entityID } = response;
        if (! caller.isAdmin) {
          cancel(FILE + ' prevented Client ' + callerID
            + ' from adding Entity ' + entityID);
        }
      }
    }

  ];

};
