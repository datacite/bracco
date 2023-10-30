import ApplicationAdapter from './application';
import ENV from 'bracco/config/environment';
import { isPresent } from '@ember/utils';

export default ApplicationAdapter.extend({

  urlForFindRecord(id, modelName, snapshot) {
    let baseUrl = this.buildURL(modelName, id, snapshot);
    let query = '';

    if (snapshot.adapterOptions !== undefined) {
        query = this.buildQuery(snapshot.adapterOptions);
    }
    query = query ? '?' + query : '';
    
    return baseUrl + query;
  },

  // For API requests from doi.save()/PATCH 
  urlForUpdateRecord(id, modelName, snapshot) {
    let baseUrl = this.buildURL(modelName, id, snapshot);
    let query = '';

    query = '?' + 'affiliation=true&publisher=true';
    
    return baseUrl + query;
  },

  // For API requests from doi.save()/POST
  urlForCreateRecord(modelName, snapshot) {
    let baseUrl = this._super(...arguments)
    let query = '?' + 'affiliation=true&publisher=true';

    return baseUrl + query;
  },

  pathForType() {
    return 'dois';
  },

  buildQuery(options) {
    const allowedKeys = ['affiliation', 'publisher'];

    if (typeof options !== 'object') {
      return '';
    }

    const queryParts = [];

    for (const [key, value] of Object.entries(options)) {
      if (allowedKeys.includes(key) && value) {
        queryParts.push(`${key}=${value}`);
      }
    }
    return queryParts.join('&');
  }

});
