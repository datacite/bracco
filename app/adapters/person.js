import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'bracco/config/environment';

const { JSONAPIAdapter } = DS;

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  host: ENV.ORCID_API_URL,

  init() {
    this._super(...arguments);

    this.set('headers', {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  },

  pathForType() {
    return 'v2.1';
  },

  authorize() {

  }
});