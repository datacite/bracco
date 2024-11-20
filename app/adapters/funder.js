import JSONAPIAdapter from '@ember-data/adapter/json-api';
import ENV from 'bracco/config/environment';

export default class Funder extends JSONAPIAdapter {
  host = ENV.CROSSREF_API_URL;

  init() {
    super.init(...arguments);

    this.set('headers', {
      Accept: 'application/json'
    });
  }

  authorize() {}

  pathForType() {
    return 'funders';
  }
}
