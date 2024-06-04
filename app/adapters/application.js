import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';
import ENV from 'bracco/config/environment';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

const ApplicationAdapter = JSONAPIAdapter.extend({
  session: service(),
  host: ENV.API_URL,

  headers: computed('session.data.authenticated.token', function () {
    const headers = {};
    let { access_token } = this.get('session.data.authenticated');
    if (isPresent(access_token)) {
      headers.Authorization = `Bearer ${access_token}`;
    }

    return headers;
  }),
  handleResponse(status, headers, payload) {
    if ([422, 409, 500].includes(status)) {
      return payload.errors[0];
    }
    return this._super(...arguments);
  }
});

export default ApplicationAdapter;
