const FILE = 'plugins/core/client/client.add.js'
    , VERSION = '0.2.0'
    , PLUGIN = 'client'
    , uu = require('../../../uu.js') // Undoiverse Utilities
;


//// Xx.
module.exports = config => {

  //// `client.add(callerRef, '5p2', [7,9])`
  //// Records a newly-created Client into one or more Locations, and assigns it
  //// a unique ID. This ID is also added to the Client object as `uvseID`.
  //// Note that `locations` must not be an empty array [@todo why not?].
  return { key: 'client.add',
    value: function (caller, opID, locations) {//[@todo sanitize]
      const
        METHOD = 'add',
        response = { FILE, VERSION, PLUGIN, METHOD, status:'',
          callerID:'', opID, locations, info:[] }
      ;
      let i, location; // used in `for` loops

      //// Validate `caller` and `locations`.
      if (caller.uvseID) { return this.fail(caller, response,
        '`caller` already has a `uvseID`, so must have been added already'); }
      if (null == locations || ! locations.length) {
        return this.fail(caller, response, '`locations` is empty'); }
      for (i=0; null!=(location=locations[i]); i++) {
        if (location >= config.location.count) {
          return this.fail(caller, response,
            `\`locations[${i}]\`, ${location}, does not exist`); } }

      //// Make sure we don’t exceed the `tally` and `all` limits.
      let now = this.client.tally, max = config.client.tally.max;
      if (now >= max) { return this.fail(caller, response,
        `\`client.tally.max\` is ${max}, but ${now} Clients already exist`); }
      now = this.client.all, max = config.client.all.max;
      if (now >= max) { return this.fail(caller, response,
        `\`client.all.max\` is ${max}, but ${now} Clients have existed`); }

      //// Trigger the pre-add hook, and allow `add()` to be cancelled.
      const info = [];
      this.trigger( 'client.add.before', caller, response, s=>info.push(s) );
      if (info.length) return this.cancel(caller, response, info);

      //// Not cancelled, so generate an ID for the newly added Client and
      //// start recording it in memory.
      const callerID = response.callerID = 'c' + this.client.all.toString(36);
      this.client.locations[callerID] = locations;
      this.client.refs[callerID] = caller;
      this.client.tally++;
      this.client.all++;

      //// Finish recording the Client in memory.
      for (i=0; null!=(location=locations[i]); i++) {
        this.location.clients[location].push(callerID);
      };

      //// Modify the external Client-object. It’s `uvseID` ('Undoiverse ID') in
      //// case the Client-object already has its own `id` property.
      caller.uvseID = callerID;

      //// Let the caller know that it’s been added successfully, and trigger
      //// any event listeners.
      return this.ok(caller, response);

    }
  }; // end `client.add()`
};
