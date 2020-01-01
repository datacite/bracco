import JSONAPIAdapter from '@ember-data/adapter/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'bracco/config/environment';

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  host: ENV.ROR_API_URL,

  authorize() {
  },

  pathForType() {
    return 'organizations';
  },
});