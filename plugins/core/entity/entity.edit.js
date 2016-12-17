const FILE = 'plugins/core/entity/entity.edit.js'
    , VERSION = '0.2.3'
    , PLUGIN = 'entity'
    , uu = require('../../../uu.js') // Undoiverse Utilities
;


//// Xx.
module.exports = config => {

  //// `entity.edit(callerRef, '2nW', 'e5', { abc:890 })`
  //// Updates an Entity’s payload, and broadcasts the new payload to any
  //// any Clients in its Locations. You cannot change an Entity’s Locations
  //// with this method - use `move()` instead.
  return { key: 'entity.edit',
    value: function (caller, opID, entityID, payload) {//[@todo sanitize]
      const
        METHOD = 'edit',
        callerID = caller.uvseID,
        response = { FILE, VERSION, PLUGIN, METHOD, status:'',
          callerID, opID, entityID, payload, info:[] }
      ;
      let i, j, location, clientID; // used in `for` loops

      //// Get the Entity’s Locations, and validate `caller` and `entityID`.
      const locations = this.entity.locations[entityID];
      if (this.client.refs[callerID] !== caller) {
        return this.fail(caller, response, '`caller` is invalid'); }
      if (! locations) return this.fail(caller, response,
        `entityID ${uu.safe(entityID)} does not exist`);

      //// Trigger the pre-edit hook, and allow `edit()` to be cancelled.
      const info = [];
      this.trigger('entity.edit.before', caller, response, s=>info.push(s));
      if (info.length) return this.cancel(caller, response, info);

      //// Determine which Clients need to be told about the edited payload.
      const clientIDs = {};
      for (i=0; null!=(location=locations[i]); i++) {
        for (j=0; clientID=this.location.clients[location][j]; j++) {
          (clientIDs[clientID] = clientIDs[clientID] || []).push(location);
        };
      };

      //// Inform all Clients in the same Location(s) as the edited Entity...
      for (clientID in clientIDs) {
        if (callerID !== clientID) { // ...except the Entity’s editor
          this.client.refs[clientID].emit({
            FILE, VERSION, PLUGIN, METHOD, status:'ok',
            callerID, entityID, payload, locations: clientIDs[clientID]
          });
        }
      }

      //// Inform the new Entity’s editor and any event listeners.
      return this.ok(caller, response);

    }
  }; // end `entity.edit()`
};
