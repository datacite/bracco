import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import ENV from 'bracco/config/environment';
import constructUrl from '../../utils/construct-url';
import { belongsTo } from '@ember-data-mirror/model';
import { Dois } from '../schemas/doi.ts';

import { findRecord } from '@ember-data/legacy-compat/builders';

export default class ShowRoute extends Route {
  @service can;
  @service v2Store;

  async model(params) {

    /*************
     * This really needs to be looked at.  The api calls that support legacy async relationships and autofetch need to be debugged
     * OR, we need to recode everything around legacy relationships to support non-async api calls and no autofetching - polaris mode.
     * 
     * The handler needs to be rethought, as well.
     * 
     * This is the page I was working on for relationships.
     * 
     */

    // debugger

    let options = {
      url: ENV.API_URL + '/dois/' + encodeURIComponent(params.doi_id.toLowerCase()) + '?publisher=true&affiliation=true&include=client'
    };

    let response = await this.v2Store.request(options);
  
    // debugger

    // Just experimental, for now.  I wanted to see exactly what they did.
    let doi = response.content.data
    let clientRef = doi.belongsTo('client');
    let client = clientRef.value();
    let providerRef = client.belongsTo('provider');

    //debugger

    //let provider = await providerRef.reload();    

    // debugger

    return response.content.data;

   // debugger

  }
}

// afterModel(model) {
//   if (this.get('can').cannot('view doi', model)) {
//     return this.transitionTo('index');
//   }
// }
//}
