const FILE = 'plugins/core/client/client.delete.js'
    , VERSION = '0.2.0'
    , PLUGIN = 'client'
    , uu = require('../../../uu.js') // Undoiverse Utilities
;


//// Xx.
module.exports = config => {

  //// `client.delete(callerRef, '1L2j')`
  //// Removes a Client from all the Locations it was in.
  return { key: 'client.delete',
    value: function (caller, opID) {//[@todo sanitize]
      const
        METHOD = 'delete',
        callerID = caller.uvseID,
        response = { FILE, VERSION, PLUGIN, METHOD, status:'',
          callerID, opID, info:[] }
      ;
      let i, l, location; // used in `for` loops

      //// Get the caller’s current Locations.
      const locations = this.client.locations[callerID];
      if (! locations) return this.fail(caller, response,
        `callerID ${uu.safe(callerID)} does not exist`);

      //// Trigger the pre-delete hook, and allow `delete()` to be cancelled.
      const info = [];
      this.trigger('client.delete.before', caller, response, s=>info.push(s));
      if (info.length) return this.cancel(caller, response, info);

      //// Not cancelled, so start removing the caller from memory.
      delete caller.uvseID;
      delete this.client.refs[callerID];
      delete this.client.locations[callerID];
      this.client.tally--;

      //// Finish removing the caller from memory.
      for (i=0; null!=(location=locations[i]); i++) {
        l = this.location.clients[location];
        l.splice( l.indexOf(callerID), 1 );
      };

      //// Inform the caller, and any event listeners.
      return this.ok(caller, response);

    }
  }; // end `client.delete()`
};
