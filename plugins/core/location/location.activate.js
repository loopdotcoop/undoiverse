const FILE = 'plugins/core/location/location.activate.js'
    , VERSION = '0.2.2'
    , PLUGIN = 'location'
    , uu = require('../../../uu.js') // Undoiverse Utilities
;


//// This is a Core Plugin, so it’s activated automatically when `Undoiverse` is
//// instantiated. You should never need to activate it manually.
module.exports = config => {

  //// Validate configuration, and fill in any missing values with defaults.
  uu.fill(FILE, config, 'location.count', 256, 'integer', 1, 65536);

  return [

    { key: 'location.FILE',    value: FILE },
    { key: 'location.VERSION', value: VERSION },

    //// `location.clients` is an array of arrays, where each sub-array is a
    //// single Location. These sub-arrays will be filled with the IDs of the
    //// Clients currently watching that Location.
    //// IMPORTANT: Must be kept in sync with `client.locations`.
    ////[@todo client IDs, or direct references?]
    { key: 'location.clients',
      value: (function () {
        const locations = [];
        for (let i=0; i<config.location.count; i++) { locations.push([]); }
        return locations;
      })()
    }, // end `location.clients`


    //// `location.entities` is similar to `location.clients` but the sub-arrays
    //// will be filled with the IDs of the Entities currently in that Location.
    //// IMPORTANT: Must be kept in sync with `entity.locations`.
    { key: 'location.entities',
      value: (function () {
        const locations = [];
        for (let i=0; i<config.location.count; i++) { locations.push([]); }
        return locations;
      })()
    }, // end `location.entities`


  ];
};
