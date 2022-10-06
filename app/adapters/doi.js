import ApplicationAdapter from './application';
import { isPresent } from '@ember/utils';

export default ApplicationAdapter.extend({

  urlForFindRecord(id, modelName, snapshot) {
    let baseUrl = this.buildURL(modelName, id, snapshot);
    let query = '';

    if (snapshot.adapterOptions !== undefined) {
        query = isPresent(snapshot.adapterOptions.affiliation) ? 'affiliation=true' : '';
    }
    query = query ? '?' + query : '';
    
    return baseUrl + query;
  },

  // For API requests from doi.save() 
  urlForUpdateRecord(id, modelName, snapshot) {
    let baseUrl = this.buildURL(modelName, id, snapshot);
    let query = '';

    query = '?' + 'affiliation=true';
    
    return baseUrl + query;
  }

});
