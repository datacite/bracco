import JSONAPIAdapter from '@ember-data/adapter/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'bracco/config/environment';

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  host: ENV.CROSSREF_API_URL,

  init() {
    this._super(...arguments);

    this.set('headers', {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    });
  },

  authorize() {
  },

  pathForType() {
    return 'funders';
  },
});
