const FILE = 'plugins/core/client/client.move.js'
    , VERSION = '0.2.2'
    , PLUGIN = 'client'
    , uu = require('../../../uu.js') // Undoiverse Utilities
;


//// Xx.
module.exports = config => {

  //// `client.move(callerRef, '9gW', [2,77])`
  //// Moves a Client from its old Locations to a new array of Locations, and
  //// [@todo tells the Client about Entities in its new Locations].
  return { key: 'client.move',
    value: function (caller, opID, destinations) {//[@todo sanitize]
      const
        METHOD = 'move',
        callerID = caller.uvseID,
        response = { FILE, VERSION, PLUGIN, METHOD, status:'',
          callerID, opID, destinations, origins:[], info:[] }
      ;
      let i, l, destination, arrival, departure;

      //// Get the caller’s start `locations`, and validate `destinations`.
      const origins = response.origins = this.client.locations[callerID];
      if (! origins) return this.fail(caller, response,
        `callerID ${uu.safe(callerID)} does not exist`);
      if (null == destinations || ! destinations.length) {
        return this.fail(caller, response, '`destinations` is empty'); }
      for (i=0; null!=(destination=destinations[i]); i++) {
        if (destination >= config.location.count) {
          return this.fail(caller, response,
            `\`destinations[${i}]\`, ${destination}, does not exist`); } }

      //// Trigger the pre-move hook, and allow `move()` to be cancelled.
      const info = [];
      this.trigger( 'client.move.before', caller, response, s=>info.push(s) );
      if (info.length) return this.cancel(caller, response, info);

      //// Not cancelled, so start moving the caller to its destinations.
      this.client.locations[callerID] = destinations;

      //// Finish moving the caller.
      const arrivals = destinations.filter(x => -1 === origins.indexOf(x));
      for (i=0; null!=(arrival=arrivals[i]); i++) {
        this.location.clients[arrival].push(callerID);
      };
      const departures = origins.filter(x => -1 === destinations.indexOf(x));
      for (i=0; null!=(departure=departures[i]); i++) {
        l = this.location.clients[departure];
        l.splice( l.indexOf(callerID), 1 );
      };

      //// Inform the caller, and any event listeners.
      return this.ok(caller, response);

    }
  }; // end `client.move()`

};
