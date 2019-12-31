import JSONAPIAdapter from '@ember-data/adapter/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import { inject as service } from '@ember/service';
import ENV from 'bracco/config/environment';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  session: service(), 
  host: ENV.API_URL,

  headers: computed('session.data.authenticated.token', function() {
    const headers = {};
    let { access_token } = this.get('session.data.authenticated');
    if (isPresent(access_token)) {
      headers['Authorization'] = `Bearer ${access_token}`;
    }

    return headers;
  }),
});
