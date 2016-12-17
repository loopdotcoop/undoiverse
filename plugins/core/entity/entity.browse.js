const FILE = 'plugins/core/entity/entity.browse.js'
    , VERSION = '0.2.3'
    , PLUGIN = 'entity'
    , uu = require('../../../uu.js') // Undoiverse Utilities
;


//// Xx.
module.exports = config => {

  //// `entity.browse(callerRef, '1L2j')`
  //// Retrieves a list containing information about each Entity.
  return { key: 'entity.browse',
    value: function (caller, opID, terms={}) {//[@todo sanitize]
      const
        METHOD = 'browse',
        callerID = caller.uvseID,
        response = { FILE, VERSION, PLUGIN, METHOD, status:'',
          callerID, opID, info:[], entities:[] }
      ;
      let row=0, entityID, locations, i, entity; // used in `for` loops

      //// Parse the search, filter and presentation arguments.
      let { start=0, end=Infinity, format='object' } = terms;

      //// List all Entities within the range specified in `term`.
      for (entityID in this.entity.locations) {
        if (row++ < start) continue; // not reached the first row yet
        if (row > end) break; // finished
        locations = this.entity.locations[entityID];
        response.entities.push({ entityID, locations });
      }

      //// Format the response array.
      if ('ascii' === format) {
        for (i=0; i<response.entities.length; i++) {
          entity = response.entities[i];
          response.entities[i] = `${entity.entityID}  ${entity.locations.length}`;
        }
        response.entities = uu.box(
          this.entity.tally + ' Entit' // title
           + (1 === this.entity.tally ? 'y' : 'ies') // plural
         ,start + ' to ' + end // footer
         ,22 // width
         ,response.entities // content
        );
      }

      //// Respond to the caller, and inform any event listeners.
      return this.ok(caller, response);

    }
  }; // end `entity.browse()`
};
