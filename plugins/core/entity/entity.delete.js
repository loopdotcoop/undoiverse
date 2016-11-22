const FILE = 'plugins/core/entity/entity.delete.js'
    , VERSION = '0.2.2'
    , PLUGIN = 'entity'
    , uu = require('../../../uu.js') // Undoiverse Utilities
;


//// Xx.
module.exports = config => {

  //// `entity.delete(callerRef, '2nW', 'e5')`
  //// Removes an Entity from all the Locations it was in, and broadcasts its
  //// deletion to any Clients in those Locations.
  return { key: 'entity.delete',
    value: function (caller, opID, entityID) {//[@todo sanitize]
      const
        METHOD = 'delete',
        callerID = caller.uvseID,
        response = { FILE, VERSION, PLUGIN, METHOD, status:'',
          callerID, opID, entityID, info:[] }
      ;
      let i, j, l, location, clientID; // used in `for` loops

      //// Get the Entity’s current Locations, and validate `entityID`.
      const locations = this.entity.locations[entityID];
      if (! locations) return this.fail(caller, response,
        `entityID ${uu.safe(entityID)} does not exist`);

      //// Trigger the pre-delete hook, and allow `delete()` to be cancelled.
      const info = [];
      this.trigger('entity.delete.before', caller, response, s=>info.push(s));
      if (info.length) return this.cancel(caller, response, info);

      //// Not cancelled, so start removing the Entity from memory.
      delete this.entity.locations[entityID];
      this.entity.tally--;

      //// Finish removing the Entity from memory, and determine which Clients
      //// need to be told about it.
      const clientIDs = {};
      for (i=0; null!=(location=locations[i]); i++) {
        l = this.location.entities[location];
        l.splice( l.indexOf(entityID), 1 );
        for (j=0; clientID=this.location.clients[location][j]; j++) {
          (clientIDs[clientID] = clientIDs[clientID] || []).push(location);
        };
      };

      //// Inform all Clients in the same Location(s) as the deleted Entity...
      for (clientID in clientIDs) {
        if (callerID !== clientID) { // ...except the Entity’s deleter
          this.client.refs[clientID].emit({
            FILE, VERSION, PLUGIN, METHOD, status:'ok',
            callerID, entityID, locations: clientIDs[clientID]
          });
        }
      }

      //// Inform the new Entity’s deleter and any event listeners.
      return this.ok(caller, response);

    }
  }; // end `entity.delete()`
};
