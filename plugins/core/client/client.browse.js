const FILE = 'plugins/core/client/client.browse.js'
    , VERSION = '0.2.2'
    , PLUGIN = 'client'
    , uu = require('../../../uu.js') // Undoiverse Utilities
;


//// Xx.
module.exports = config => {

  //// `client.browse(callerRef, '1L2j', { ... })`
  //// Retrieves a list containing information about each Client.
  return { key: 'client.browse',
    value: function (caller, opID, terms={}) {//[@todo sanitize]
      const
        METHOD = 'browse',
        callerID = caller.uvseID,
        response = { FILE, VERSION, PLUGIN, METHOD, status:'',
          callerID, opID, info:[], clients:[] }
      ;
      let row=0, clientID, locations, i, client; // used in `for` loops

      //// Parse the search, filter and presentation arguments.
      let { start=0, end=Infinity, format='object' } = terms;

      //// List all Clients within the range specified in `term`.
      for (clientID in this.client.locations) {
        if (row++ < start) continue; // not reached the first row yet
        if (row > end) break; // finished
        locations = this.client.locations[clientID];
        response.clients.push({ clientID, locations });
      }

      //// Format the response array.
      if ('ascii' === format) {
        for (i=0; i<response.clients.length; i++) {
          client = response.clients[i];
          response.clients[i] = `${client.clientID}  ${client.locations.length}`;
        }
        response.clients = uu.box(
          this.client.tally + ' Client' // title
           + (1 === this.client.tally ? '' : 's') // plural
         ,start + ' to ' + end // footer
         ,22 // width
         ,response.clients // content
        );
      }

      //// Respond to the caller, and inform any event listeners.
      return this.ok(caller, response);

    }
  }; // end `client.browse()`
};
