const FILE = 'plugins/core/entity/entity.add.js'
    , VERSION = '0.2.2'
    , PLUGIN = 'entity'
    , uu = require('../../../uu.js') // Undoiverse Utilities
;


//// Xx.
module.exports = config => {

  //// `entity.add(callerRef, '3xQ', [0,1,4,5], { abc:123 })`
  //// Records a newly-created Entity into one or more Locations, assigns it
  //// an ID, and broadcasts its payload to any Clients in those Locations.
  //// Note that `locations` must not be an empty array [@todo why not?].
  return { key: 'entity.add',
    value: function (caller, opID, locations, payload) {//[@todo sanitize]
      const
        METHOD = 'add',
        callerID = caller.uvseID,
        response = { FILE, VERSION, PLUGIN, METHOD, status:'',
          callerID, opID, locations, payload, entityID:'', info:[] }
      ;
      let i, j, location, clientID; // used in `for` loops

      //// Validate `caller` and `locations`.
      if (this.client.refs[callerID] !== caller) {
        return this.fail(caller, response, '`caller` is invalid'); }
      if (null == locations || ! locations.length) {
        return this.fail(caller, response, '`locations` is empty'); }
      for (i=0; null!=(location=locations[i]); i++) {
        if (location >= config.location.count) {
          return this.fail(caller, response,
            `\`locations[${i}]\`, ${location}, does not exist`); } }

      //// Make sure we don’t exceed the `tally` and `all` limits.
      let now = this.entity.tally, max = config.entity.tally.max;
      if (now >= max) { return this.fail(caller, response,
        `\`entity.tally.max\` is ${max}, but ${now} Entities already exist`);}
      now = this.entity.all, max = config.entity.all.max;
      if (now >= max) { return this.fail(caller, response,
        `\`entity.all.max\` is ${max}, but ${now} Entities have existed`); }

      //// Trigger the pre-add hook, and allow `add()` to be cancelled.
      const info = [];
      this.trigger( 'entity.add.before', caller, response, s=>info.push(s) );
      if (info.length) return this.cancel(caller, response, info);

      //// Not cancelled, so generate an Entity ID and start recording the
      //// Entity in memory.
      const entityID = response.entityID = 'e' + this.entity.all.toString(36);
      this.entity.locations[entityID] = locations;
      this.entity.tally++;
      this.entity.all++;

      //// Finish recording the Entity in memory, and determine which Clients
      //// need to be told about it.
      const clientIDs = {};
      for (i=0; null!=(location=locations[i]); i++) {
        this.location.entities[location].push(entityID);
        for (j=0; clientID=this.location.clients[location][j]; j++) {
          (clientIDs[clientID] = clientIDs[clientID] || []).push(location);
        };
      };

      //// Inform all Clients in the same Location(s) as the new Entity...
      for (clientID in clientIDs) {
        if (callerID !== clientID) { // ...except the Entity’s creator
          this.client.refs[clientID].emit({
            FILE, VERSION, PLUGIN, METHOD, status:'ok',
            callerID, locations: clientIDs[clientID], payload, entityID
          });
        }
      }

      //// Inform the new Entity’s creator and any event listeners.
      return this.ok(caller, response);

    }
  }; // end `entity.add()`
};
