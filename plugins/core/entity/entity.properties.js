const FILE = 'plugins/core/entity/entity.properties.js'
    , VERSION = '0.2.0'
    , PLUGIN = 'entity'
    , uu = require('../../../uu.js') // Undoiverse Utilities
;


//// Xx.
module.exports = config => {

  return [

    //// `entity.locations` is a simple in-memory key/value store, where keys
    //// are Entity IDs, and values are arrays of Location indices.
    //// IMPORTANT: Must be kept in sync with `location.entities`.
    { key: 'entity.locations', value: {} },

    //// `entity.tally` is the number of Entities which currently exist in the
    //// Undoiverse instance - so, the number of key/value pairs currently in
    //// `entity.locations`. Used by `entity.add()` to prevent the number of
    //// Entities from exceeding `config.entity.tally.max`.
    { key: 'entity.tally', value: 0 },

    //// `entity.all` is the number of Entities which have ever been created in
    //// this Undoiverse instance. Used by `entity.add()` to ensure Entity IDs
    //// are unique, and to make sure `config.entity.all.max` isn’t exceeded.
    { key: 'entity.all', value: 0 },

  ];

};
