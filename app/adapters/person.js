import JSONAPIAdapter from '@ember-data/adapter/json-api';
import ENV from 'bracco/config/environment';

export default JSONAPIAdapter.extend({
  host: ENV.ORCID_API_URL,

  init() {
    this._super(...arguments);

    this.set('headers', {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });
  },

  pathForType() {
    return 'v2.1';
  },

  authorize() {}
});
