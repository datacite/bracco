import JSONAPIAdapter from '@ember-data/adapter/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'bracco/config/environment';
import { isPresent } from '@ember/utils';

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  host: ENV.API_URL,

  init() {
    this._super(...arguments);

    this.set('headers', {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
  },

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