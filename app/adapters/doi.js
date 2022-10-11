import ApplicationAdapter from './application';
import ENV from 'bracco/config/environment';
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

  // For API requests from doi.save()/PATCH 
  urlForUpdateRecord(id, modelName, snapshot) {
    let baseUrl = this.buildURL(modelName, id, snapshot);
    let query = '';

    query = '?' + 'affiliation=true';
    
    return baseUrl + query;
  },

  // For API requests from doi.save()/POST
  urlForCreateRecord(modelName, snapshot) {
    let baseUrl = this._super(...arguments)
    let query = '?' + 'affiliation=true';

    return baseUrl + query;
  },

  pathForType() {
    return 'dois';
  }

});
