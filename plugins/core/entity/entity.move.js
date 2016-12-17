const FILE = 'plugins/core/entity/entity.move.js'
    , VERSION = '0.2.3'
    , PLUGIN = 'entity'
    , uu = require('../../../uu.js') // Undoiverse Utilities
;


//// Xx.
module.exports = config => {

  //// `entity.move(callerRef, '1Y8', 'e22', [0,3,4])`
  //// Moves an Entity from its old Locations to a new array of Locations, and
  //// broadcasts the difference to any Clients in the old or new Locations.
  return { key: 'entity.move',
    value: function (caller, opID, entityID, destinations) {//[@todo sanitize]
      const
        METHOD = 'move',
        callerID = caller.uvseID,
        response = { FILE, VERSION, PLUGIN, METHOD, status:'',
          callerID, opID, entityID, destinations, origins:[], info:[] }
      ;
      let i, j, l, destination, clientID, arrival, departure;

      //// Get the Entity’s start `locations`, and validate the arguments.
      const origins = response.origins = this.entity.locations[entityID];
      if (! origins) return this.fail(caller, response,
        `entityID ${uu.safe(entityID)} does not exist`);
      if (null == destinations || ! destinations.length) {
        return this.fail(caller, response, '`destinations` is empty'); }
      for (i=0; null!=(destination=destinations[i]); i++) {
        if (destination >= config.location.count) {
          return this.fail(caller, response,
            `\`destinations[${i}]\`, ${destination}, does not exist`); } }

      //// Trigger the pre-move hook, and allow `move()` to be cancelled.
      const info = [];
      this.trigger( 'entity.move.before', caller, response, s=>info.push(s) );
      if (info.length) return this.cancel(caller, response, info);

      //// Not cancelled, so start moving the Entity to its destinations.
      this.entity.locations[entityID] = destinations;

      //// Finish moving the Entity, and determine which Clients need to be
      //// told about it. Note that Clients whose Locations the Entity stays
      //// in during its move will not be informed - from their point of view,
      //// nothing has changed.
      const cIDs = {};
      const arrivals = destinations.filter(x => -1 === origins.indexOf(x));
      for (i=0; null!=(arrival=arrivals[i]); i++) {
        this.location.entities[arrival].push(entityID);
        for (j=0; clientID=this.location.clients[arrival][j]; j++) {
          cIDs[clientID] = cIDs[clientID] || { arrivals:[], departures:[] };
          cIDs[clientID].arrivals.push(arrival);
        };
      };
      const departures = origins.filter(x => -1 === destinations.indexOf(x));
      for (i=0; null!=(departure=departures[i]); i++) {
        l = this.location.entities[departure];
        l.splice( l.indexOf(entityID), 1 );
        for (j=0; clientID=this.location.clients[departure][j]; j++) {
          cIDs[clientID] = cIDs[clientID] || { arrivals:[], departures:[] };
          cIDs[clientID].departures.push(departure);
        };
      };

      //// Inform all Clients whose Locations overlap the Entity’s movement...
      for (clientID in cIDs) {
        if (callerID !== clientID) { // ...except Client that moved the Entity
          this.client.refs[clientID].emit({
            FILE, VERSION, PLUGIN, METHOD, status:'ok', callerID, entityID,
            arrivals:   cIDs[clientID].arrivals,
            departures: cIDs[clientID].departures
          });
        }
      }

      //// Inform the Entity’s mover and any event listeners.
      return this.ok(caller, response);

    }
  }; // end `entity.move()`
};
