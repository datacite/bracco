import JSONAPIAdapter from '@ember-data/adapter/json-api';
import ENV from 'bracco/config/environment';

export default JSONAPIAdapter.extend({
  host: ENV.CROSSREF_API_URL,

  init() {
    this._super(...arguments);

    this.set('headers', {
      Accept: 'application/json'
    });
  },

  authorize() {},

  pathForType() {
    return 'funders';
  }
});
