const FILE = 'plugins/core/client/client.properties.js'
    , VERSION = '0.2.0'
    , PLUGIN = 'client'
    , uu = require('../../../uu.js') // Undoiverse Utilities
;


//// Xx.
module.exports = config => {

  return [

    //// `client.locations` is a simple in-memory key/value store, where keys
    //// are Client IDs, and values are arrays of Location indices.
    //// IMPORTANT: Must be kept in sync with `location.clients`.
    { key: 'client.locations', value: {} },

    //// `client.refs` is another in-memory key/value store - this time, keys
    //// are Client IDs, and values are references to client socket objects.
    //// Although we generally refer to Clients using their `clientID` (assigned
    //// during `client.add()`), we sometimes need access to a Client-object’s
    //// `emit()` method, eg `this.client.refs[clientID].emit({ ... })`.
    { key: 'client.refs', value: {} },

    //// `client.tally` is the number of Clients which currently exist in the
    //// Undoiverse instance - so, the number of key/value pairs currently in
    //// `client.locations`. Used by `client.add()` to prevent the number of
    //// Clients from exceeding `config.client.tally.max`.
    { key: 'client.tally', value: 0 },

    //// `client.all` is the number of Clients which have ever been created in
    //// this Undoiverse instance. Used by `client.add()` to ensure Client IDs
    //// are unique, and to make sure `config.client.all.max` isn’t exceeded.
    { key: 'client.all', value: 0 },

  ];

};
