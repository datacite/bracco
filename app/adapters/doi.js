import ApplicationAdapter from './application';
import { isPresent } from '@ember/utils';

export default ApplicationAdapter.extend({

  urlForFindRecord(id, modelName, snapshot) {
    let baseUrl = this.buildURL(modelName, id, snapshot);
    let query = '';

    if (snapshot.adapterOptions !== undefined) {
        //query = snapshot.adapterOptions.affiliation !== undefined ? 'affiliation=true' : '';
        query = isPresent(snapshot.adapterOptions.affiliation) ? 'affiliation=true' : '';
    }
    query = query ? '?' + query : '';
    
    return baseUrl + query;
  }

});
