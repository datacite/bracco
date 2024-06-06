import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import JSONAPIAdapter from '@ember-data/adapter/json-api';
import ENV from 'bracco/config/environment';
import { isPresent } from '@ember/utils';

@classic
class ApplicationAdapter extends JSONAPIAdapter {
  @service
  session;

  host = ENV.API_URL;

  @computed('session.data.authenticated.token')
  get headers() {
    const headers = {};
    let { access_token } = this.get('session.data.authenticated');
    if (isPresent(access_token)) {
      headers.Authorization = `Bearer ${access_token}`;
    }

    return headers;
  }

  handleResponse(status, headers, payload) {
    if ([422, 409, 500].includes(status)) {
      return payload.errors[0];
    }
    return super.handleResponse(...arguments);
  }
}

export default ApplicationAdapter;
